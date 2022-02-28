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

        this._header = null;
        this._footer = null;
        this._drawArea = { width: 0, height: 0 };
        this._indices = { start: 0, end: 0 };
        this._activeFragment = null;
        this._items = [];

        this._isVertical = true; //TODO: Implement orientation flag instead

        this._rectTracker = new RectTracker(this._Bind(this._OnRectUpdate), this);

        this._headerIntersects = false;
        this._footerIntersects = false;
        this._startIndex = 0;

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
                'display': 'flex',
                'flex-flow': 'row wrap'
            },
            '.fixture': {
                'min-height': 0,
                'width': '100%',
                'height': '0px'
            },
            '.dom-streamer-header': {
                //'flex': '1 0 auto',

                'border': '1px solid blue'
            },
            '.dom-streamer-footer': {
                'border': '1px solid yellow',
                'margin-top': '0px'
            },
            '.dom-streamer-item': {

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

        let iw = this._layout.itemWidth, ih = this._layout.itemHeight;
        this._itemStyle.innerHTML = `.dom-streamer-item { width:${iw}px; height:${ih}px }`;


    }

    _OnSizeChange(p_contentRect) {
        this._cachedRect = p_contentRect;
        this._RefreshLayoutInfos();
    }

    _OnHeaderIntersectToggle(p_toggle, p_rect) {
        if (this._headerIntersects == p_toggle) { return; }
        console.log(`Header intersect : ${p_toggle}`, p_rect);
        this._headerIntersects = p_toggle;
    }

    _OnFooterIntersectToggle(p_toggle, p_rect) {
        if (this._footerIntersects == p_toggle) { return; }
        console.log(`Footer intersect : ${p_toggle}`, p_rect);
        this._footerIntersects = p_toggle;
    }

    _RequestItem(p_itemIndex) {
        this._Broadcast(SIGNAL.ITEM_REQUESTED, this, p_itemIndex, this._activeFragment);
    }

    ItemRequestHandled(p_itemIndex, p_item) {
        p_item.classList.add(`dom-streamer-item`);
        this._items.push(p_item);
        console.log(`${p_item}`);
    }

    _RefreshLayoutInfos() {

        let
            v = this._isVertical,
            l = this._layout,
            aw = this._drawArea.width, ah = this._drawArea.height,
            lineSize = v ? aw : ah, // Space available for a single line of items
            iWidth = 0, iHeight = 0, iSize = 0, //item desired size
            totalItemCount = l.itemCount, //total number of items
            itemCountPerLine = 0; //item per row or column


        if (l.itemSlots) {
            itemCountPerLine = l.itemSlots;
            iHeight = l.itemSize;
            iWidth = Math.max(math.floor(lineSize / itemCountPerLine), 1); //TODO : Account for margin etc
        } else {
            iWidth = l.itemSize || l.itemWidth || l.itemHeight;
            iHeight = l.itemSize || l.itemHeight || iWidth;
            itemCountPerLine = Math.max(Math.floor(lineSize / (v ? iWidth : iHeight)), 1); //min 1 item per line
        }

        iSize = v ? iHeight : iWidth;

        console.log(this._drawArea);

        let
            streamAvailSpace = v ? ah : aw,
            totalLineCount = Math.max(Math.ceil(totalItemCount / itemCountPerLine), 1),
            streamLineCount = Math.max(Math.ceil(streamAvailSpace / iSize), 1), // +1 ?
            totalSize = iSize * totalLineCount,
            streamSize = streamLineCount * iSize,
            itemCountInStream = streamLineCount * itemCountPerLine;

        this._layoutInfos.streamSize = streamSize;
        this._layoutInfos.totalLineCount = totalLineCount;
        this._layoutInfos.streamLineCount = streamLineCount;
        this._layoutInfos.totalSize = totalSize;
        this._layoutInfos.itemCountPerLine = itemCountPerLine;
        this._layoutInfos.itemCountInStream = itemCountInStream;
        this._layoutInfos.itemSize = iSize;

        console.log(this._layoutInfos);

    }

    _OnRectUpdate() {

        let
            v = this._isVertical,
            selfRect = this._rectTracker.GetIntersect(this),
            fixtRect = this._rectTracker.GetRect(this._header),
            startCoord = Math.abs(v ? selfRect.y - fixtRect.y : selfRect.x - fixtRect.x),
            l = this._layoutInfos;

        if (this._drawArea.width != selfRect.width ||
            this._drawArea.height != selfRect.height) {
            this._drawArea.width = selfRect.width;
            this._drawArea.height = selfRect.height;
            this._RefreshLayoutInfos();
        }

        let
            startLineIndex = Math.floor(startCoord / l.itemSize),
            headerSize = startLineIndex * l.itemSize,
            footerSize = l.totalSize - (l.streamLineCount * l.itemSize + headerSize),
            startIndex = startLineIndex * l.itemCountPerLine,
            endIndex = startIndex + l.itemCountInStream,
            oldStart = this._indices.start,
            oldEnd = this._indices.end;

        if (startIndex == oldStart &&
            endIndex == oldEnd) {
            return;
        }

        /*
        let
            shiftCount = 0,
            popCount = 0,
            length = this._items.length;
        // - Find how many items should be removed
        // - Find how many items should be added
        for (let i = 0; i < length; i++) {
            let ii = oldStart + i;
            if (ii < startIndex) { shiftCount++; }
            else if (ii > endIndex) { popCount++; }
        }



        if ((shiftCount + popCount) >= length) {
            // No item can be salvaged.
        } else {
            // Some items can be salvaged.
            if (shiftCount > 0) {
                let unshifted = this._items.splice(0, shiftCount);
                for (let i = 0; i < unshifted.length; i++) {
                    RemoveItem(unshifted[i]);
                }
            }

            if (popCount > 0) {
                let popStart = this._items.length - popCount,
                    popped = this._items.splice(popStart, popCount);
                for (let i = 0; i < popped.length; i++) {
                    RemoveItem(popped[i]);
                }
            }

        }

        */

        for (let i = 0; i < this._items.length; i++) {
            this._items[i].Release();
        }
        this._items.length = 0;

        this._activeFragment = document.createDocumentFragment();

        let length = endIndex - startIndex;

        for (let i = 0; i < length; i++) {
            let ii = startIndex + i;
            this._RequestItem(ii);
        }

        this._header.style.setProperty(`margin-bottom`, `${headerSize}px`);
        this._footer.style.setProperty(`margin-top`, `${footerSize}px`);

        this._host.insertBefore(this._activeFragment, this._footer);
        this._activeFragment = null;

        console.log(`${startIndex} || ${endIndex} // ${this._layout.itemCount})`);

        // TODO : implement an option to "pin" indices and scrollIntoView() them.


        this._indices.start = startIndex;
        this._indices.end = endIndex;

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