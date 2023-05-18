'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const CTX = require(`../context`);
const ControlManager = require("./control-manager");

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class DataListHandler extends ControlManager {

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`host`, `_host`)
        .To(`css`, `_defaultCSS`)
        .To(`dataFn`, `_preProcessDataFn`);

    constructor(p_owner, p_defaultCSS = `ctrl`) {
        super(p_owner, p_defaultCSS);

        this.Handle = this.Handle.bind(this);
        this._RefreshIndices = this._RefreshIndices.bind(this);

        this._dataListObserver = new com.signals.Observer();
        this._dataListObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(com.SIGNAL.SORTED, this._OnListSorted, this);

        this._scheduledIndicesRefresh = com.DelayedCall(this._RefreshIndices);

    }

    get dataList() { return this._dataList; }
    set dataList(p_value) {
        if (this._dataList == p_value) { return; }

        this._dataList = p_value;
        this._dataListObserver.ObserveOnly(this._dataList);

        this.Clear();

        if (this._dataList) { this._dataList.ForEach(this.Handle); }

    }

    _OnItemAdded(p_list, p_item, p_index) {
        this.Handle(p_item);
        this._scheduledIndicesRefresh.Schedule();
    }

    _OnItemRemoved(p_list, p_item, p_index) {
        this.Release(p_item);
        this._scheduledIndicesRefresh.Schedule();
    }

    _OnListSorted(p_list) {
        this._RefreshIndices();
    }

    _RefreshIndices() {
        if (!this._dataList) { return; }
        let i = 0;
        this._dataList.ForEach(item => {
            let ctrl = this._dataMap.get(item);
            if (ctrl) { ctrl.order = i++; }
        })
    }

}

module.exports = DataListHandler;