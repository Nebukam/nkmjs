'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const TPLFacadeExpandLabel = require(`./tpl-facade-expand-label`);

const manipulators = require(`../manipulators`);

const __header = IDS.HEADER;
const __expandIcon = `expandIcon`;
const __icon = IDS.ICON;
const __label = IDS.LABEL;
const __body = IDS.BODY;

class TPLBodyExpand extends TPLFacadeExpandLabel {
    constructor() { super(); }

    static _CreateTemplate() {

        this._Add(u.dom.El(`div`, { class: IDS.HEADER }), { [IDS.UID]: __header });
        this._Add(u.dom.El(`div`, { class: `${IDS.ICON} expand` }), {
            [IDS.UID]: __expandIcon, parent: __header,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`div`, { class: IDS.ICON }), {
            [IDS.UID]: __icon, parent: __header,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: IDS.LABEL }), {
            [IDS.UID]: __label, parent: __header,
            fn: this.AsText
        });
        this._Add(u.dom.El(`div`, { class: IDS.BODY }), { [IDS.UID]: __body });

    }

}

module.exports = TPLBodyExpand;