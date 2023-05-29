'use strict';

const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const u = require(`@nkmjs/utils`);
const ui = require(`@nkmjs/ui-core`);

const ProgressBar = require(`../bars/progress-bar`);

const base = datacontrols.ControlView;
class SearchBarInline extends base {
    constructor() { super(); }

    static __controls = [
        { options: { propertyId: data.IDS.SEARCH_ENABLED, inputOnly: true }, css: `main-toggle` },
        { options: { propertyId: data.IDS.SEARCH_TERMS, inputOnly: true }, css: `search` },
    ];

    _Init() {
        super._Init();

        this._flags.Add(this, `enabled`);

        this._dataObserver
            .Hook(data.SIGNAL.SEARCH_COMPLETE, this._OnSearchComplete, this)
            .Hook(data.SIGNAL.SEARCH_TOGGLED, this._OnSearchToggle, this)
            .Hook(data.SIGNAL.SEARCH_PROGRESS, this._OnSearchProgress, this)
            .Hook(data.SIGNAL.SEARCH_HEADER_CHANGED, this._OnSearchHeaderChanged, this)
            .Hook(data.SIGNAL.SEARCH_HEADER_UPDATED, this._OnSearchHeaderUpdated, this);

        this._builder.defaultControlClass = datacontrols.widgets.ValueControl;
        this._builder.defaultCSS = `item`;

        this._forwardData.Update(this._builder, { get: `searchHeader` });

    }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.fadeIn,
                ...style.flex.row,
                //'overflow': 'auto',
                //'padding': '10px',
                'align-content': 'flex-start',
                ...style.flexItem.shrink,
                'background-color': 'rgba(46,46,46,0.5)',
                'padding': '10px 0px 5px 10px',
                'min-height': '28px',
                //'border-radius':'5px',
                //'margin':'0 10px'
            },
            '.item': {
                ...style.flexItem.fixed,
                'margin-right': '10px',
                //'margin-bottom': '0'',
            },
            '.main-toggle': { ...style.flexItem.shrink, },
            '.search': { ...style.flexItem.fill, },
            '.large': { 'margin-right': '10px' },

            ':host(.enabled)': { 'background-color': 'rgba(var(--col-active-low-rgb),0.5)', },
            ':host(:not(.enabled)) .item:not(.main-toggle)': { opacity: 0.5, 'pointer-events': 'none' },
            '.small': {
                'flex': '1 1 45%'
            },
            '.header': {
                'margin': '5px 2px 5px 2px'
            },
            '.progress': {
                'position': 'absolute',
                'bottom': '0',
                'left': '0',
                'width': '100%'
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._progressBar = this.Attach(ProgressBar, `progress`);
        ui.dom.CSS(this._progressBar, '--size-custom', `2px`);
        this._progressBar.options = {
            hideWhenComplete: true,
            size: ui.FLAGS.SIZE_CUSTOM,
            flavor: com.FLAGS.ACTIVE
        }
    }

    get activeSearch() { return this._data ? this._data.searchHeader.Get(data.IDS.SEARCH_ENABLED) : false; }

    set status(p_value) {
        this._status = p_value;
        this._status.visible = false;
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        this._UpdateStatus();
    }

    _OnSearchProgress(p_progress) {
        if (this._status) {
            this._status.visible = this.activeSearch;
            this._status.Progress(p_progress, this._data.length);
        }
        this._progressBar.progress = p_progress;
    }

    _OnSearchComplete() {
        if (this._data._results.length == 0) {
            if (this._status) {
                this._status.NoResults();
                this._status.visible = this.activeSearch;
            }
        } else {
            if (this._status) {
                this._status.visible = false;
            }
        }
    }

    _OnSearchToggle() {
        if (this.activeSearch) {
            if (this._data.running) {
                if (this._status) {
                    this._status.visible = false;
                }
            }
            else { this._OnSearchComplete(); }
        } else {
            if (this._status) {
                this._status.visible = false;
            }
        }
    }

    //

    _UpdateStatus() {
        if (this._data && this._data.searchHeader) {
            this._flags.Set(`enabled`, this._data.searchHeader.Get(data.IDS.SEARCH_ENABLED));
        } else {
            this._flags.Set(`enabled`, false);
        }
    }

    _OnSearchHeaderChanged(p_dataList, p_header, p_oldHeader) {
        this._builder.data = p_header;
        this._UpdateStatus();
    }

    _OnSearchHeaderUpdated(p_dataList, p_header) {
        this._UpdateStatus();
    }


}

module.exports = SearchBarInline;
ui.Register(`nkm-search-bar-inline`, SearchBarInline);