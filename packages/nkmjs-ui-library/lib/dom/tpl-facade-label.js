'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const __icon = ui.IDS.ICON;
const __label = ui.IDS.LABEL;

class TPLFacadeLabel extends ui.DOMTemplate {
    constructor() {
        super();
    }

    /*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.El(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: __label,
            fn: this.AsText
        });
    }

}

module.exports = TPLFacadeLabel;