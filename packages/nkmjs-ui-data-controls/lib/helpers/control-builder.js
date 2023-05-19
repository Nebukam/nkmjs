'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class ControlBuilder {

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`host`, `_host`)
        .To(`css`, `_defaultCSS`)
        .To(`cl`, `_defaultControlClass`)
        .To(`dataFn`, `_preProcessDataFn`);

    constructor(p_owner, p_defaultCSS = `group`) {

        this._owner = p_owner;

        this._isDisplayed = false;

        this._context = null;
        this._editor = null;
        this._host = p_owner;
        this._data = null;
        this._defaultCSS = p_defaultCSS;
        this._defaultControlClass = null;

        this._preProcessDataFn = null;

        this._controls = [];
        this._configMap = new Map();
        this._conditionalControls = null;

        this._dataObserver = new com.signals.Observer();
        this._dataObserver.Hook(com.SIGNAL.UPDATED, this.RefreshConditionals, this);

    }

    set options(p_options) { this.constructor.__distribute.Update(this, p_options); }

    set host(p_value) { this._host = p_value; }
    get host() { return this._host; }

    set preProcessDataFn(p_value) { this._preProcessDataFn = p_value; }

    set defaultControlClass(p_value) { this._defaultControlClass = p_value; }

    set defaultCSS(p_value) { this._defaultCSS = p_value; }

    get editor() { return this._editor; }
    set editor(p_value) {
        this._editor = p_value;
        for (const ctrl of this._controls) { ctrl.editor = p_value; };
        this.RefreshConditionals();
    }

    get context() { return this._context; }
    set context(p_value) {

        this._context = p_value;
        for (const ctrl of this._controls) { ctrl.context = p_value; };
        this.RefreshConditionals();

    }

    get data() { return this._data; }
    set data(p_value) {

        this._data = this._preProcessDataFn ? u.Call(this._preProcessDataFn, p_value) : p_value;
        this._dataObserver.ObserveOnly(this._data);

        for (let i = 0, n = this._controls.length; i < n; i++) {
            let
                ctrl = this._controls[i],
                opts = this._configMap.get(ctrl);

            this._AssignData(ctrl, opts, this._data);
        }

        this.RefreshConditionals();

    }

    Set(p_context, p_data) {

        this._context = p_context;
        this._data = this._preProcessDataFn ? u.Call(this._preProcessDataFn, p_data) : p_data;
        this._dataObserver.ObserveOnly(this._data);


        for (const ctrl of this._controls) {
            ctrl.editor = this._editor;
            ctrl.context = p_context;
            this._AssignData(ctrl, this._configMap.get(ctrl), this._data);
        };

        this.RefreshConditionals();

    }

    /**
     * { cl:class, css:'class', member:'member', options:{} }
     * @param {array} p_controls 
     */
    Build(p_controls, p_host = null) {

        this.Clear();

        let fragment = document.createDocumentFragment();

        for (const conf of p_controls) {
            let ctrl = null,
                cl = conf.cl || this._defaultControlClass;

            if (conf.context) { cl = com.GetBinding(conf.context, (conf.key || conf.cl), cl); }

            ctrl = this.Add(cl, conf.css, conf, false, fragment);
            if (conf.member) { (conf.owner || this._owner)[conf.member] = ctrl; }

        };

        ui.dom.Attach(fragment, p_host || this._host);

    }

    /**
     * 
     * @param {function} p_class 
     * @param {string} [p_css] 
     * @returns 
     */
    Add(p_class, p_css = null, p_config = null, p_configIsOptions = false, p_host = null) {

        let
            ctrl = this._owner.Attach(p_class, p_css ? `${p_css} ${this._defaultCSS}` : this._defaultCSS, p_host || this._host),
            conditional = false;

        //if (this._controls.length >= 1) { ui.dom.AttachAfter(control, this._controls[this._controls.length - 1]); }

        this._controls.push(ctrl);

        if (p_config) {
            this._configMap.set(ctrl, p_config);
            if (p_config.options && !p_configIsOptions) { ctrl.options = p_config.options; }
            else if (p_configIsOptions) { ctrl.options = p_config; }
            if (p_config.hideWhen || p_config.disableWhen) { conditional = true; }
            if (p_config.cssInline) { ui.dom.CSS(ctrl, p_config.cssInline); }
        }

        ctrl.editor = this._editor;
        ctrl.context = this._context;

        this._AssignData(ctrl, p_config, this._data);

        if (conditional) {
            if (!this._conditionalControls) { this._conditionalControls = []; }
            this._conditionalControls.push(ctrl);
            this._RefreshConditions(ctrl, p_config);
        }

        if (this._isDisplayed) { ctrl.DisplayGranted?.(); }

        return ctrl;

    }

    Fetch(p_context, p_key, p_fallbackClass = null, p_css = null) {
        let cl = com.GetBinding(p_context, p_key, p_fallbackClass);
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
        for (const ctrl of this._conditionalControls) {
            this._RefreshConditions(ctrl, this._configMap.get(ctrl));
        };
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

    _AssignData(p_ctrl, p_opts, p_data) {
        if (!p_ctrl) { return; }
        if (!p_opts) { p_ctrl.data = p_data; return; }
        if (p_opts.ignoreData) { return; }
        if (p_opts.dataMember && p_data) { p_ctrl.data = p_data[p_opts.dataMember]; }
        else { p_ctrl.data = p_data; }
    }

    Clear() {

        for (const ctrl of this._controls) {

            let conf = this._configMap.get(ctrl);
            if (conf) {
                if (conf.css) { ui.dom.CSSClass(ctrl, conf.css, false); }
                //TODO : Clear owner member, if any
            }

            ctrl.Release();

        }

        this._configMap.clear();
        this._controls.length = 0;
        if (this._conditionalControls) {
            this._conditionalControls.length = 0;
            this._conditionalControls = null;
        }
    }

    DisplayGranted() {
        if (this._isDisplayed) { return; }
        this._isDisplayed = true;
        for (const ctrl of this._controls) { ctrl.DisplayGranted?.(); };
    }

    DisplayLost() {
        if (!this._isDisplayed) { return; }
        this._isDisplayed = false;
        for (const ctrl of this._controls) { ctrl.DisplayLost?.(); };
    }

}

module.exports = ControlBuilder;