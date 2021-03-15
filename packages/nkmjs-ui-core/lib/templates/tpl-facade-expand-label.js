'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);

const manipulators = require(`../manipulators`);

const __expandIcon = `_expandIcon`;
const __icon = `_${IDS.ICON}`;
const __label = `_${IDS.LABEL}`;

class TPLFacadeExpandLabel extends DOMTemplate {
    constructor() {
        super();
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
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: `${IDS.ICON} expand` }), __expandIcon);
        this._Add(u.dom.New(`div`, { class: IDS.ICON }), __icon);
        this._Add(u.dom.New(`span`, { class: IDS.LABEL }), __label);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            expIconOpts = u.tils.Get(p_options, `expandIcon`, null),
            iconOpts = u.tils.Get(p_options, IDS.ICON, null),
            labelOpts = u.tils.Get(p_options, IDS.TITLE, null),
            expandIcon = owner[__expandIcon] = new manipulators.Icon(owner[__expandIcon], expIconOpts && `autoHide` in expIconOpts ? expIconOpts.autoHide : false),
            icon = owner[__icon] = new manipulators.Icon(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new manipulators.Text(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false);

        if (expIconOpts) {
            expandIcon.Set(expIconOpts.url);
            if (expIconOpts.htitle) { expandIcon.element.htitle = expIconOpts.htitle; }
            if(expandIcon[IDS.CSS_CL]){ expandIcon.element.classList.add(expandIcon[IDS.CSS_CL]); }
        }
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

module.exports = TPLFacadeExpandLabel;