'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);

const manipulators = require(`../manipulators`);

const __expandIcon = `expandIcon`;
const __icon = IDS.ICON;
const __title = IDS.TITLE;

class TPLFacadeExpandTitle extends DOMTemplate {
    constructor() {
        super();;
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
        this._Add(u.dom.El(`div`, { class: `${IDS.ICON} expand` }), {
            [IDS.UID]: __expandIcon,
            fn: this.AsIconStatic // Need to add 'node.htitle = xxx'
        });
        this._Add(u.dom.El(`div`, { class: IDS.ICON }), {
            [IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: IDS.TITLE }), {
            [IDS.UID]: __title,
            fn: this.AsText
        });
    }

}

module.exports = TPLFacadeExpandTitle;