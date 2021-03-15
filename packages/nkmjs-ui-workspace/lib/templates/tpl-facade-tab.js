'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

const __closeIcon = `_closeIcon`;
const __icon = `_${ui.IDS.ICON}`;
const __label = `_${ui.IDS.LABEL}`;

class TPLFacadeTab extends ui.DOMTemplate {
    constructor() {
        super();;
    }

    /*

    get closeIcon() { return this._closeIcon; }
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(ui.FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(ui.FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`div`, { class: ui.IDS.ICON }), __icon);
        this._Add(u.dom.New(`span`, { class: ui.IDS.LABEL }), __label);
        this._Add(u.dom.New(`div`, { class: `${ui.IDS.ICON} close` }), __closeIcon);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            iconOpts = u.tils.Get(p_options, ui.IDS.ICON, null),
            labelOpts = u.tils.Get(p_options, ui.IDS.TITLE, null),
            closeIconOpts = u.tils.Get(p_options, `closeIcon`, null),
            icon = owner[__icon] = new ui.manipulators.Icon(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new ui.manipulators.Text(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false),
            closeIcon = owner[__closeIcon] = new ui.manipulators.Icon(owner[__closeIcon], closeIconOpts && `autoHide` in closeIconOpts ? closeIconOpts.autoHide : false);

        if (iconOpts) {
            icon.Set(iconOpts);
            if (iconOpts[ui.IDS.CSS_CL]) { icon.element.classList.add(iconOpts[ui.IDS.CSS_CL]); }
        }
        if (labelOpts) { 
            label.Set(labelOpts); 
            if(labelOpts[ui.IDS.CSS_CL]){ label.element.classList.add(labelOpts[ui.IDS.CSS_CL]); }
        }
        if (closeIconOpts) {
            closeIcon.Set(closeIconOpts.url);
            if (closeIconOpts.htitle) { closeIcon.element.title = closeIconOpts.htitle; }
            if (closeIconOpts[ui.IDS.CSS_CL]) { closeIcon.element.classList.add(closeIconOpts[ui.IDS.CSS_CL]); }
        }

        return owner;
    }

}

module.exports = TPLFacadeTab;