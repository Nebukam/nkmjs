'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);
const manipulators = require(`../manipulators`);

const __icon = IDS.ICON;
const __label = IDS.LABEL;

class TPLFacadeLabel extends DOMTemplate {
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
        this._Add(u.dom.New(`div`, { class: IDS.ICON }), {
            [IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.New(`span`, { class: IDS.LABEL }), {
            [IDS.UID]: __label,
            fn: this.AsText
        });
    }

}

module.exports = TPLFacadeLabel;