'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

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
        this._configMap = new Map();
        this._conditionalControls = null;

    }

    set host(p_value) { this._host = p_value; }
    get host() { return this._host; }

    set preProcessDataFn(p_value) { this._preProcessDataFn = p_value; }

    set defaultControlClass(p_value) { this._defaultControlClass = p_value; }

    set defaultCSS(p_value) { this._defaultCSS = p_value; }

    get context() { return this._context; }
    set context(p_value) {

        this._context = p_value;
        for (let i = 0, n = this._controls.length; i < n; i++) {
            this._controls[i].context = p_value;
        }

        this.RefreshConditionals();

    }

    get data() { return this._data; }
    set data(p_value) {

        this._data = this._preProcessDataFn ? this._preProcessDataFn(p_value) : p_value;
        for (let i = 0, n = this._controls.length; i < n; i++) {
            this._controls[i].data = p_value;
        }

        this.RefreshConditionals();

    }

    Set(p_context, p_data) {

        this._context = p_context;
        this._data = this._preProcessDataFn ? this._preProcessDataFn(p_value) : p_value;

        for (let i = 0, n = this._controls.length; i < n; i++) {
            let control = this._controls[i];
            control.context = p_context;
            control.data = p_data;
        }

        this.RefreshConditionals();

    }

    /**
     * { cl:class, css:'class', member:'member', options:{} }
     * @param {array} p_controls 
     */
    Build(p_controls) {

        for (let i = 0, n = p_controls.length; i < n; i++) {

            let config = p_controls[i],
                control = null,
                cl = null;

            if (config.context) { cl = com.BINDINGS.Get(config.context, (config.key || config.cl), config.cl); }
            else { cl = config.cl; }

            if (!cl) { cl = this._defaultControlClass; }

            control = this.Add(cl, config.css, config);
            if (config.member) { this._owner[config.member] = control; }

        }

    }

    /**
     * 
     * @param {function} p_class 
     * @param {string} [p_css] 
     * @returns 
     */
    Add(p_class, p_css = null, p_config = null, p_configIsOptions = false) {

        let
            control = this._owner.Add(p_class, p_css ? `${p_css} ${this._defaultCSS}` : this._defaultCSS, this._host),
            conditional = false;
        this._controls.push(control);
        if (p_config) {
            this._configMap.set(control, p_config);
            if (p_config.options && !p_configIsOptions) { control.options = p_config.options; }
            else if (p_configIsOptions) { control.options = p_config; }
            if (p_config.hideWhen || p_config.disableWhen) {
                conditional = true;
            }
        }

        control.context = this._context;
        control.data = this._data;

        if (conditional) {
            if (!this._conditionalControls) { this._conditionalControls = []; }
            this._conditionalControls.push(control);
            this._RefreshConditions(control, p_config);
        }

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

        if (this._conditionalControls) {
            index = this._conditionalControls.indexOf(p_control);
            if (index != -1) { this._conditionalControls.splice(index, 1); }
        }

        this._configMap.delete(p_control);

        p_control.Release();

    }

    RefreshConditionals() {
        if (!this._conditionalControls) { return; }
        for (let i = 0; i < this._conditionalControls.length; i++) {
            let control = this._conditionalControls[i];
            this._RefreshConditions(control, this._configMap.get(control));
        }
    }

    _RefreshConditions(p_control, p_config) {
        if (p_config.hideWhen) {
            if ((p_config.requireData && !this._data) ||
                (p_config.requireContext && !this._context)) {
                p_control.visible = false;
            } else {
                p_control.visible = u.CallPrepend(p_config.hideWhen, this);
            }
        }
        if (p_config.disableWhen) {
            if ((p_config.requireData && !this._data) ||
                (p_config.requireContext && !this._context)) {
                p_control.disabled = true;
            } else {
                p_control.disabled = !u.CallPrepend(p_config.disableWhen, this);
            }
        }
    }

    Clear() {
        for (let i = 0, n = this._controls.length; i < n; i++) { this._controls[i].Release(); }
        this._configMap.clear();
        this._controls.length = 0;
        if (this._conditionalControls) {
            this._conditionalControls.length = 0;
            this._conditionalControls = null;
        }
    }

}

module.exports = ControlBuilder;