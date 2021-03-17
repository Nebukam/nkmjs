'use strict';

const u = require("@nkmjs/utils");
const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);
const manipulators = require(`../manipulators`);

const __closeIcon = `closeIcon`;
const __icon = IDS.ICON;
const __title = IDS.TITLE;

class TPLFacadeLabelClose extends DOMTemplate {
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
        this._Add(u.dom.New(`div`, { class: IDS.ICON }), {
            [IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.New(`span`, { class: IDS.TITLE }), {
            [IDS.UID]: __title,
            fn: this.AsTextStatic
        });
        this._Add(u.dom.New(`div`, { class: `${IDS.ICON} close` }), {
            [IDS.UID]: __closeIcon,
            fn: this.AsIconStatic // Need to add 'node.htitle = xxx'
        });
    }

}

module.exports = TPLFacadeLabelClose;