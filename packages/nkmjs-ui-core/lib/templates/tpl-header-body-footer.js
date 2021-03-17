'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);

const __header = IDS.HEADER;
const __body = IDS.BODY;
const __footer = IDS.FOOTER;

class TPLHeaderBodyFooter extends DOMTemplate {
    constructor() { super(); }


    /*

    get header(){ return this._header; }
    get body(){ return this._body; }
    get footer(){ return this._footer; }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: IDS.HEADER }), { [IDS.UID]:__header });
        this._Add(u.dom.New(`div`, { class: IDS.BODY }), { [IDS.UID]:__body });
        this._Add(u.dom.New(`div`, { class: IDS.FOOTER }), { [IDS.UID]:__footer });
    }

}

module.exports = TPLHeaderBodyFooter;