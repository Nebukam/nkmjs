'use strict';

const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const StreamingDataListView = require(`./streaming-data-list-view`);
const base = StreamingDataListView;

class StreamingDataListSearchableView extends base {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._searchHeader = null;

        this._searchDataList = new data.search.DataListSearch();
        this._searchDataList
            .Watch(data.SIGNAL.SEARCH_TOGGLED, this._OnSearchToggled, this)
            .Watch(data.SIGNAL.SEARCH_STARTED, this._OnSearchStarted, this)
            .Watch(data.SIGNAL.SEARCH_COMPLETE, this._OnSearchComplete, this);

        this.forwardData.To(this._searchDataList, { mapping: `sourceList` });

        this._searchActive = false;

    }

    _PostInit() {
        super._PostInit();
    }

    //#region Render

    static _Style() {
        return style.Extends({
            ':host': {
            },
            '.search-status': {
                '@': ['absolute-center']
            }
        }, base._Style());
    }

    _Render() {
        super._Render();

        //TODO: Add BEFORE the footer, if one exists.
        /*
        this._searchStatus = this.Attach(mkfWidgets.SearchStatus, `search-status`);
        this._search = this.Attach(GlyphGroupSearch, `search`);
        this._search.status = this._searchStatus;
        */
    }

    //#endregion

    //#region search

    get searchHeader() { return this._searchHeader; }
    set searchHeader(p_value) {
        if (this._searchHeader == p_value) { return; }
        this._searchHeader = p_value;
        this._searchDataList.searchHeader = p_value;
    }

    _OnSearchToggled() {

        let oldValue = this._searchActive;
        this._searchActive = this._searchDataList.enabled;

        if (oldValue == this._searchActive) { return; }

        if (!this._searchActive) {
            this._SetContentSource(this._data);
        } else {
            if (this._searchDataList.ready) { this._OnSearchComplete(); }
            else { this._OnSearchStarted(); }
        }

    }

    _OnSearchStarted() { this._SetContentSource(null); }
    _OnSearchComplete() { this._SetContentSource(this._searchDataList._results); }

    //#endregion

    _ReloadList() {

        // Called when this control' data has changed

        this._SetContentSource(null);
        this._searchDataList.SetSource(this._data);

        if (!this._searchActive) { this._SetContentSource(this._data); }

    }

    _CleanUp() {
        this.searchHeader = null;
        super._CleanUp();
    }

}

module.exports = StreamingDataListSearchableView;
ui.Register(`mkf-data-list-searchable-view`, StreamingDataListSearchableView);