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
const uidatacontrols = require(`@nkmjs/ui-data-controls`);


/**
 * An inspector provide micro controls for a given piece of data.
 * An inspector 'context' should be the main data wrapper of the editor it's in,
 * while its actual data is the data to be inspected.
 * 
 * The InspectorShell looks for the most suitable inspector and displays it.
 */
class InspectorShellEx extends uidatacontrols.InspectorShell {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._icon = null;
        this._title = null;
        this._subtitle = null;
        this._header = null;
        this._body = null;

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
                'overflow': 'auto',
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

        this._builder.host = this._body;
        this._wrapper = this._body;

        super._Render();

    }

    //
/*
    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);

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

    }
*/
}

module.exports = InspectorShellEx;
ui.Register('nkmjs-inspector-shell-ex', InspectorShellEx);