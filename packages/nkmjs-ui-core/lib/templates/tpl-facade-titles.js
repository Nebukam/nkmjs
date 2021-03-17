'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);
const manipulators = require(`../manipulators`);

const __icon = IDS.ICON;
const __title = IDS.TITLE;
const __subtitle = IDS.SUBTITLE;

class TPLFacadeTitles extends DOMTemplate {
    constructor() {
        super();
    }

    /*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) {  this._subtitle.Set(p_value); }


    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.El(`div`, { class: IDS.ICON }), {
            [IDS.UID]: __icon,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: IDS.TITLE }), {
            [IDS.UID]: __title,
            fn: this.AsText
        });
        this._Add(u.dom.El(`span`, { class: IDS.SUBTITLE }), {
            [IDS.UID]: __subtitle,
            fn: this.AsText
        });
    }

}

module.exports = TPLFacadeTitles;