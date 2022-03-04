'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const UI = require(`../ui`);

const SIGNAL = require(`../signal`);
const dom = require(`../utils-dom`);

const RectTracker = require(`./rect-tracker`);
const DisposableHTMLElement = require("../disposable-htmlelement");

/**
 * An DOM Streamer is designed to handle a large number of fixed-size dom elements.
 * It works by leveraging resize & intersection observer, and requests
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof common.helpers
 */
class DOMStreamer extends DisposableHTMLElement {
    constructor() { super(); }

    static __useResizeCallback = true;
    static __usePaintCallback = true;

    _Init() {
        super._Init();

        this._layout = {};
        this._layoutInfos = {};

        this._options = {};
        this._optionHandler = new com.helpers.OptionsHandler();
        this._optionHandler
            .Hook(`owner`)
            .Hook(`host`)
            .Hook(`layout`);

        this._linePaddingBottom = 1;

        this._header = null;
        this._footer = null;
        this._drawArea = { width: 0, height: 0 };
        this._indices = { start: 0, end: 0 };
        this._items = [];

        this._activeFragment = null;
        this._styleString = ``;

        this._isVertical = true; //TODO: Implement orientation flag instead

        this._rectTracker = new RectTracker(this._Bind(this._OnRectUpdate), this);

        this._forceRefresh = true;

    }

    _PostInit() {

        super._PostInit();

        this._host = this.attachShadow({ mode: `open` });
        this._wrapper = this._host;

        // Fetch/refresh cached styles 
        if (this._styles) {
            for (let i = 0, n = this._styles.length; i < n; i++) { this._styles[i].remove(); }
            this._styles.length = 0;
        }

        this._styles = style.STYLE.Get(this.constructor, this._Bind(this._Style), false);
        for (let i = 0, n = this._styles.length; i < n; i++) {
            dom.Attach(this._styles[i].cloneNode(true), this._host);
        }

        this._itemStyle = dom.El(`style`, {}, this._host);

        this._Render();

    }

    _OnPaintChange() {
        if (this._isPainted) { this._rectTracker.Enable(); }
        else { this._rectTracker.Disable(); }
        super._OnPaintChange();
    }

    _Style() {
        return {
            ':host': {
                'position': 'relative',
                'display': 'grid',
                //'justify-items': `center`,
                'overflow-x': 'clip !important',
            },
            ':host(.empty)': {
                'display': 'none'
            },
            '.fixture': {
                'min-height': 0,
                'width': '100%',
                'flex': `0 0 auto`,
                //'height': '0px',
                'grid-column': `1/-1`, // take one full width
            },
            '.header': {
                'grid-row-start': 'header'
            },
            '.footer': {
                'grid-row-end': 'footer',
                'order':'9999999'
            },
            '.dom-streamer-item': {
                //'box-sizing': 'border-box',
                //'flex-grow': `1`,
                //'flex': `0 0 auto`,
            }
        };
    }


    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this._optionHandler.Process(this, p_options);
    }

    get owner() { return this._owner; }
    set owner(p_value) {
        this._owner = p_value;
    }

    get layout() { return this._itemProperties; }
    set layout(p_value) {
        if (!p_value) { p_value = {}; }

        this._layout = p_value;

        /*
        Accepts the two following format :
        #1 - Fixed number of item in available space (width or height)
            {
                itemSlots:5, // item # over spread, need to compute item size
                itemSize:200 // item size over distribution axis,
                itemCount:5000,
                fixedSize:true
            }

        #2 - Fixed item size
            {
                itemWidth:200,
                itemHeight:200,
                itemCount:5000,
                fixedSize:true  
            }
         */

        this._layout.itemCount = this._layout.itemCount || 0;
        this._layout.fixedSize = `fixedSize` in this._layout ? this._layout.fixedSize : false;

        if (this._layout.itemSlots) {

        } else {
            this._layout.itemWidth = this._layout.itemWidth || this._layout.itemHeight || this._layout.itemSize;
            this._layout.itemHeight = this._layout.itemHeight || this._layout.itemWidth || this._layout.itemSize;
        }

        this._RefreshLayoutInfos();

    }

    get itemCount() { return this._layout.itemCount; }
    set itemCount(p_value) {
        //if (this._layout.itemCount == p_value) { return; }
        this._layout.itemCount = p_value;
        this._ClearItems();
        this._RefreshLayoutInfos();

    }

    _OnSizeChange(p_contentRect) {
        this._RefreshLayoutInfos();
    }

    _RequestItem(p_itemIndex) {
        this._requestResult = null;
        if (p_itemIndex < 0) { return; }
        this._Broadcast(SIGNAL.ITEM_REQUESTED, this, p_itemIndex, this._activeFragment);
    }

    ItemRequestAnswer(p_itemIndex, p_item) {
        p_item.classList.add(`dom-streamer-item`);
        this._requestResult = p_item;
    }

    /**
     * Computes static layout infos that will later
     * be used to calculate which indices/items should be visible.
     */
    _RefreshLayoutInfos(p_updateRect = true) {

        let
            v = this._isVertical,
            l = this._layout,
            aw = this._drawArea.width, ah = this._drawArea.height,
            fullLineSize = v ? aw : ah, // Space available for a single line of items
            lineSize = fullLineSize, // Space available for a single line of items
            primarySize = 0, secondarySize = 0, //item sizes
            items = l.itemCount, //total number of items
            itemsPerLine = 0, //item per row or column
            gap = l.gap || 0;

        if (l.itemSlots) {

            itemsPerLine = Math.max(l.itemSlots, 1);
            lineSize -= Math.max(itemsPerLine - 1, 0) * gap;
            primarySize = l.itemSize + gap;
            secondarySize = Math.max(Math.floor(lineSize / itemsPerLine), 1);

        } else {

            let
                iWidth = (l.itemWidth || l.itemHeight || l.itemSize) + gap,
                iHeight = (l.itemHeight || l.itemSize || iWidth) + gap;

            if (v) { primarySize = iHeight; secondarySize = iWidth; }
            else { primarySize = iWidth; secondarySize = iHeight; }

            itemsPerLine = Math.max(Math.floor(lineSize / secondarySize), 1);
            lineSize -= Math.max(itemsPerLine - 1, 0) * gap;

        }

        let
            lines = Math.max(Math.ceil(items / itemsPerLine), 1),
            streamAvailSpace = v ? ah : aw,
            streamLines = Math.max(Math.ceil(streamAvailSpace / primarySize), 1) + this._linePaddingBottom + this._linePaddingBottom,
            totalSize = primarySize * lines,
            streamSize = streamLines * primarySize,
            infos = this._layoutInfos;

        infos.streamSize = streamSize;
        infos.streamLines = streamLines;
        infos.streamItems = streamLines * itemsPerLine;
        infos.totalSize = totalSize;
        infos.lines = lines;
        infos.items = items;
        infos.maxHeaderSize = Math.max((lines * primarySize) - (primarySize * streamLines), 0);
        infos.itemsPerLine = itemsPerLine;
        infos.primarySize = primarySize;
        infos.fixedSize = l.fixedSize;
        infos.maxCoord = totalSize - streamSize;
        infos.gap = gap;

        this._indices.length = infos.streamItems;

        let
            refPc = (lineSize / fullLineSize) * 100,
            rpx = primarySize - gap,
            sstr = ``;

        sstr += `:host{  `;

        if (l.fixedSize) { sstr += `${v ? 'height' : 'width'}:${totalSize}px;`; }

        sstr += `grid-gap:${gap}px;` +
            `grid-template-columns:repeat( ${itemsPerLine}, ${refPc / itemsPerLine}%); ` +
            `grid-template-rows:[header] 0px repeat( ${lines}, ${primarySize - gap}px); [footer] 0px` +
            `}`;

        if (this._styleString != sstr) {
            this._styleString = sstr;
            this._itemStyle.innerHTML = sstr;
        }

        if (items == 0) { this.classList.add(`empty`); }
        else { this.classList.remove(`empty`); }


        //console.log(infos);

        if (p_updateRect) { this._OnRectUpdate(); }

    }

    /**
     * This is the core method of the DOM Streamer.
     * It computes which item indices are currently visible, removes
     * non-visible one and requests missing ones that should be visible.
     */
    _OnRectUpdate() {

        let
            selfRect = this._rectTracker.GetIntersect(this),
            fixtRect = this._rectTracker.GetRect(this._header);

        if (!selfRect || !fixtRect) { return; }

        if (this._drawArea.width != selfRect.width ||
            this._drawArea.height != selfRect.height) {
            this._drawArea.width = selfRect.width;
            this._drawArea.height = selfRect.height;
            this._RefreshLayoutInfos(false);
        }


        let
            v = this._isVertical,
            l = this._layoutInfos,
            startCoord = Math.abs(v ? selfRect.y - fixtRect.y : selfRect.x - fixtRect.x),
            maxCoord = l.maxCoord;


        if (startCoord < 0 || isNaN(startCoord)) { startCoord = 0; }

        if (l.streamSize <= l.totalSize) {
            if (startCoord > l.totalSize - l.streamSize) { startCoord = Math.min(l.totalSize - l.streamSize); }
        } else {
            if (startCoord > l.totalSize) { startCoord = l.totalSize; }
        }

        let
            lineStart = Math.min(Math.floor(startCoord / l.primarySize), l.lines),
            newStart = Math.min(lineStart * l.itemsPerLine, l.items),
            newEnd = Math.min(newStart + l.streamItems, l.items),
            newLength = newEnd - newStart,

            oldStart = this._indices.start,
            oldEnd = this._indices.end,
            oldLength = oldEnd - oldStart;

        if (!this._forceRefresh &&
            newStart == oldStart &&
            newEnd == oldEnd) {
            return;
        }

        this._indices.start = newStart;
        this._indices.end = newEnd;
        this._indices.startCoord = startCoord;

        this._Broadcast(SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this, this._indices);

        let
            insertBefore = 0,
            insertAfter = 0;

        // Check if this is a complete refresh
        if (this._forceRefresh ||
            newStart >= oldEnd ||
            newEnd <= oldStart) {

            this._ClearItems();
            insertAfter = newLength;
            this._forceRefresh = false;

        } else {

            insertBefore = oldStart - newStart;
            insertAfter = newEnd - oldEnd;

            let
                popCount = oldEnd - newEnd,
                shiftCount = newStart - oldStart;

            if (popCount > 0) {
                for (let i = 0; i < popCount; i++) {
                    let item = this._items.pop();
                    if (item) { item.Release(); }
                }
            }

            if (shiftCount > 0) {
                for (let i = 0; i < shiftCount; i++) {
                    let item = this._items.shift();
                    if (item) { item.Release(); }
                }
            }

        }

        if (insertBefore > 0) {

            this._activeFragment = document.createDocumentFragment();

            for (let i = 0; i < insertBefore; i++) {
                let index = newStart + i;
                this._RequestItem(index);
                if (this._requestResult) {
                    this._items.splice(i, 0, this._requestResult);
                } else {
                    // missing item. Fill with dummy ?
                }
            }

            dom.AttachAfter(this._activeFragment, this._header);
            this._activeFragment = null;
        }

        if (insertAfter > 0) {

            this._activeFragment = document.createDocumentFragment();

            for (let i = 0; i < insertAfter; i++) {
                let index = newEnd - insertAfter + i;
                this._RequestItem(index);
                if (this._requestResult) {
                    this._items.push(this._requestResult);
                } else {
                    // missing item. Fill with dummy ?
                }
            }

            dom.AttachBefore(this._activeFragment, this._footer);
            this._activeFragment = null;
        }

        let headerSize = (newStart / l.itemsPerLine) * l.primarySize;
        headerSize = Math.min(headerSize, l.maxHeaderSize);
        //if (headerSize > l.maxHeaderSize) { headerSize = l.maxHeaderSize; }

        //let footerSize = Math.max(Math.floor((l.items - newEnd) / l.itemsPerLine) * (l.primarySize), 0); //(headerSize + l.streamSize);
        let footerSize = Math.max(l.totalSize - ((newEnd / l.itemsPerLine) * l.primarySize), 0);

        //console.log(`${headerSize} // ${footerSize}`, l);

        let
            hStart = 1,
            hEnd = newStart / l.itemsPerLine,
            fStart = Math.ceil(newEnd / l.itemsPerLine) + 1,
            fEnd = l.lines;

        console.log(`[${hStart}/${hEnd}] || [${fStart}/${fEnd}]`);

        hEnd = Math.max(hEnd, 1);

        this._header.style.setProperty(`grid-row-end`, `${hEnd}`);
        this._footer.style.setProperty(`grid-row-start`, `${fStart}`);
        //this._header.style.setProperty(`height`, `${headerSize}px`);
        //this._footer.style.setProperty(`height`, `${footerSize}px`);

    }

    /**
     * Release all items
     */
    _ClearItems() {
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].Release();
        }
        this._items.length = 0;
        this._forceRefresh = true;
    }

    /**
     * Return the top position of a given item index, using
     * the last computed layout infos
     * @param {Number} p_index 
     * @returns 
     */
    GetIndexOffset(p_index) {

        // Compute index vertical position based on current layout infos
        let l = this._layoutInfos,
            lineIndex = p_index / l.itemsPerLine - (p_index % l.itemsPerLine);

        return lineIndex * (l.primarySize);

    }

    _RefreshStream() {

    }

    _Render() {
        this._header = dom.El(`div`, { class: `header fixture` }, this._host);
        this._footer = dom.El(`div`, { class: `footer fixture` }, this._host);
        this._rectTracker.Add(this._header);
        this._rectTracker.Add(this._footer);
    }

    _CleanUp() {
        this._options = {};//u.tils.DeepClear(this._options, true); //Circular bs going on
        super._CleanUp();
    }

}

module.exports = DOMStreamer;
UI.Register(`nkmjs-dom-stream`, DOMStreamer);