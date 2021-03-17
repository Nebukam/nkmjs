'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

const __closeIcon = `closeIcon`;
const __icon = ui.IDS.ICON;
const __label = ui.IDS.LABEL;

class TPLFacadeTab extends ui.DOMTemplate {
    constructor() {
        super();
    }

    /*

    get closeIcon() { return this._closeIcon; }
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(ui.FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(ui.FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        this._Add(u.dom.New(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.New(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: __label,
            fn: this.AsTextStatic
        });
        this._Add(u.dom.New(`div`, { class: `${ui.IDS.ICON} close` }), {
            [ui.IDS.UID]: __closeIcon,
            fn: this.AsIconStatic // Need to add 'node.htitle = xxx'
        });
    }

}

module.exports = TPLFacadeTab;