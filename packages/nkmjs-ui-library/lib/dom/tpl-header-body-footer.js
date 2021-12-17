'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const __header = ui.IDS.HEADER;
const __body = ui.IDS.BODY;
const __footer = ui.IDS.FOOTER;

class TPLHeaderBodyFooter extends ui.DOMTemplate {
    constructor() { super(); }


    /*

    get header(){ return this._header; }
    get body(){ return this._body; }
    get footer(){ return this._footer; }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(ui.dom.El(`div`, { class: ui.IDS.HEADER }), { [ui.IDS.UID]:__header });
        this._Add(ui.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]:__body });
        this._Add(ui.dom.El(`div`, { class: ui.IDS.FOOTER }), { [ui.IDS.UID]:__footer });
    }

}

module.exports = TPLHeaderBodyFooter;