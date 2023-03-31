'use strict';

const com = require(`@nkmjs/common`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const helpers = require(`../helpers`);

const base = require(`../control-view`);

class StreamingDataListView extends base {
    constructor() { super(); }

    static __default_headerViewClass = null;
    static __default_footerViewClass = null;
    static __default_widgetClass = null;
    static __default_layoutOptions = {
        itemWidth: 200,
        itemHeight: 200,
        itemCount: 0,
        gap: 5,
        //customArea:{ start:0, size:200 }
    };

    _Init() {
        super._Init();

        this._domStreamer = null;
        this._dataMap = new Map();

        this._inspectionDataForward = new helpers.InspectionDataBridge(this);
        this.forwardEditor.To(this._inspectionDataForward);

        this._scheduledRefresh = com.DelayedCall(this._Bind(this._RefreshItems));
        this._scheduledOnCountChanged = com.DelayedCall(this._Bind(this._ReloadList));

        this._dataObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(com.SIGNAL.SORTED, this._OnListSorted, this);

        let dataSel = ui.helpers.HostSelStack(this, true, true, {
            add: {
                fn: (p_sel, p_index) => {
                    let widget = this._domStreamer.GetItemAt(p_index);
                    if (widget) { widget.Select(true); }
                    else { p_sel.Add(this._contentSource[p_index]); }
                }, thisArg: this
            },
            remove: {
                fn: (p_sel, p_index, p_data) => {
                    let widget = this._domStreamer.GetItemAt(p_index);
                    if (widget) { widget.Select(false); }
                    else { p_sel.Remove(this._contentSource[p_index]); }
                }, thisArg: this
            },
            count: {
                fn: (p_sel) => { return this._contentSource ? this._contentSource.length : 0; }, thisArg: this
            },
            index: {
                fn: (p_sel, p_data) => { return this._contentSource ? this._contentSource.indexOf(p_data) : -1; }, thisArg: this
            },
        }).data;

        //dataSel.autoBump = true;

        this._inspectionDataForward.dataSelection = dataSel;
        dataSel
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnSelectionStackBump, this)
            .Watch(com.SIGNAL.ITEM_BUMPED, this._OnSelectionStackBump, this);

        this._contentSource = null;

    }

    _PostInit() {
        super._PostInit();
    }

    //#region Render

    static _Style() {
        return style.Extends({
            ':host': {
                'position': 'relative',
                'display': 'flex',
                'flex-flow': 'column nowrap',
                '--streamer-gap': '10px',
                'overflow': 'clip'
            },
            '.header, .search, .footer': {
                'flex': '0 0 auto',
            },
            '.dom-stream': {
                'position': 'relative',
                'flex': '1 1 auto',
                'overflow': 'auto',
            },
            '.dom-stream.empty': {
                'display': 'block !important'
            },
        }, base._Style());
    }

    _Render() {
        super._Render();

        if (this.constructor.__default_headerViewClass) {
            this._header = this.Attach(this.constructor.__default_headerViewClass, `header`);
        }

        this._domStreamer = this.Attach(ui.helpers.DOMStreamer, 'dom-stream');
        this._domStreamer
            .Watch(ui.SIGNAL.ITEM_CLEARED, this._OnItemCleared, this)
            .Watch(ui.SIGNAL.ITEM_REQUESTED, this._OnItemRequested, this);

        this._domStreamer.options = {
            layout: { ...this.constructor.__default_layoutOptions }
        };

        if (this.constructor.__default_footerViewClass) {
            this._footer = this.Attach(this.constructor.__default_footerViewClass, `footer`);
        }

        this.forwardData
            .To(this._header)
            .To(this._footer);

        this.forwardContext
            .To(this._header)
            .To(this._footer);

    }

    SetItemSize(p_width, p_height) {

        this._domStreamer.options = {
            layout: {
                itemWidth: p_width,
                itemHeight: p_height + 50,
                gap: 5
            }
        };

    }

    //#endregion

    //#region DOM Streamer handling

    _SetContentSource(p_dataList) {

        this._contentSource = p_dataList;
        this._domStreamer.itemCount = p_dataList ? p_dataList.count : 0;

        if (p_dataList != null) {
            let index = p_dataList.IndexOf(this.editor.inspectedData.lastItem);
            if (index != -1) { this._domStreamer.SetFocusIndex(index); }
        }

    }

    _OnItemRequested(p_streamer, p_index, p_fragment, p_returnFn) {

        let data = this._contentSource ? this._contentSource.At(p_index) : null;

        if (!data) { return; }


        //TODO: 
        let widgetClass = com.BINDINGS.Get(this, data, this.constructor.__default_widgetClass);

        if (!widgetClass) { return; }

        let widget = this.Attach(widgetClass, 'item', p_fragment);
        widget.context = this._data;
        widget.data = data;

        this._dataMap.set(data, widget);

        p_returnFn(p_index, widget);

        this.selectionStack.Check(widget);

        if (this.selectionStack.data.isEmpty) {
            if (!this.editor.inspectedData.isEmpty) {
                if (this.editor.inspectedData.Contains(data)) {
                    widget.Select(true);
                }
            }
        }

    }

    _OnItemCleared(p_item) {
        this._dataMap.delete(p_item.data);
    }

    _OnSelectionStackBump(p_data) {
        this._domStreamer.SetFocusIndex(this._data.IndexOf(p_data), false);
    }

    //#endregion

    //#region Catalog Management

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        this.selectionStack.Clear();
        this._domStreamer.SetFocusIndex(-1);

        this._ReloadList();

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
    }

    _RefreshItems() {
        this._domStreamer._Stream(null, null, true);
    }

    //#endregion

    //#region Preview updates

    _OnItemAdded(p_dataList, p_item) {
        this._scheduledOnCountChanged.Schedule();
    }

    _OnItemRemoved(p_dataList, p_item) {
        this._scheduledOnCountChanged.Schedule();
    }

    _OnListSorted(){
        this._RefreshItems();
    }

    _ReloadList() {
        this._SetContentSource(this._data);
    }

    //#endregion

}

module.exports = StreamingDataListView;
ui.Register(`mkf-data-list-view`, StreamingDataListView);