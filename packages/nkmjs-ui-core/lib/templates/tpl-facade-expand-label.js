'use strict';

const u = require("@nkmjs/utils");

const UI_ID = require(`../ui-id`);
const DOMTemplate = require(`../dom-template`);

const manipulators = require(`../manipulators`);

const __expandIcon = `_expandIcon`;
const __icon = `_${UI_ID.ICON}`;
const __label = `_${UI_ID.LABEL}`;

class TPLFacadeExpandLabel extends DOMTemplate {
    constructor() {
        super();
    }

    /*

    get expandIcon() { return this._expand_icon; }
    set expandIcon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._expand_icon.Set(p_value)); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: `${UI_ID.ICON} expand` }), __expandIcon);
        this._Add(u.dom.New(`div`, { class: UI_ID.ICON }), __icon);
        this._Add(u.dom.New(`span`, { class: UI_ID.LABEL }), __label);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            expIconOpts = u.tils.Get(p_options, `expandIcon`, null),
            iconOpts = u.tils.Get(p_options, UI_ID.ICON, null),
            labelOpts = u.tils.Get(p_options, UI_ID.TITLE, null),
            expandIcon = owner[__expandIcon] = new manipulators.Icon(owner[__expandIcon], expIconOpts && `autoHide` in expIconOpts ? expIconOpts.autoHide : false),
            icon = owner[__icon] = new manipulators.Icon(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new manipulators.Text(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false);

        if (expIconOpts) {
            expandIcon.Set(expIconOpts.url);
            if (expIconOpts.htitle) { expandIcon.element.htitle = expIconOpts.htitle; }
            if(expandIcon[UI_ID.CSS_CL]){ expandIcon.element.classList.add(expandIcon[UI_ID.CSS_CL]); }
        }
        if (iconOpts) { 
            icon.Set(iconOpts); 
            if(iconOpts[UI_ID.CSS_CL]){ icon.element.classList.add(iconOpts[UI_ID.CSS_CL]); }
        }
        if (labelOpts) { 
            label.Set(labelOpts); 
            if(labelOpts[UI_ID.CSS_CL]){ label.element.classList.add(labelOpts[UI_ID.CSS_CL]); }
        }

        return owner;
    }

}

module.exports = TPLFacadeExpandLabel;