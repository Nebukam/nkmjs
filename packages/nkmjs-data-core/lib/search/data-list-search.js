'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`../signal`);
const IDS = require(`../ids`);
const SIMPLEX = require(`../simplex`);

const SimpleData = require(`../data/simple-data-block`);
const DataList = require(`../helpers/data-list`);

class DataListSearch extends SimpleData {

    constructor() { super(); }

    static __VALUES = [
        { id: IDS.SEARCH_RESULTS, value: null },
        { id: IDS.SEARCH_ENABLED, value: false },
    ];

    static __VALUES_SIGNALS = {
        [IDS.SEARCH_ENABLED]: SIGNAL.SEARCH_TOGGLED
    }

    _Init() {

        super._Init();

        this._searchCovered = 0;
        this._cachedAdvance = 0;

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
            .Hook(SIGNAL.SEARCH_TOGGLED, this._OnHeaderToggled, this);

        this._identifiers = [];
        this._fetchFns = [];

    }

    get identifiers() { return this._identifiers; }
    get fetchFns() { return this._fetchFns; }

    get advanceOps() { return this._advanceOps; }
    set advanceOps(p_value) { this._advanceOps = p_value; }

    get searchHeader() { return this._searchHeader; }
    set searchHeader(p_value) {

        this._searchHeader = p_value;
        this._headerObserver.ObserveOnly(p_value);

        if (p_value) { this._OnHeaderToggled(); }
        else { this.Set(IDS.SEARCH_ENABLED, false); }

    }

    _ResetValues(p_values) {
        p_values[IDS.SEARCH_RESULTS] = { value: null };
    }

    get ready() { return this._ready; }
    get running() { return this._running; }
    get enabled() { return this.Get(IDS.SEARCH_ENABLED); }

    get sourceList() { return this._sourceList; }
    get results() { return this._results; }

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

        if (!p_sourceList || !this._searchHeader) {

            if (this._running) {
                this._delayedAdvance.Cancel();
                this._running = false;
            }

            this.Set(IDS.SEARCH_ENABLED, false);

            return;

        } else {
            this._running = true;
        }

        this._AdvanceSearch();
        this.Broadcast(SIGNAL.SEARCH_STARTED, this);

    }

    _AdvanceSearch() {

        let length = this._advanceOps;

        if (this._searchCovered + length > this._sourceList.count) {
            length = this._sourceList.count - this._searchCovered;
        }

        if (length <= 0) {

            this._running = false;
            this._ready = true;

            this._values[IDS.SEARCH_RESULTS].value = null;
            this.Set(IDS.SEARCH_RESULTS, this._results);

            this._results.CommitUpdate();
            this._results.ClearDirty();

            this.Broadcast(SIGNAL.SEARCH_COMPLETE, this);

        } else {

            for (let i = this._searchCovered, n = this._searchCovered + length; i < n; i++) {

                let item = this._sourceList.At(i);

                if (this._resultSet.has(item)) { continue; }
                if (this._Check(item, this)) {
                    this._resultSet.add(item);
                    this._results.Add(item);
                }

            }

            this._searchCovered += length;

            this.Broadcast(SIGNAL.SEARCH_PROGRESS, this._searchCovered / this._sourceList.count);

            this._delayedAdvance.Schedule();

        }
    }

    _CleanUp() {
        this.searchHeader = null;
        this.sourceList = null;
        super._CleanUp();
    }

}

module.exports = DataListSearch;