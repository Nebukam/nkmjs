'use strict';

const com = require("@nkmjs/common");

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class ControlBuilder {

    constructor(p_owner, p_defaultCSS = `group`) {

        this._owner = p_owner;

        this._context = null;
        this._host = p_owner;
        this._data = null;
        this._defaultCSS = p_defaultCSS;
        this._defaultControlClass = null;

        this._preProcessDataFn = null;

        this._controls = [];

    }

    set host(p_value) { this._host = p_value; }

    set preProcessDataFn(p_value) { this._preProcessDataFn = p_value; }

    set defaultControlClass(p_value) { this._defaultControlClass = p_value; }

    set defaultCSS(p_value){ this._defaultCSS = p_value; }

    set context(p_value) {

        this._context = p_value;
        for (let i = 0, n = this._controls.length; i < n; i++) {
            this._controls[i].context = p_value;
        }

    }

    set data(p_value) {

        this._data = this._preProcessDataFn ? this._preProcessDataFn(p_value) : p_value;
        for (let i = 0, n = this._controls.length; i < n; i++) {
            this._controls[i].data = p_value;
        }

    }

    Set(p_context, p_data) {

        this._context = p_context;
        this._data = this._preProcessDataFn ? this._preProcessDataFn(p_value) : p_value;

        for (let i = 0, n = this._controls.length; i < n; i++) {
            let control = this._controls[i];
            control.context = p_context;
            control.data = p_data;
        }

    }

    /**
     * { cl:class, css:'class', name:'name', options:{} }
     * @param {array} p_controls 
     */
    Build(p_controls) {

        for (let i = 0, n = p_controls.length; i < n; i++) {

            let config = p_controls[i],
                control = null,
                cl = null;

            if (config.context) { cl = com.BINDINGS.Get(config.context, (config.key || config.cl), config.cl); }
            else { cl = config.cl; }

            if(!cl){ cl = this._defaultControlClass; }

            control = this.Add(cl, config.css, config.options);
            if (config.name) { this._owner[config.name] = control; }

        }

    }

    /**
     * 
     * @param {function} p_class 
     * @param {string} [p_css] 
     * @returns 
     */
    Add(p_class, p_css = null, p_options = null) {

        let control = this._owner.Add(p_class, p_css ? `${p_css} ${this._defaultCSS}` : this._defaultCSS, this._host);
        this._controls.push(control);

        if (p_options) { control.options = p_options; }

        control.context = this._context;
        control.data = this._data;

        return control;

    }

    Fetch(p_context, p_key, p_fallbackClass = null, p_css = null) {
        let cl = com.BINDINGS.Get(p_context, p_key, p_fallbackClass);
        if (!cl) { return null; }
        return this.Add(cl, p_css);
    }

    /**
     * 
     * @param {*} p_control 
     */
    Remove(p_control) {

        let index = this._controls.indexOf(p_control);
        if (index != -1) { this._controls.splice(index, 1); }
        p_control.Release();

    }

    Clear() {
        for (let i = 0, n = this._controls.length; i < n; i++) { this._controls[i].Release(); }
        this._controls.length = 0;
    }

}

module.exports = ControlBuilder;