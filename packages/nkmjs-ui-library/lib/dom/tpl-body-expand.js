'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const TPLFacadeExpandLabel = require(`./tpl-facade-expand-label`);

const __header = ui.IDS.HEADER;
const __expandIcon = `expandIcon`;
const __icon = ui.IDS.ICON;
const __label = ui.IDS.LABEL;
const __body = ui.IDS.BODY;

class TPLBodyExpand extends TPLFacadeExpandLabel {
    constructor() { super(); }

    static _CreateTemplate() {

        this._Add(u.dom.El(`div`, { class: ui.IDS.HEADER }), { [ui.IDS.UID]: __header });
        this._Add(u.dom.El(`div`, { class: `${ui.IDS.ICON} expand` }), {
            [ui.IDS.UID]: __expandIcon, parent: __header,
            fn: (node, opts, customOpts) =>{
                let icon = this.AsIconStatic(node, opts, customOpts);
                icon.Set(`expand`);
                return icon;
            }
        });
        this._Add(u.dom.El(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: __icon, parent: __header,
            fn: this.AsIcon
        });
        this._Add(u.dom.El(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: __label, parent: __header,
            fn: this.AsTextStatic
        });
        this._Add(u.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]: __body });

    }

}

module.exports = TPLBodyExpand;