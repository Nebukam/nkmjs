/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

const CONTEXT = require(`../context`);

/**
 * An inspector provide micro controls for a given piece of data.
 * An inspector 'context' should be the main data wrapper of the editor it's in,
 * while its actual data is the data to be inspected.
 * 
 * The InspectorShell looks for the most suitable inspector and displays it.
 */
class InspectorShell extends ui.views.View {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/inspector-shell.css`]
    }, ui.views.View, ['css']);

    _Init() {

        super._Init();

        this._context = null;
        this._inspector = null;

        this._flags.Add(this, ui.FLAGS.FIXED_SIZE);
        this._flags.Set(ui.FLAGS.FIXED_SIZE, true);

        this._icon = null;
        this._title = null;
        this._subtitle = null;
        this._header = null;
        this._body = null;

    }

    /**
     * Context data when inspector is given a selection to work with.
     * The context is always the data bound to the editor in which the inspector is displayed, if any.
     */
    get context() { return this._context; }
    set context(p_value) {
        if (this._context === p_value) { return; }
        let oldValue = this._context;
        this._context = p_value;
        this._OnContextDataChanged(oldValue);
    }

    _OnContextDataChanged(p_oldValue) {
        if (this._inspector) { this._inspector.context = this._context; }
    }

    // ----> DOM

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(ui.FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) { this._flags.Set(ui.FLAGS.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) { this._subtitle.Set(p_value); }

    get header() { return this._header; }
    get body() { return this._body; }

    _Style() {
        return style.Extends({
            ':host': {
                'display': `flex`,
                'flex-flow': `column nowrap`,
                'justify-content': `flex-start`,
                'align-items': `stretch`,
                'align-content': `stretch`, // Stretches view
            },
            ':host(.fixed-size)': {
                'width': `350px`
            },
            '.header': {
                'flex': '0 0 auto',
            },
            '.body': {
                'flex': '1 1 auto',
                'min-width': '0',

                'display': `flex`,
                'flex-flow': `column nowrap`,
                'justify-content': `flex-start`,
                'align-items': `stretch`,

            },
            '.inspector': {
                'flex': '1 1 auto',
            }
        }, super._Style());
    }

    _Render() {
        ui.Render(uilib.dom.BodyHeaderTitles, this, {
            [ui.IDS.OWNER]: this,
            [ui.IDS.ICON]: { [ui.IDS.CSS_CL]: ui.FLAGS.SIZE_S },
            [ui.IDS.SUBTITLE]: { [ui.IDS.CSS_CL]: style.FONT_FLAG.SMALL }
        });
    }

    //

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);

        if (this._inspector) {
            // Get rid of the current inspector
            this._inspector.Release();
            this._inspector = null;
        }

        if (!this._data) {
            // TODO : Fall back to context ?
            this._title.Set(`(NO_DATA)`);
            this._subtitle.Set(`---`);
            return;
        }

        this._title.Set(this._data.id);

        let ctr = this._data.constructor,
            nfos = com.NFOS.Get(this._data);

        if (nfos) {
            this._subtitle.Set(nfos);
            this._icon.Set(nfos);
        } else {
            this._subtitle.Set(ctr.name);
            this._icon.Set(null); //TODO : Swap for a '?' icon
        }

        let cl = com.BINDINGS.Get(CONTEXT.DEFAULT_INSPECTOR, ctr);

        if (!cl) { return; }

        this._inspector = this.Add(cl, `inspector`, this._body);
        this._inspector.context = this._context;
        this._inspector.data = this._data;

    }

}

module.exports = InspectorShell;
ui.Register('nkmjs-inspector-shell', InspectorShell);