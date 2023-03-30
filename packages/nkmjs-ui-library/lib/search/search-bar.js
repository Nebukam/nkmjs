'use strict';

const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const u = require(`@nkmjs/utils`);
const ui = require(`@nkmjs/ui-core`);

const ProgressBar = require(`../bars/progress-bar`);

const base = datacontrols.ControlView;
class SearchBar extends base {
    constructor() { super(); }

    static __controls = [
        { options: { propertyId: data.IDS.SEARCH_ENABLED, invertInputOrder: true }, css: `main-toggle` },
        { options: { propertyId: data.IDS.SEARCH_TERMS, inputOnly: true }, css: `search` },
    ];

    _Init() {
        super._Init();

        this._flags.Add(this, `enabled`);

        this._dataObserver
            .Hook(data.SIGNAL.SEARCH_COMPLETE, this._OnSearchComplete, this)
            .Hook(data.SIGNAL.SEARCH_TOGGLED, this._OnSearchToggle, this)
            .Hook(data.SIGNAL.SEARCH_PROGRESS, this._OnSearchProgress, this);

        this._builder.defaultControlClass = datacontrols.widgets.ValueControl;
        this._builder.defaultCSS = `control`;

    }

    static _Style() {
        return style.Extends({
            ':host': {
                'position': 'relative',
                '@': ['fade-in'],
                'display': 'flex',
                'flex-flow': 'row wrap',
                //'min-height': '0',
                //'overflow': 'auto',
                //'padding': '10px',
                'align-content': 'flex-start',
                'background-color': 'rgba(46,46,46,0.5)',
                'padding': '10px 20px 5px 20px',
                'min-height': '28px',
                //'border-radius':'5px',
                //'margin':'0 10px'
            },
            '.control': {
                'flex': '0 0 auto',
                'margin-right': '10px',
                //'margin-bottom': '0'',
            },
            '.main-toggle': { 'flex': '0 0 115px' },
            '.search': { 'flex': '1 1 auto' },
            '.large': { 'margin-right': '10px' },

            ':host(.enabled)': { 'background-color': 'rgba(var(--col-active-dark-rgb),0.5)', },
            ':host(:not(.enabled)) .control:not(.main-toggle)': { opacity: 0.5, 'pointer-events': 'none' },
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
        this._progressBar.style.setProperty(`--size-custom`, `2px`);
        this._progressBar.options = {
            hideWhenComplete: true,
            size: ui.FLAGS.SIZE_CUSTOM,
            flavor: com.FLAGS.ACTIVE
        }
    }

    get activeSearch() { return this._data ? this._data.Get(data.IDS.SEARCH_ENABLED) : false; }

    set status(p_value) {
        this._status = p_value;
        this._status.visible = false;
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        this._flags.Set(`enabled`, p_data.Get(data.IDS.SEARCH_ENABLED));
    }

    _OnSearchProgress(p_progress) {
        this._status.visible = this.activeSearch;
        this._status.Progress(p_progress, this._data._results.length);
        this._progressBar.progress = p_progress;
    }

    _OnSearchComplete() {
        if (this._data._results.length == 0) {
            this._status.NoResults();
            this._status.visible = this.activeSearch;
        } else {
            this._status.visible = false;
        }
    }

    _OnSearchToggle() {
        if (this.activeSearch) {
            if (this._data.running) { this._status.visible = false; }
            else { this._OnSearchComplete(); }
        } else {
            this._status.visible = false;
        }
    }


}

module.exports = SearchBar;
ui.Register(`nkm-search-bar`, SearchBar);