'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);

const UI_ID = require(`../ui-id`);
const DOMTemplate = require(`../dom-template`);

const ImageManipulator = require(`../manipulators/manipulator-image`);
const TextManipulator = require(`../manipulators/manipulator-text`);

const __icon = `_${UI_ID.ICON}`;
const __title = `_${UI_ID.TITLE}`;
const __subtitle = `_${UI_ID.SUBTITLE}`;
const __header = `_${UI_ID.HEADER}`;
const __body = `_${UI_ID.BODY}`;

const __titles = `_titles`;

class TPLBodyHeaderTitles extends DOMTemplate {
    constructor() {
        super();
    }

    /*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) {  this._subtitle.Set(p_value); }

    get header(){ return this._header; }
    get body(){ return this._body; }


    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(UDOM.New(`div`, { class: UI_ID.HEADER }), __header);
        this._Add(UDOM.New(`span`, { class: UI_ID.ICON }), __icon, __header);
        this._Add(UDOM.New(`span`, { class: `titles` }), __titles, __header);
        this._Add(UDOM.New(`span`, { class: UI_ID.TITLE }), __title, __titles);
        this._Add(UDOM.New(`span`, { class: UI_ID.SUBTITLE }), __subtitle, __titles);
        this._Add(UDOM.New(`div`, { class: UI_ID.BODY }), __body);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            iconOpts = U.Get(p_options, UI_ID.ICON, null),
            titleOpts = U.Get(p_options, UI_ID.TITLE, null),
            subtitleOpts = U.Get(p_options, UI_ID.SUBTITLE, null),
            icon = owner[__icon] = new ImageManipulator(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : false),
            title = owner[__title] = new TextManipulator(owner[__title], titleOpts && `autoHide` in titleOpts ? titleOpts.autoHide : false),
            subtitle = owner[__subtitle] = new TextManipulator(owner[__subtitle], subtitleOpts && `autoHide` in subtitleOpts? subtitleOpts.autoHide : false);

            if (iconOpts) { 
                icon.Set(iconOpts); 
                if(iconOpts[UI_ID.CSS_CL]){ icon.element.classList.add(iconOpts[UI_ID.CSS_CL]); }
            }
            if (titleOpts) { 
                title.Set(titleOpts); 
                if(titleOpts[UI_ID.CSS_CL]){ title.element.classList.add(titleOpts[UI_ID.CSS_CL]); }
            }
            if (subtitleOpts) { 
                subtitle.Set(subtitleOpts); 
                if(subtitleOpts[UI_ID.CSS_CL]){ subtitle.element.classList.add(subtitleOpts[UI_ID.CSS_CL]); }
            }

        return owner;
    }

}

module.exports = TPLBodyHeaderTitles;