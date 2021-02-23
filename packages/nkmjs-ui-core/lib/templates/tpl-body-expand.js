'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);

const UI_ID = require(`../ui-id`);
const DOMTemplate = require(`../dom-template`);

const ImageManipulator = require(`../manipulators/manipulator-image`);
const TextManipulator = require(`../manipulators/manipulator-text`);

const __header = `_${UI_ID.HEADER}`;
const __expandIcon = `_expandIcon`;
const __icon = `_${UI_ID.ICON}`;
const __label = `_${UI_ID.LABEL}`;
const __body = `_${UI_ID.BODY}`;

class TPLBodyExpand extends DOMTemplate {
    constructor() { super(); }

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(UDOM.New(`div`, { class: UI_ID.HEADER }), __header);
        this._Add(UDOM.New(`span`, { class: `${UI_ID.ICON} expand` }), __expandIcon, __header);
        this._Add(UDOM.New(`span`, { class: UI_ID.ICON }), __icon, __header);
        this._Add(UDOM.New(`span`, { class: UI_ID.LABEL }), __label, __header);
        this._Add(UDOM.New(`div`, { class: UI_ID.BODY }), __body);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            expIconOpts = U.Get(p_options, `expandIcon`, null),
            iconOpts = U.Get(p_options, UI_ID.ICON, null),
            labelOpts = U.Get(p_options, UI_ID.TITLE, null),
            expandIcon = owner[__expandIcon] = new ImageManipulator(owner[__expandIcon], expIconOpts && `autoHide` in expIconOpts ? expIconOpts.autoHide : false),
            icon = owner[__icon] = new ImageManipulator(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new TextManipulator(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false);

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

module.exports = TPLBodyExpand;