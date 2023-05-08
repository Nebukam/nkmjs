
'use strict';

const com = require("@nkmjs/common");

const FILTER_SIGNAL = require(`./catalog-filter-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class CatalogFilterListHandler extends com.Observable {

    constructor() {
        super();
        this._filters = null;
        this._validItems = [];
        this._invalidItems = [];
    }

    set filters(p_value) {
        if (this._filters == p_value) { return; }

        let oldFilters = this._filters;
        if (oldFilters) {
            oldFilters
                .Unwatch(FILTER_SIGNAL.ENABLED, this._OnFilterEnabled, this)
                .Unwatch(FILTER_SIGNAL.DISABLED, this._OnFilterDisabled, this);
        }

        this._filters = p_value;
        if (p_value) {
            p_value
                .Watch(FILTER_SIGNAL.ENABLED, this._OnFilterEnabled, this)
                .Watch(FILTER_SIGNAL.DISABLED, this._OnFilterDisabled, this);
        } else {
            // Filter have been removed, re-add all previously invalidated items
            for (let i = 0; i < this._invalidItems.length; i++) {
                let item = this._invalidItems[i];
                this._OnItemAdded(item.parent, item);
            }
        }
    }
    get filters() { return this._filters; }

    /**
     * Process will dispatch pass/fail signals.
     * @param {*} p_item 
     * @returns 
     */
    _Process(p_item) {
        if (this._filters.Pass(p_item)) {
            if(this._validItems.includes(p_item)){ return true; }
            this._validItems.push(p_item);
            this.Broadcast(FILTER_SIGNAL.PASSED, this, p_item);
            return true;
        } else {
            if(this._invalidItems.includes(p_item)){ return false; }
            this._invalidItems.push(p_item);
            this.Broadcast(FILTER_SIGNAL.PASSED, this, p_item);
            return false;
        }
    }

    /**
     * Pass is performing check in a vaccuum
     * @param {*} p_item 
     * @returns 
     */
    Pass(p_item) { return this._filters.Pass(p_item); }

    /**
     * 
     * @param {*} p_item 
     * @returns true if item was a valid one, otherwise false.
     */
    Clear(p_item){
        return true;
    }

    _OnFilterEnabled(p_filters, p_filter) {
        // Go over currently valid items
        for (let i = 0; i < this._validItems.length; i++) {
            let item = this._validItems[i];
            if(!this._filters.Pass(item)){
                this._validItems.splice(i,1);
                this._invalidItems.push(p_item);
                i--;
                this.Broadcast(FILTER_SIGNAL.REJECTED, this, p_item);
            }
        }
    }

    _OnFilterDisabled(p_filters, p_filter) {
        // Go over current invalid items
        for (let i = 0; i < this._invalidItems.length; i++) {
            let item = this._invalidItems[i];
            if(this._filters.Pass(item)){
                this._invalidItems.splice(i,1);
                this._validItems.push(p_item);
                i--;
                this.Broadcast(FILTER_SIGNAL.PASSED, this, p_item);
            }
        }
    }

    _OnFilterUpdated(p_filters, p_filter){
        // Need to go over both valid and invalid item
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = CatalogFilterListHandler;