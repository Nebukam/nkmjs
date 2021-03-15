'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const DOMTemplate = require(`../dom-template`);

const manipulators = require(`../manipulators`);

const __icon = `_${IDS.ICON}`;
const __title = `_${IDS.TITLE}`;
const __subtitle = `_${IDS.SUBTITLE}`;
const __header = `_${IDS.HEADER}`;
const __body = `_${IDS.BODY}`;

const __titles = `_titles`;

class TPLBodyHeaderTitles extends DOMTemplate {
    constructor() {
        super();
    }

    /*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) {  this._subtitle.Set(p_value); }

    get header(){ return this._header; }
    get body(){ return this._body; }


    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: IDS.HEADER }), __header);
        this._Add(u.dom.New(`div`, { class: IDS.ICON }), __icon, __header);
        this._Add(u.dom.New(`span`, { class: `titles` }), __titles, __header);
        this._Add(u.dom.New(`span`, { class: IDS.TITLE }), __title, __titles);
        this._Add(u.dom.New(`span`, { class: IDS.SUBTITLE }), __subtitle, __titles);
        this._Add(u.dom.New(`div`, { class: IDS.BODY }), __body);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            iconOpts = u.tils.Get(p_options, IDS.ICON, null),
            titleOpts = u.tils.Get(p_options, IDS.TITLE, null),
            subtitleOpts = u.tils.Get(p_options, IDS.SUBTITLE, null),
            icon = owner[__icon] = new manipulators.Icon(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : false),
            title = owner[__title] = new manipulators.Text(owner[__title], titleOpts && `autoHide` in titleOpts ? titleOpts.autoHide : false),
            subtitle = owner[__subtitle] = new manipulators.Text(owner[__subtitle], subtitleOpts && `autoHide` in subtitleOpts? subtitleOpts.autoHide : false);

            if (iconOpts) { 
                icon.Set(iconOpts); 
                if(iconOpts[IDS.CSS_CL]){ icon.element.classList.add(iconOpts[IDS.CSS_CL]); }
            }
            if (titleOpts) { 
                title.Set(titleOpts); 
                if(titleOpts[IDS.CSS_CL]){ title.element.classList.add(titleOpts[IDS.CSS_CL]); }
            }
            if (subtitleOpts) { 
                subtitle.Set(subtitleOpts); 
                if(subtitleOpts[IDS.CSS_CL]){ subtitle.element.classList.add(subtitleOpts[IDS.CSS_CL]); }
            }

        return owner;
    }

}

module.exports = TPLBodyHeaderTitles;