'use strict';

const nkm = require(`@nkmjs/core`);
const u = nkm.u;
const io = nkm.io;

const UNICODE = require(`../unicode`);
const SIGNAL = require(`../signal`);
const IDS = require(`../ids`);

class SearchSettings extends nkm.data.SimpleData {

    constructor() { super(); }

    static __signalValueMap = {
        [IDS.SEARCH_ENABLED]: SIGNAL.SEARCH_TOGGLED
    };

    static __identifiers = [];
    static __fetchFns = [];

    _Init() {

        super._Init();

        this._searchCovered = 0;
        this._cachedAdvance = 0;
        this._fetchFn = null;

        this._terms = [];

        this._dataPool = null;
        this._displayRange = null;
        this._rangeInfos = null;
        this._ready = false;
        this._running = false;

        this._results = [];
        this._resultSet = new Set();

        this._delayedAdvance = nkm.com.DelayedCall(this._Bind(this._AdvanceSearch));

        this._checkFn = null;
        this._itemIDs = [];

        this._termCheckFn = null;
        this._advanceOps = 5000;

    }

    get advanceOps() { return this._advanceOps; }
    set advanceOps(p_value) { this._advanceOps = p_value; }

    _ResetValues(p_values) {

        p_values[IDS.SEARCH_ENABLED] = { value: false };
        p_values[IDS.SEARCH_RESULTS] = { value: null };
        p_values[IDS.SEARCH_TERMS] = { value: `` };
        p_values[IDS.SEARCH_CASE_SENSITIVE] = { value: false };
        p_values[IDS.SEARCH_EXACT_MATCH] = { value: false };

    }

    get ready() { return this._ready; }
    get running() { return this._running; }
    get enabled() { return this.Get(IDS.SEARCH_ENABLED); }

    CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent = false) {

        super.CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent);

        if (!this.enabled) { return; }

        let descriptor = nkm.data.GetDescriptor(p_id);

        if (!descriptor ||
            !this._dataPool)
            return;

        if (!descriptor.recompute)
            return;

        this._SetDataPool(this._dataPool);

    }

    _SetDataPool(p_dataPool) {

        this._dataPool = p_dataPool;

        this._running = true;
        this._ready = false;
        this._searchCovered = 0;

        this._caseSensitive = this.Get(IDS.SEARCH_CASE_SENSITIVE);
        this._exactMatch = this.Get(IDS.SEARCH_EXACT_MATCH);

        this._terms = this._exactMatch ? this.Get(IDS.SEARCH_TERMS).trim() : this.Get(IDS.SEARCH_TERMS).split(` `);

        if (!this._caseSensitive) {
            for (let i = 0; i < this._terms.length; i++) {
                let t = this._terms[i].trim();
                if (t == ``) { this._terms.splice(i, 1); i--; }
                this._terms[i] = t;
            }
        }

        this._results.length = 0;
        this._resultSet.clear();

        this._AdvanceSearch();

        this.Broadcast(SIGNAL.SEARCH_STARTED, this);

    }

    _AdvanceSearch() {

        let length = 5000;

        if (this._searchCovered + length > this._dataPool.length) {
            length = this._dataPool.length - this._searchCovered;
        }

        if (length <= 0) {

            this._running = false;
            this._ready = true;

            this._values[IDS.SEARCH_RESULTS].value = null;
            this.Set(IDS.SEARCH_RESULTS, this._results);

            this.Broadcast(SIGNAL.SEARCH_COMPLETE, this);

        } else {

            for (let i = this._searchCovered, n = this._searchCovered + length; i < n; i++) {
                let item = this._dataPool[i];
                if (this._resultSet.has(item)) { continue; }
                this._Check(item);
            }

            this._searchCovered += length;

            this.Broadcast(SIGNAL.SEARCH_PROGRESS, this._searchCovered / this._dataPool.length);

            this._delayedAdvance.Schedule();

        }
    }

    _Check(p_item) {

        let pass = false;

        if (this._terms.length != 0) {

            let list = this.constructor.__identifiers;
            if (!pass && list.length) {

                identifierLoop: for (let i = 0, n = list.length; i < n; i++) {

                    let identifierValue = p_item[list[i]];
                    if (!identifierValue || nkm.u.isString(identifierValue)) { continue; }

                    if (this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

                    if (this._CheckTerms(identifierValue)) {
                        pass = true;
                        break identifierLoop;
                    }

                }
            }

            list = this.constructor.__fetchFns
            if (!pass && list.length) {

                list = this.constructor.__fetchFns;

                fetchLoop: for (let i = 0, n = list.length; i < n; i++) {

                    let identifierValue = list[i](p_item);
                    if (!identifierValue || nkm.u.isString(identifierValue)) { continue; }

                    if (this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

                    if (this._CheckTerms(identifierValue)) {
                        pass = true;
                        break fetchLoop;
                    }

                }

            }

            if (!pass && this._checkFn) { pass = nkm.u.Call(this._checkFn, p_item); }

            if (!pass) { return; }

            if (pass && !this._resultSet.has(p_item)) {
                this._results.push(p_item);
                this._resultSet.add(p_item);
            }

        }

    }

    _CheckTerms(p_value) {

        if (this._exactMatch) {
            if (iValue == this._terms[0]) { return true; }
        } else {
            for (let t = 0, n = this._terms.length; i < n; i++) {
                if (iValue.includes(this._terms[i])) { return true; }
            }
        }

        return false;

    }

}

module.exports = SearchSettings;