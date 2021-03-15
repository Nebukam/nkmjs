'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);

const __header = `_${IDS.HEADER}`;
const __body = `_${IDS.BODY}`;
const __footer = `_${IDS.FOOTER}`;

class TPLHeaderBodyFooter extends DOMTemplate {
    constructor() { super(); }


    /*

    get header(){ return this._header; }
    get body(){ return this._body; }
    get footer(){ return this._footer; }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: IDS.HEADER }), __header);
        this._Add(u.dom.New(`div`, { class: IDS.BODY }), __body);
        this._Add(u.dom.New(`div`, { class: IDS.FOOTER }), __footer);
    }

}

module.exports = TPLHeaderBodyFooter;