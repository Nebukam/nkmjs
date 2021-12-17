'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const __icon =ui.IDS.ICON;
const __title =ui.IDS.TITLE;
const __subtitle =ui.IDS.SUBTITLE;
const __header =ui.IDS.HEADER;
const __body =ui.IDS.BODY;
const __titles = `titles`;

class TPLBodyHeaderTitles extends ui.DOMTemplate {
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

    get header(){ return this._header; }
    get body(){ return this._body; }


    */

    static _CreateTemplate() {
        this._Add(ui.dom.El(`div`, { class:ui.IDS.HEADER }), { [ui.IDS.UID]: __header });
        this._Add(ui.dom.El(`div`, { class:ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon, parent: __header,
            fn: this.AsIcon
        });
        this._Add(ui.dom.El(`span`, { class: `titles` }), { [ui.IDS.UID]: __titles, parent: __header });
        this._Add(ui.dom.El(`span`, { class:ui.IDS.TITLE }), {
            [ui.IDS.UID]: __title, parent: __titles,
            fn: this.AsText
        });
        this._Add(ui.dom.El(`span`, { class:ui.IDS.SUBTITLE }), {
            [ui.IDS.UID]: __subtitle, parent: __titles,
            fn: this.AsText
        });
        this._Add(ui.dom.El(`div`, { class:ui.IDS.BODY }), { [ui.IDS.UID]: __body });
    }

}

module.exports = TPLBodyHeaderTitles;