'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const uidatacontrols = require(`@nkmjs/ui-data-controls`);

const InspectorShell = require(`../inspectors/inspector-shell`);
const HistoryInspectorShell = require(`../inspectors/history-inspector-shell`);

const EditorShelf = require(`./editor-shelf`);

class EditorEx extends uidatacontrols.Editor {
    constructor() { super(); }

    static __default_shelfClass = EditorShelf;
    static __default_inspectorShellClass = InspectorShell;
    static __default_historyInspectorClass = HistoryInspectorShell;
    static __default_viewportClass = ui.views.View;

    _Init() {

        super._Init();

        this._shelfCatalog = new data.catalogs.Catalog(false);

        this._shelf = null;
        this._inspectorShell = null;
        this._historyInspector = null;
        this._viewport = null;

        this._header = null;
        this._body = null;
        this._footer = null;

        this._topStatus = null;
        this._bottomStatus = null;

    }

    _PostInit() {

        super._PostInit();
        let confs = [];
        this._InitShelfCatalog(confs);
        this._shelf.catalog = this._shelfCatalog;

        let conf = null;
        let item = null;
        let view = null;
        let assign = null;

        for (let i = 0, n = confs.length; i < n; i++) {

            conf = confs[i];
            item = this._shelfCatalog.Register(conf);

            view = item.GetOption('view', null);
            assign = u.tils.Get(conf, `assign`, null);

            //console.log(`${assign} >> ${view}`);

            if (view && assign) {
                this[assign] = view;
            }

        }

    }

    _InitShelfCatalog(p_configList) {
        p_configList.push(
            {
                [ui.IDS.NAME]: `Inspector`,
                [ui.IDS.ICON]: `parameters`,
                [ui.IDS.VIEW_CLASS]: this.constructor.__default_inspectorShellClass,
                assign: `_inspector`
            }
        );
    }

    // TODO : An editor offer streamlined way to 'edit' a datablock and
    // store/retrieve metadata into it that are unrelated to actual
    // data but instead are only related to editor values (i.e node placement in a graph, etc)

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-items': `stretch`,
                'align-content': `stretch`,
                'min-width': 0,
            },
            ':host(.vertical)': {
                'flex-flow': `row`,
            },
            ':host(.horizontal)': {
                'flex-flow': `column`,
            },

            ':host(.vertical).fs': {
                //height:`100%`
            },
            ':host(.horizontal).fs': {
                //width:`100%`
            },

            '.fs': {
                flex: `0 0 auto`
            },
            '.body': {
                position: `relative`,
                display: `flex`,
                'align-items': `stretch`,
                'align-content': `stretch`,

                flex: `1 1 auto`
            },
            '.viewport': {
                position: `relative`,
                display: `flex`,
                flex: `1 1 auto`,
            },
            '.shelf': {
                position: `relative`,
                display: `flex`,
                flex: `0 0 auto`,
            },
            '.topstatus': {
                position: `absolute`,
                width: `100%`
            }
        }, super._Style());
    }

    _Render() {

        ui.Render(uilib.dom.HeaderBodyFooter, this, { [ui.IDS.OWNER]: this });

        this._shelf = this.Add(this.constructor.__default_shelfClass, `shelf`, this._body);
        this._viewport = this.Add(this.constructor.__default_viewportClass, `viewport`, this._body);

        this._inspectorShell = this.Add(this.constructor.__default_inspectorShellClass, `inspector`, this._body);
        this._inspectorShell.orientation = ui.FLAGS.HORIZONTAL;

        this._shelf.orientation = ui.FLAGS.HORIZONTAL;

    }

    // ----> Data management

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        this._inspectorShell.data = this._data;
        this._inspectorShell.context = this._data;
    }

    _OnDataDirty(p_data) {
        super._OnDataDirty(p_data);
        this._ToggleWarning(true);
    }

    _OnDataCleaned(p_data) {
        super._OnDataCleaned(p_data);
        this._ToggleWarning(false);
    }

    _ToggleWarning(p_toggle) {
        //TODO : Re-implement warning states / unsaved modification in editor
        return;
        let bar = this._topStatus;
        if (p_toggle) {
            this._flags.Set(com.FLAGS.WARNING, true);
            bar.flag = com.FLAGS.WARNING;
            bar.text = `There are unsaved modifications.`;
            bar.htitle = `Unsaved modifications are only affect the ecosystem once applied.`;
            bar.visible = true;
        } else {
            this._flags.Set(com.FLAGS.WARNING, false);
            bar.visible = false;
        }
    }

    // ---->

    Inspect(p_data) {
        super.Inspect(p_data);
        this._inspectorShell.RequestDisplay();
    }

    _OnInspectedDataChanged(p_oldData) {
        super._OnInspectedDataChanged(p_oldData);

        if (this._inspectedData) {
            this._inspectorShell.data = this._inspectedData;
        }
        else {
            this._inspectorShell.data = this._data;
        }
    }

}

module.exports = EditorEx;
ui.Register('nkmjs-editor-ex', EditorEx);