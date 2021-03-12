'use strict';

const u = require("@nkmjs/utils");
const { UI_ID, DOMTemplate, manipulators } = require(`@nkmjs/ui-core`);

const __closeIcon = `_closeIcon`;
const __icon = `_${UI_ID.ICON}`;
const __label = `_${UI_ID.LABEL}`;

class TPLFacadeTab extends DOMTemplate {
    constructor() {
        super();;
    }

    /*

    get closeIcon() { return this._closeIcon; }
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._label.Set(p_value)); }

    */

    static _CreateTemplate() {
        super._CreateTemplate();
        this._Add(u.dom.New(`span`, { class: UI_ID.ICON }), __icon);
        this._Add(u.dom.New(`span`, { class: UI_ID.LABEL }), __label);
        this._Add(u.dom.New(`span`, { class: `${UI_ID.ICON} close` }), __closeIcon);
    }

    Render(p_host, p_options = null) {
        let owner = super.Render(p_host, p_options),
            iconOpts = u.tils.Get(p_options, UI_ID.ICON, null),
            labelOpts = u.tils.Get(p_options, UI_ID.TITLE, null),
            closeIconOpts = u.tils.Get(p_options, `closeIcon`, null),
            icon = owner[__icon] = new manipulators.Image(owner[__icon], iconOpts && `autoHide` in iconOpts ? iconOpts.autoHide : true),
            label = owner[__label] = new manipulators.Text(owner[__label], labelOpts && `autoHide` in labelOpts ? labelOpts.autoHide : false),
            closeIcon = owner[__closeIcon] = new manipulators.Image(owner[__closeIcon], closeIconOpts && `autoHide` in closeIconOpts ? closeIconOpts.autoHide : false);

        if (iconOpts) {
            icon.Set(iconOpts);
            if (iconOpts[UI_ID.CSS_CL]) { icon.element.classList.add(iconOpts[UI_ID.CSS_CL]); }
        }
        if (labelOpts) { 
            label.Set(labelOpts); 
            if(labelOpts[UI_ID.CSS_CL]){ label.element.classList.add(labelOpts[UI_ID.CSS_CL]); }
        }
        if (closeIconOpts) {
            closeIcon.Set(closeIconOpts.url);
            if (closeIconOpts.htitle) { closeIcon.element.title = closeIconOpts.htitle; }
            if (closeIconOpts[UI_ID.CSS_CL]) { closeIcon.element.classList.add(closeIconOpts[UI_ID.CSS_CL]); }
        }

        return owner;
    }

}

module.exports = TPLFacadeTab;