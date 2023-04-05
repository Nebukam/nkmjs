'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`../signal`);
const IDS = require(`../ids`);
const SIMPLEX = require(`../simplex`);

const SimpleData = require(`../data/simple-data-block`);
const DataList = require(`../helpers/data-list`);
const DataListProxy = require("../helpers/data-list-proxy");

class DataListSearch extends SimpleData {

    constructor() { super(); }

    static __VALUES = {
        [IDS.SEARCH_RESULTS]: { value: null },
        [IDS.SEARCH_ENABLED]: { value: false, signal: SIGNAL.SEARCH_TOGGLED },
    };

    _Init() {

        super._Init();

        this._searchCovered = 0;
        this._cachedAdvance = 0;

        this._Bind(this._InternalSort);

        this._sourceList = null;
        this._rangeInfos = null;
        this._ready = false;
        this._running = false;

        this._results = new DataList();
        this._resultSet = new Set();

        this._delayedAdvance = com.DelayedCall(this._Bind(this._AdvanceSearch));

        this._advanceOps = 5000;

        this._searchHeader = null;

        //TODO: Support multiple headers!

        this._headerObserver = new com.signals.Observer();
        this._headerObserver
            .Hook(SIGNAL.SEARCH_PARAMS_UPDATED, this._OnHeaderSearchParamsUpdated, this)
            .Hook(SIGNAL.SEARCH_TOGGLED, this._OnHeaderToggled, this)
            .Hook(com.SIGNAL.UPDATED, this._OnHeaderUpdated, this);

        this._sourceObserver = new com.signals.Observer();
        this._sourceObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnSourceItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnSourceItemRemoved, this)
            .Hook(com.SIGNAL.SORTED, this._OnSourceSorted, this);

        this._identifiers = [];
        this._fetchFns = [];



    }

    get identifiers() { return this._identifiers; }
    get fetchFns() { return this._fetchFns; }

    get advanceOps() { return this._advanceOps; }
    set advanceOps(p_value) { this._advanceOps = p_value; }

    get searchHeader() { return this._searchHeader; }
    set searchHeader(p_value) {

        if (this._searchHeader == p_value) { return; }

        let oldHeader = this._searchHeader;
        this._searchHeader = p_value;
        this._headerObserver.ObserveOnly(p_value);

        if (p_value) { this._OnHeaderToggled(); }
        else { this.Set(IDS.SEARCH_ENABLED, false); }

        this.Broadcast(SIGNAL.SEARCH_HEADER_CHANGED, this, this._searchHeader, oldHeader);

    }

    AddIdentifiers(...identifiers) {
        identifiers.forEach((i) => {
            if (!this._identifiers.includes(i)) { this._identifiers.push(i); }
        })
    }

    RemoveIdentifiers(...identifiers) {
        identifiers.forEach((i) => {
            let index = this._identifiers.indexOf(i);
            if (index >= 0) { this._identifiers.splice(index, 1); }
        })
    }

    AddFetchFn(...fetchers) {
        fetchers.forEach((i) => {
            if (!this._fetchFns.includes(i)) { this._fetchFns.push(i); }
        })
    }

    RemoveFetchFn(...fetchers) {
        fetchers.forEach((i) => {
            let index = this._fetchFns.indexOf(i);
            if (index >= 0) { this._fetchFns.splice(index, 1); }
        })
    }

    get ready() { return this._ready; }
    get running() { return this._running; }
    get enabled() { return this.Get(IDS.SEARCH_ENABLED); }

    get sourceList() { return this._sourceList; }
    set sourceList(p_value) { this.SetSource(p_value); }

    get results() { return this._results; }



    _OnHeaderUpdated() {
        this.Broadcast(SIGNAL.SEARCH_HEADER_UPDATED, this, this._searchHeader);
    }

    _OnHeaderToggled() {
        let toggle = this._searchHeader.Get(IDS.SEARCH_ENABLED);
        this.Set(IDS.SEARCH_ENABLED, toggle);
        if (toggle) { this._OnHeaderSearchParamsUpdated(); }
    }

    _OnHeaderSearchParamsUpdated() {
        this.SetSource(this._sourceList);
    }

    SetSource(p_sourceList) {

        this._results.Clear(true);
        this._resultSet.clear();

        this._ready = false;
        this._searchCovered = 0;

        this._sourceList = p_sourceList;
        if (p_sourceList) { this._results._parent = this._sourceList.parent; }
        else { this._results._parent = null; }

        if (!p_sourceList || !this._searchHeader || !this.enabled) {

            if (this._running) {
                this._delayedAdvance.Cancel();
                this._running = false;
            }

            this.Set(IDS.SEARCH_ENABLED, false);
            this._sourceObserver.Flush();

            return;

        } else {
            this._running = true;
            this._sourceObserver.ObserveOnly(this._sourceList);
        }

        this._AdvanceSearch();
        this.Broadcast(SIGNAL.SEARCH_STARTED, this);

    }

    _OnSourceItemAdded(p_source, p_item) {
        this._InternalCheck(p_item);
    }

    _OnSourceItemRemoved(p_source, p_item) {
        this._results.Remove(p_item);
    }

    _OnSourceSorted(p_source, p_sortingMethod) {
        this._lastSourceSortMethod = p_sortingMethod;
        this._results.Sort(this._InternalSort);
        this._lastSourceSortMethod = null;
    }

    AutoSort(p_sorting = null) {
        this._autoSortingFn = p_sorting;
        this._results.AutoSort(p_sorting ? this._InternalSort : null);
    }

    RefreshSorting() {
        this._results.Sort(this._InternalSort);
    }

    _InternalSort(a, b) {

        let sorting = 0;

        if (this._lastSourceSortMethod) { sorting = this._lastSourceSortMethod(a, b); }
        else if (this._sourceList.autosort && this._sourceList._autoSortingFn) { sorting = this._sourceList._autoSortingFn(a, b); }

        if (this._autoSortingFn) { sorting += this._autoSortingFn(a, b); }
        return sorting;

    }


    _AdvanceSearch() {

        let length = this._advanceOps;

        if (this._searchCovered + length > this._sourceList.count) {
            length = this._sourceList.count - this._searchCovered;
        }

        if (length <= 0) {

            this._running = false;
            this._ready = true;

            // Force update
            this._values[IDS.SEARCH_RESULTS] = null;
            this.Set(IDS.SEARCH_RESULTS, this._results);

            this._results.CommitUpdate();
            this._results.ClearDirty();

            this.Broadcast(SIGNAL.SEARCH_COMPLETE, this);

        } else {

            for (let i = this._searchCovered, n = this._searchCovered + length; i < n; i++) {
                this._InternalCheck(this._sourceList.At(i));
            }

            this._searchCovered += length;

            this.Broadcast(SIGNAL.SEARCH_PROGRESS, this._searchCovered / this._sourceList.count);

            this._delayedAdvance.Schedule();

        }
    }

    _InternalCheck(p_iten) {
        if (this._resultSet.has(p_iten)) { return; }
        if (this._searchHeader._Check(p_iten, this)) {
            this._resultSet.add(p_iten);
            this._results.Add(p_iten);
        }
    }

    _CleanUp() {
        this.AutoSort(null);
        this.searchHeader = null;
        this.sourceList = null;
        super._CleanUp();
    }

}

module.exports = DataListSearch;