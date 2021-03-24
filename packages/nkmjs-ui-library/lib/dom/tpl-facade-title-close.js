'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const __closeIcon = `closeIcon`;
const __icon = ui.IDS.ICON;
const __title = ui.IDS.TITLE;

class TPLFacadeLabelClose extends ui.DOMTemplate {
    constructor() {
        super();;
    }

    /*

    get closeIcon() { return this._closeIcon; }
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        this._Add(u.dom.El(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: ui.IDS.TITLE }), {
            [ui.IDS.UID]: __title,
            fn: this.AsTextStatic
        });
        this._Add(u.dom.El(`div`, { class: `${ui.IDS.ICON} close` }), {
            [ui.IDS.UID]: __closeIcon,
            fn: (node, opts, customOpts) =>{
                let icon = this.AsIconStatic(node, opts, customOpts);
                icon.Set(`close`);
                return icon;
            }
        });
    }

}

module.exports = TPLFacadeLabelClose;