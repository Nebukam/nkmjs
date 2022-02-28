'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

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

        this._linePaddingTop = 1;
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

    _Style() {
        return {
            ':host': {
                'position': 'relative',
                'display': 'grid',
            },
            '.fixture': {
                'min-height': 0,
                'width': '100%',
                'flex-grow': `1`,
                'height': '0px',
                'grid-column': `1/-1`, // take one full width
            },
            '.dom-streamer-header': {
            },
            '.dom-streamer-footer': {
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
                totalItems:5000
            }

        #2 - Fixed item size
            {
                itemWidth:200,
                itemHeight:200,
                totalItems:5000  
            }
         */


    }

    _OnSizeChange(p_contentRect) {
        this._cachedRect = p_contentRect;
        this._RefreshLayoutInfos();
    }

    _RequestItem(p_itemIndex) {
        this._requestResult = null;
        this._Broadcast(SIGNAL.ITEM_REQUESTED, this, p_itemIndex, this._activeFragment);
    }

    ItemRequestAnswer(p_itemIndex, p_item) {
        p_item.classList.add(`dom-streamer-item`);
        this._requestResult = p_item;
    }

    _RefreshLayoutInfos() {

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
                iHeight = Math.max(math.floor(lineSize / l.itemSlots), 1);
                iWidth = l.itemSize;
            } else {
                iHeight = l.itemSize;
                iWidth = Math.max(math.floor(lineSize / l.itemSlots), 1);
            }
        } else {
            iWidth = l.itemSize || l.itemWidth || l.itemHeight;
            iHeight = l.itemSize || l.itemHeight || iWidth;
        }

        //TODO : Account for margin etc
        iSize = v ? iHeight : iWidth;
        lineItemCount = Math.max(Math.floor(lineSize / iSize), 1); //min 1 item per line


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
        infos.lineItemCount = lineItemCount;
        infos.itemSize = iSize;

        let st = `:host{ grid-template-columns:repeat( ${lineItemCount}, ${100 / lineItemCount}%); }`;
        st += `.dom-streamer-item { width:${iWidth}px; height:${iHeight}px }`;
        this._itemStyle.innerHTML = st;

        console.log(`_RefreshLayoutInfos :: ${JSON.stringify(this._layoutInfos)}`);

    }

    _OnRectUpdate() {

        let
            v = this._isVertical,
            l = this._layoutInfos,
            linePaddingTop = this._linePaddingTop * l.itemSize,
            selfRect = this._rectTracker.GetIntersect(this),
            fixtRect = this._rectTracker.GetRect(this._header),
            startCoord = Math.abs(v ? selfRect.y - fixtRect.y : selfRect.x - fixtRect.x) - linePaddingTop;

        if (startCoord < 0 || isNaN(startCoord)) { startCoord = 0; }

        if (this._drawArea.width != selfRect.width ||
            this._drawArea.height != selfRect.height) {
            this._drawArea.width = selfRect.width;
            this._drawArea.height = selfRect.height;
            this._RefreshLayoutInfos();
        }

        let
            lineStart = Math.floor(startCoord / l.itemSize),
            newStart = lineStart * l.lineItemCount,
            newEnd = newStart + l.streamItemCount,
            newLength = newEnd - newStart,

            oldStart = this._indices.start,
            oldEnd = this._indices.end,
            oldLength = oldEnd - oldStart,

            insertBefore = 0,
            insertAfter = 0;

        if (newStart == oldStart &&
            newEnd == oldEnd) {
            return;
        }

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
            headerSize = lineStart * l.itemSize,
            footerSize = l.totalSize - (l.streamLineCount * l.itemSize + headerSize);

        this._header.style.setProperty(`margin-bottom`, `${headerSize}px`);
        this._footer.style.setProperty(`margin-top`, `${footerSize}px`);

        // TODO : implement an option to "pin" indices and scrollIntoView() them.


        this._indices.start = newStart;
        this._indices.end = newEnd;

    }

    _ClearItems() {
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].Release();
        }
        this._items.length = 0;
    }


    _RefreshStream() {

    }

    _Render() {
        this._header = dom.El(`div`, { class: `dom-streamer-header fixture` }, this._host);
        this._footer = dom.El(`div`, { class: `dom-streamer-footer fixture` }, this._host);
        this._rectTracker.Add(this._header);
        this._rectTracker.Add(this._footer);
    }

    _Wake() {
        super._Wake();
        this._rectTracker.Enable();
    }

    _CleanUp() {
        this._options = {};//u.tils.DeepClear(this._options, true); //Circular bs going on
        this._rectTracker.Disable();
        super._CleanUp();
    }

}

module.exports = DOMStreamer;