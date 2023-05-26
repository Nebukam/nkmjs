'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const uidatacontrols = require(`@nkmjs/ui-data-controls`);

const InspectorShellEx = require(`./inspector-shell-ex`);
const EditorHistoryView = require(`./editor-history-view`);

const EditorShelf = require(`./editor-shelf`);

const base = uidatacontrols.Editor;

class EditorEx extends base {
    constructor() { super(); }

    static __default_shelfClass = EditorShelf;
    static __default_inspectorShellClass = InspectorShellEx;
    static __default_historyViewClass = EditorHistoryView;
    static __default_viewportClass = ui.views.View;

    static __default_headerClass = null;
    static __default_footerClass = null;

    static __default_classicShortcuts = true;

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

        this._pointer
            .Hook(ui.POINTER.KEYS.MOUSE_NEXT, ui.POINTER.KEYS.RELEASE, this._Bind(this.NextState))
            .Hook(ui.POINTER.KEYS.MOUSE_PREV, ui.POINTER.KEYS.RELEASE, this._Bind(this.PreviousState))
            .SetTriggerMask(ui.POINTER.KEYS.MOUSE_NEXT, true)
            .SetTriggerMask(ui.POINTER.KEYS.MOUSE_PREV, true);

        this.focusArea = this;

        if (this.constructor.__default_classicShortcuts) {

            this.shortcuts.Create("Ctrl Z", this._actionStack.Undo);
            this.shortcuts.Create("Ctrl Y", this._actionStack.Redo);

            this.shortcuts.Create("escape", () => {
                this._registerEmptySelection = true;
                this._inspectedData.Clear();
                this._registerEmptySelection = false;
            });

            this.shortcuts.Create("Ctrl A", {
                fn: () => {
                    this._viewport._selStack.data.RequestSelectAll();
                    console.log(this._viewport._selStack);
                    ui.dom.ClearHighlightedText();
                }
            }).Strict();

        }

    }

    _InitShelfCatalog(p_configList) {

        p_configList.push(
            {
                [ui.IDS.NAME]: `Inspector`,
                [ui.IDS.ICON]: `icon`,
                [ui.IDS.VIEW_CLASS]: this.constructor.__default_inspectorShellClass,
                assign: `_inspectorShell`,
            }
        );

    }

    _RegisterEditorBits() {

        let confs = [];

        this._InitShelfCatalog(confs);
        this._shelf.catalog = this._shelfCatalog;

        for (let i = 0, n = confs.length; i < n; i++) {

            let
                conf = confs[i],
                item = this._shelfCatalog.Register(conf),
                view = item.GetOption('view', null),
                assign = conf?.assign || null;

            //console.log(`${assign} >> ${view}`);

            if (view) {

                if (!conf.forwardData) { }
                else { this.forwardData.To(view); }

                this._forwardContext.To(view);
                this._forwardEditor.To(view);

                if (assign) { this[assign] = view; }

            }

        }

        this._forwardData
            .To(this._header)
            .To(this._viewport)
            .To(this._footer);

        this._forwardContext
            .To(this._header)
            .To(this._viewport)
            .To(this._footer)
            .To(this._inspectorShell);

        this._forwardEditor
            .To(this._header)
            .To(this._viewport)
            .To(this._footer)
            .To(this._inspectorShell);

        this._inspectorShell.RequestDisplay();

    }

    // TODO : An editor offer streamlined way to 'edit' a datablock and
    // store/retrieve metadata into it that are unrelated to actual
    // data but instead are only related to editor values (i.e node placement in a graph, etc)

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.pos.rel,
                ...style.flex.stretch,
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
                ...style.flexItem.fixed,
            },
            '.body': {
                ...style.rules.pos.rel,
                ...style.flex.stretch,
                ...style.flexItem.fill,
            },
            '.viewport': {
                ...style.rules.pos.rel,
                ...style.rules.display.flex,
                ...style.flexItem.fill,
            },
            '.shelf': {

            },
            '.topstatus': {
                ...style.rules.pos.abs,
                width: `100%`
            }
        }, base._Style());
    }

    get viewport() { return this._viewport; }

    _Render() {

        if (this.constructor.__default_headerClass) { this._header = this.Attach(this.constructor.__default_headerClass, ui.IDS.HEADER, this._host); }
        else { this._header = ui.dom.El(`div`, { class: ui.IDS.HEADER }, this._host); }

        this._body = ui.dom.El(`div`, { class: ui.IDS.BODY }, this._host);

        if (this.constructor.__default_footerClass) { this._footer = this.Attach(this.constructor.__default_footerClass, ui.IDS.FOOTER, this._host); }
        else { this._footer = ui.dom.El(`div`, { class: ui.IDS.FOOTER }, this._host); }

        //ui.Render(uilib.dom.HeaderBodyFooter, this, { [ui.IDS.OWNER]: this });

        this._viewport = this.Attach(this.constructor.__default_viewportClass, `viewport`, this._body);
        this._shelf = this.Attach(this.constructor.__default_shelfClass, `shelf`, this._body);

        this._shelf.orientation = ui.FLAGS.HORIZONTAL;
        this._shelf.navPlacement = ui.FLAGS.TOP;

    }

    // ----> Data management

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

    _OnInspectableItemBumped(p_selection, p_data) {
        this._inspectorShell.RequestDisplay();
    }

}

module.exports = EditorEx;
ui.Register('nkmjs-editor-ex', EditorEx);