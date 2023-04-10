'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const UI = require(`../ui`);

const SIGNAL = require(`../signal`);
const dom = require(`../utils-dom`);

const RectTracker = require(`./rect-tracker`);
const DisposableHTMLElement = require("../disposable-htmlelement");

const base = DisposableHTMLElement;
const __empty = `empty`;

class DOMStreamerPlaceholder extends DisposableHTMLElement {
    constructor() { super(); dom.CSSClass(this, `dom-streamer-dummy`); }
}

/**
 * An DOM Streamer is designed to handle a large number of fixed-size dom elements.
 * It works by leveraging resize & intersection observer, and requests
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof common.helpers
 */
class DOMStreamer extends base {
    constructor() { super(); }

    static __useResizeCallback = true;
    static __usePaintCallback = true;
    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`owner`)
        .To(`host`)
        .To(`layout`);

    _Init() {
        super._Init();

        this._layout = {};
        this._layoutInfos = {};

        this._focusIndex = -1;
        this._indicesMap = {};

        this._options = {};

        this._linePaddingBottom = 1;
        this._releaseClearedItems = true;
        this._itemCount = 0;

        this._dummyItemClass = null;

        this._fixture = null;
        this._drawArea = { width: 0, height: 0 };
        this._customArea = { start: 0, size: 0 };
        this._indices = { start: 0, end: 0 };
        this._items = [];

        this._useCustomArea = false;

        this._activeFragment = null;
        this._styleString = ``;

        this._isVertical = true; //TODO: Implement orientation flag instead

        this._rectTracker = new RectTracker(this._Bind(this._UpdateStreamRect), this);
        this._Bind(this._ItemRequestCallback);

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

        this._styles = style.STYLE.Get(this.constructor, this.constructor, false, true);
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

    static _Style() {
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
                'grid-row-start': 'header',
                'grid-column': `1/-1`, // take one full width
            },
            '.dom-streamer-item': {
                'position': 'relative'
                //'box-sizing': 'border-box',
                //'flex-grow': `1`,
                //'flex': `0 0 auto`,
            },
            '.dom-streamer-dummy': {
                'position': 'relative'
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
        this.constructor.__distribute.Update(this, p_options);
    }

    get owner() { return this._owner; }
    set owner(p_value) { this._owner = p_value; }

    get releaseClearedItems() { return this._releaseClearedItems; }
    set releaseClearedItems(p_value) { this._releaseClearedItems = true; }

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
                fixedSize:true,
                customArea:{ start:0, size:0 }
            }

        #2 - Fixed item size
            {
                itemWidth:200,
                itemHeight:200,
                itemCount:5000,
                fixedSize:true,
                customArea:{ start:0, size:0 }
            }
         */

        this._layout.fixedSize = `fixedSize` in this._layout ? this._layout.fixedSize : false;

        if (this._layout.itemSlots) {
            this._layout.itemSize = this._layout.itemSize || this._layout.itemWidth || this._layout.itemHeight || 100;
            delete this._layout.itemWidth;
            delete this._layout.itemHeight;
        } else {
            this._layout.itemWidth = this._layout.itemWidth || this._layout.itemHeight || this._layout.itemSize || 100;
            this._layout.itemHeight = this._layout.itemHeight || this._layout.itemWidth || this._layout.itemSize || 100;
            delete this._layout.itemSize;
        }

        if (this._layout.customArea) {
            this._customArea = { ...this._layout.customArea };
            this._useCustomArea = true;
        } else {
            this._useCustomArea = false;
        }

        if (`itemCount` in p_value) { this.itemCount = p_value.itemCount; }
        else { this._RefreshLayoutInfos(); }

    }

    get focusIndex() { return this._focusIndex; }
    set focusIndex(p_value) { this._focusIndex = p_value; }

    SetFocusIndex(p_index = -1, p_reset = true) {
        this.focusIndex = p_index;
        if (p_index != -1) {
            if (p_reset) { this.ScrollToIndex(p_index); }
        }
        else if (p_reset) { this.ScrollToIndex(0); }
    }

    GetItemAt(p_index = -1) {
        if (p_index in this._indicesMap) { return this._indicesMap[p_index]; }
        return null;
    }

    get itemCount() { return this._itemCount; }
    set itemCount(p_value) {
        this._itemCount = p_value;
        this._ClearItems();
        this._RefreshLayoutInfos();
    }

    set customArea(p_value) {
        this._customArea = p_value;
    }

    get customStart() { return this._customArea.start; }
    set customStart(p_value) {
        this._customArea.start = p_value;
    }

    get customSize() { return this._customArea.size; }
    set customSize(p_value) {
        this._customArea.size = p_value;
    }

    get useCustomArea() { this._useCustomArea; }
    set useCustomArea(p_value) {
        if (this._useCustomArea == p_value) { return; }
        this._useCustomArea = p_value;

    }

    _OnSizeChange(p_contentRect) {
        this._RefreshLayoutInfos();
    }

    _RequestItem(p_itemIndex) {
        this._requestResult = null;
        if (p_itemIndex < 0) { return; }
        this.Broadcast(SIGNAL.ITEM_REQUESTED, this, p_itemIndex, this._activeFragment, this._ItemRequestCallback);
    }

    _RequestUpdate(p_itemIndex) {
        //TODO: Support swapping widgets if type changed (Dummy vs non-dummy, ...)
        //!!! Right now this only works with unique widget class setups !!!
        if (p_itemIndex < 0) { return; }
        this.Broadcast(SIGNAL.ITEM_UPDATE_REQUESTED, this, p_itemIndex, this._indicesMap[p_itemIndex]);
    }

    _RequestDummy(p_itemIndex) {
        if (p_itemIndex < 0) { return; }
        let dummy = UI.Rent(DOMStreamerPlaceholder);
        dom.Attach(dummy, this._activeFragment);
        this._requestResult = dummy;
    }

    _ClearItem(p_item) {
        this.Broadcast(SIGNAL.ITEM_CLEARED, p_item);
        delete this._indicesMap[p_item.dataIndex];
        p_item.dataIndex = -1;
        if (this._releaseClearedItems) { p_item.Release(); }
    }

    /**
     * Release all items
     */
    _ClearItems() {
        for (let i = 0; i < this._items.length; i++) { this._ClearItem(this._items[i]); }
        this._items.length = 0;
        this._forceRefresh = true;
    }

    _ItemRequestCallback(p_itemIndex, p_item) {
        dom.CSSClass(p_item, `dom-streamer-item`);
        p_item.dataIndex = p_itemIndex;
        this._indicesMap[p_item.dataIndex] = p_item;
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
            items = this._itemCount, //total number of items
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
            streamLines = Math.max(Math.ceil(streamAvailSpace / primarySize), 1) + this._linePaddingBottom,
            totalSize = primarySize * lines,
            streamSize = streamLines * primarySize,
            infos = this._layoutInfos,
            resize = false;

        if (infos.streamItems != streamLines * itemsPerLine) { resize = true; }

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
        infos.maxCoord = totalSize - streamAvailSpace;
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

        dom.CSSClass(this, __empty, items == 0);

        if (p_updateRect) { this._UpdateStreamRect(); }

        if (resize) {
            this.Broadcast(SIGNAL.RESIZE, this);
            if (this._focusIndex != -1) {
                this.ScrollToIndex(this._focusIndex);
            }
        }

    }

    /**
     * This is the core method of the DOM Streamer.
     * It computes which item indices are currently visible, removes
     * non-visible one and requests missing ones that should be visible.
     */
    _UpdateStreamRect() {

        if (this._useCustomArea) {
            this._UpdateCustomStreamRect();
            return;
        }

        let
            selfRect = this._rectTracker.GetIntersect(this),
            fixtRect = this._rectTracker.GetRect(this._fixture);

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
            startCoord = Math.abs(v ? selfRect.y - fixtRect.y : selfRect.x - fixtRect.x);

        if (startCoord < 0 || Number.isNaN(startCoord)) { startCoord = 0; }

        let
            lineStart = Math.min(Math.floor(startCoord / l.primarySize), l.lines),
            newStart = Math.min(lineStart * l.itemsPerLine, l.items),
            newEnd = Math.min(newStart + l.streamItems, l.items);

        let streamed = this._Stream(newStart, newEnd, this._forceRefresh);
        this._forceRefresh = false;

        if (!streamed) { return; }

        dom.CSS(this._fixture, `grid-row-end`, `span ${lineStart + 1}`);

    }

    _UpdateCustomStreamRect() {

        // Update streamer based on custom start & end coordinates.

        let
            selfRect = this._rectTracker.GetIntersect(this),
            customStart = this._customArea.start,
            customSize = customStart + this._customArea.size,
            v = this._isVertical;

        if (!selfRect) { return; }

        if ((v && this._drawArea.width != selfRect.width) ||
            (!v && this._drawArea.height != selfRect.height)) {
            this._drawArea.width = v ? selfRect.width : customSize;
            this._drawArea.height = v ? customSize : selfRect.height;
            this._RefreshLayoutInfos(false);
        }

        let
            l = this._layoutInfos,
            startCoord = customStart;

        if (startCoord < 0 || Number.isNaN(startCoord)) { startCoord = 0; }

        let
            lineStart = Math.min(Math.floor(startCoord / l.primarySize), l.lines),
            newStart = Math.min(lineStart * l.itemsPerLine, l.items),
            newEnd = Math.min(newStart + l.streamItems, l.items);

        let streamed = this._Stream(newStart, newEnd, this._forceRefresh);
        this._forceRefresh = false;

        if (!streamed) { return; }

        dom.CSS(this._fixture, `grid-row-end`, `span ${lineStart + 1}`);

    }

    Reload() {
        this._Stream(this._indices.start, this._indices.end, true);
    }

    _Stream(p_start = null, p_end = null, p_force = false) {

        let
            oldStart = this._indices.start,
            oldEnd = this._indices.end,
            insertBefore = 0,
            insertAfter = 0;

        p_start = p_start == null ? oldStart : p_start;
        p_end = p_end == null ? oldEnd : p_end;

        if (p_start == oldStart &&
            p_end == oldEnd &&
            !p_force) {
            return false;
        }

        this._indices.start = p_start;
        this._indices.end = p_end;

        this.Broadcast(SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this, this._indices);

        // Check if this is a complete refresh
        if (p_force ||
            p_start >= oldEnd ||
            p_end <= oldStart) {

            this._ClearItems();
            insertAfter = p_end - p_start;

        } else {

            insertBefore = oldStart - p_start;
            insertAfter = p_end - oldEnd;

            let
                popCount = oldEnd - p_end,
                shiftCount = p_start - oldStart;

            if (popCount > 0) {
                for (let i = 0; i < popCount; i++) {
                    let item = this._items.pop();
                    if (item) { this._ClearItem(item); }
                }
            }

            if (shiftCount > 0) {
                for (let i = 0; i < shiftCount; i++) {
                    let item = this._items.shift();
                    if (item) { this._ClearItem(item); }
                }
            }

        }

        if (insertBefore > 0) {

            this._activeFragment = document.createDocumentFragment();

            for (let i = 0; i < insertBefore; i++) {
                let index = p_start + i;
                this._RequestItem(index);
                if (!this._requestResult) { this._RequestDummy(index); }
                if (this._requestResult) {
                    this._items.splice(i, 0, this._requestResult);
                } else {
                    // missing item. Fill with dummy ?
                }
            }

            dom.AttachAfter(this._activeFragment, this._fixture);
            this._activeFragment = null;
        }

        if (insertAfter > 0) {

            this._activeFragment = document.createDocumentFragment();

            for (let i = 0; i < insertAfter; i++) {
                let index = p_end - insertAfter + i;
                this._RequestItem(index);
                if (!this._requestResult) { this._RequestDummy(index); }
                if (this._requestResult) {
                    this._items.push(this._requestResult);
                } else {
                    // missing item. Fill with dummy ?
                }
            }

            dom.Attach(this._activeFragment, this._host);
            this._activeFragment = null;
        }

        return true;

    }

    UpdateInPlace() {
        for (let i = this._indices.start; i < this._indices.end; i++) {
            this._RequestUpdate(i);
        }
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
            lineIndex = Math.floor(p_index / l.itemsPerLine);

        if (lineIndex < 0) { lineIndex = 0; }
        if (lineIndex > l.lines) { lineIndex = l.lines; }

        return lineIndex * (l.primarySize);

    }

    /**
    * 
    * @param {*} p_index 
    * @param {Number} p_mode 0 = top, 1 = center, 2 = bottom, 3 = custom offset (based on top)
    */
    ScrollToIndex(p_index = 0, p_mode = 1, p_offset = null) {

        //TODO: Find index location in main axis
        let
            baseOffset = this.GetIndexOffset(p_index),
            iSize = this._layoutInfos.primarySize,
            sSize = this._layoutInfos.streamSize;


        switch (p_mode) {
            default:
            case 0:
                break;
            case 1: // Center
                baseOffset -= (sSize * 0.5 - iSize);
                break;
            case 2: // Bottom
                baseOffset -= (sSize);
                break;
            case 3: // Manual
                baseOffset -= p_offset != null ? p_offset : 0;
                break;
        }

        if (this._isVertical) { this.scroll({ top: baseOffset }); }
        else { this.scroll({ left: baseOffset }); }

    }

    _RefreshStream() {

    }

    _Render() {
        this._fixture = dom.El(`div`, { class: `header fixture` }, this._host);
        this._rectTracker.Add(this._fixture);
    }

    _CleanUp() {
        this._options = {};
        super._CleanUp();
    }

}

module.exports = DOMStreamer;
UI.Register(`nkmjs-dom-stream`, DOMStreamer);