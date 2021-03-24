'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const __expandIcon = `expandIcon`;
const __icon = ui.IDS.ICON;
const __label = ui.IDS.LABEL;

class TPLFacadeExpandLabel extends ui.DOMTemplate {
    constructor() {
        super();
    }

    /*

    get expandIcon() { return this._expand_icon; }
    set expandIcon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._expand_icon.Set(p_value)); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._title.Set(p_value)); }

    */

    static _CreateTemplate() {
        this._Add(u.dom.El(`div`, { class: `${ui.IDS.ICON} expand` }), {
            [ui.IDS.UID]: __expandIcon,
            fn: (node, opts, customOpts) =>{
                let icon = this.AsIconStatic(node, opts, customOpts);
                icon.Set(`expand`);
                return icon;
            }
        });
        this._Add(u.dom.El(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: __label,
            fn: this.AsTextStatic
        });
    }

}

module.exports = TPLFacadeExpandLabel;