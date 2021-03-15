'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);
const manipulators = require(`../manipulators`);

const __icon = `_${IDS.ICON}`;
const __label = `_${IDS.LABEL}`;

class TPLFacadeLabel extends DOMTemplate {
    constructor() {
        super();;
    }

    /*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: IDS.ICON }), __icon);
        this._Add(u.dom.New(`span`, { class: IDS.LABEL }), __label);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            iconOpts = u.tils.Get(p_options, IDS.ICON, null),
            labelOpts = u.tils.Get(p_options, IDS.LABEL, null),
            icon = owner[__icon] = new manipulators.Icon(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new manipulators.Text(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false);

        if (iconOpts) { 
            icon.Set(iconOpts); 
            if(iconOpts[IDS.CSS_CL]){ icon.element.classList.add(iconOpts[IDS.CSS_CL]); }
        }
        if (labelOpts) { 
            label.Set(labelOpts); 
            if(labelOpts[IDS.CSS_CL]){ label.element.classList.add(labelOpts[IDS.CSS_CL]); }
        }

        return owner;
    }

}

module.exports = TPLFacadeLabel;