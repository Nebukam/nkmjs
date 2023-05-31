// Represent a list of single-typed data, that can act as an array
// But also can be easily used alongside dom-streamer etc
// Can be sorted and searched through.

'use strict';

const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);
const DataList = require(`../data/data-list`);

/**
 * @description Exists for custom sorting purposes only
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class DataListProxy extends com.Observable {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._sourceList = null;
        this._proxyList = new DataList();
        this._sourceListObserver = new com.signals.Observer();
        this._sourceListObserver
            .Hook(com.SIGNAL.ITEM_ADDED, (p_source, p_item) => { this._proxyList.Add(p_item); }, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, (p_source, p_item) => { this._proxyList.Remove(p_item); }, this)
            .Hook(com.SIGNAL.SORTED, () => { this._proxyList.RefreshSorting(); }, this);
    }

    get parent() { return this._proxyList.parent; }
    set parent(p_value) { this._proxyList.parent = p_value; }

    get sourceList() { return this._sourceList; }
    set sourceList(p_value) {
        if (this._sourceList == p_value) { return; }
        let oldList = this._sourceList;
        this._sourceList = p_value;
        this._sourceListObserver.ObserveOnly(p_value);
        this._OnSourceListChanged(oldList);
    }

    get proxyList() { return this._proxyList; }

    _OnSourceListChanged(p_oldList) {
        this._proxyList.Flush();
        if (this._sourceList) { for (const element of this._sourceList._array) { this._proxyList.Add(element); }; }
    }

    _CleanUp() {
        this.sourceList = null;
        this.parent = null;
        this.Clear();
    }

}

module.exports = DataListProxy;