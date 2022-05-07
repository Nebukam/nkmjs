
'use strict';

const com = require("@nkmjs/common");
const collections = require("@nkmjs/collections");

const FILTER_SIGNAL = require(`./catalog-filter-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class FilterList extends com.pool.DisposableObjectEx {

    constructor() {
        super();
        this._filters = new collections.List();
        this._activeFilters = new collections.List();
        this._activeFiltersArray = this._activeFilters.internalArray;

        this._filterObserver = new com.signals.Observer();
        this._filterObserver
            .Hook(FILTER_SIGNAL.ENABLED, this._OnFilterEnabled, this)
            .Hook(FILTER_SIGNAL.DISABLED, this._OnFilterDisabled, this);

    }

    /**
     * 
     * @param {*} p_filter 
     * @returns true if the filter has been added, false if it was already present
     */
    AddFilter(p_filter) {
        if (this._filters.Contains(p_filter)) { return false; }
        this._filters.Add(p_filter);

        this._filterObserver.Observe(p_filter);

        if (p_filter.enabled) { this._OnFilterEnabled(p_filter); }

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_filter);
        return true;
    }

    /**
     * 
     * @param {*} p_filter 
     * @returns true if the filter has been removed, false if it wasn't there
     */
    RemoveFilter(p_filter) {
        if (!this._filters.Remove(p_filter)) { return false; }

        if (p_filter.enabled) { this._OnFilterDisabled(p_filter); }

        this._filterObserver.Unobserve(p_filter);

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_filter);
        return true;
    }

    _OnFilterEnabled(p_filter) {
        if (!this._activeFilters.Add(p_filter)) { return; }
        this.Broadcast(FILTER_SIGNAL.ENABLED, this, p_filter);
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    _OnFilterDisabled(p_filter) {
        if (!this._activeFilters.Remove(p_filter)) { return; }
        this.Broadcast(FILTER_SIGNAL.DISABLED, this, p_filter);
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    Pass(p_item) {
        for (let i = 0, n = this._activeFiltersArray.length; i < n; i++) {
            if (!this._activeFiltersArray[i].Pass()) { return false; }
        }
        return true;
    }

    _CleanUp() {
        this._filters.Clear();
        this._activeFilters.Clear();
        super._CleanUp();
    }

    toString() {
        return `{tags:${this._name}}`;
    }

}

module.exports = FilterList;