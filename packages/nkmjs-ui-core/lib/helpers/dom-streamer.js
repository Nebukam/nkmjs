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

        this._isVertical = true; //TODO: Implement orientation flag instead

        this._rectTracker = new RectTracker(this._Bind(this._OnRectUpdate), this);

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
                'order': '-9999999' //ugh.
            },
            '.footer': {
                'order': '9999999' //ugh.
            },
            '.dom-streamer-item': {
                'box-sizing': 'border-box',
                'flex-grow': `1`,
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
        if (this._layout.itemCount == p_value) { return; }
        this._layout.itemCount = p_value;
        this._RefreshLayoutInfos();

    }

    _OnSizeChange(p_contentRect) {
        this._cachedRect = p_contentRect;
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
            lineSize = v ? aw : ah, // Space available for a single line of items
            iWidth = 0, iHeight = 0, iSize = 0, //item desired size
            totalItemCount = l.itemCount, //total number of items
            lineItemCount = 0; //item per row or column

        if (l.itemSlots) {
            lineItemCount = l.itemSlots;
            if (v) {
                iHeight = l.itemSize;
                iWidth = Math.max(Math.floor(lineSize / l.itemSlots), 1);
            } else {
                iHeight = Math.max(Math.floor(lineSize / l.itemSlots), 1);
                iWidth = l.itemSize;
            }
        } else {
            iWidth = l.itemSize || l.itemWidth || l.itemHeight;
            iHeight = l.itemSize || l.itemHeight || iWidth;
            if (v) {
                lineItemCount = Math.max(Math.floor(lineSize / iHeight), 1); //min 1 item per line
            } else {
                lineItemCount = Math.max(Math.floor(lineSize / iWidth), 1); //min 1 item per line
            }
        }

        //TODO : Account for margin etc
        iSize = v ? iHeight : iWidth;

        let
            streamAvailSpace = v ? ah : aw,
            totalLineCount = Math.max(Math.ceil(totalItemCount / lineItemCount), 1),
            streamLineCount = Math.max(Math.ceil(streamAvailSpace / iSize), 1) + this._linePaddingBottom + this._linePaddingBottom,
            totalSize = iSize * totalLineCount,
            streamSize = streamLineCount * iSize,
            streamItemCount = streamLineCount * lineItemCount,
            infos = this._layoutInfos;

        infos.streamSize = streamSize;
        infos.streamLineCount = streamLineCount;
        infos.streamItemCount = streamItemCount;
        infos.totalSize = totalSize;
        infos.totalLineCount = totalLineCount;
        infos.totalItemCount = totalItemCount;
        infos.maxItemCount = totalLineCount * lineItemCount;
        infos.lineItemCount = lineItemCount;
        infos.itemSize = iSize;
        infos.fixedSize = l.fixedSize;
        infos.maxCoord = totalSize - streamSize;

        this._indices.length = streamItemCount;

        let st = ``;
        if (lineItemCount == 1) {
            //st += `:host{ display:flex; flex-flow:column nowrap; }`;
            //st += `.dom-streamer-item { flex:0 0 auto; min-width:${iWidth}px; height:${iHeight}px; max-height:${iHeight}px; }`;
        } else {

        }

        st += `:host{  grid-template-columns:repeat( ${lineItemCount}, ${100 / lineItemCount}%); }`;
        st += `.dom-streamer-item { min-width:${iWidth}px; height:${iHeight}px; max-height:${iHeight}px; }`;

        this._itemStyle.innerHTML = st;

        if (l.fixedSize) {
            if (v) {
                this.style.setProperty(`height`, `${totalSize}px`);
            } else {
                this.style.setProperty(`width`, `${totalSize}px`);
            }
        } else {
            this.style.setProperty(`height`, null);
            this.style.setProperty(`width`, null);
        }

        if(totalItemCount == 0){ this.classList.add(`empty`); }
        else{ this.classList.remove(`empty`); }

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

        if (l.streamSize < l.totalSize) {
            if (startCoord > l.totalSize - l.streamSize) { startCoord = Math.min(l.totalSize - l.streamSize); }
        } else {
            if (startCoord > l.totalSize) { startCoord = l.totalSize; }
        }

        let
            lineStart = Math.min(Math.floor(startCoord / l.itemSize), l.totalLineCount),
            newStart = Math.min(lineStart * l.lineItemCount, l.totalItemCount),
            newEnd = Math.min(newStart + l.streamItemCount, l.totalItemCount),
            newLength = newEnd - newStart,

            oldStart = this._indices.start,
            oldEnd = this._indices.end,
            oldLength = oldEnd - oldStart;

        if (newStart == oldStart &&
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
        if (newStart >= oldEnd ||
            newEnd <= oldStart) {

            this._ClearItems();
            insertAfter = newLength;

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

        let
            headerSize = Math.max(Math.floor(newStart / l.lineItemCount) * l.itemSize, 0),
            footerSize = l.totalSize - (headerSize + l.streamSize);

        this._header.style.setProperty(`height`, `${headerSize}px`);
        this._footer.style.setProperty(`height`, `${footerSize}px`);

    }

    /**
     * Release all items
     */
    _ClearItems() {
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].Release();
        }
        this._items.length = 0;
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
            lineIndex = p_index / l.lineItemCount - (p_index % l.lineItemCount);

        return lineIndex * l.iSize;

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