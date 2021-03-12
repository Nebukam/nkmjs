'use strict';

const u = require("@nkmjs/utils");

const UI_ID = require(`../ui-id`);
const DOMTemplate = require(`../dom-template`);

const __header = `_${UI_ID.HEADER}`;
const __body = `_${UI_ID.BODY}`;
const __footer = `_${UI_ID.FOOTER}`;

class TPLHeaderBodyFooter extends DOMTemplate {
    constructor() { super(); }


    /*

    get header(){ return this._header; }
    get body(){ return this._body; }
    get footer(){ return this._footer; }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: UI_ID.HEADER }), __header);
        this._Add(u.dom.New(`div`, { class: UI_ID.BODY }), __body);
        this._Add(u.dom.New(`div`, { class: UI_ID.FOOTER }), __footer);
    }

}

module.exports = TPLHeaderBodyFooter;