'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const CONTEXT = require(`../context`);

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class ControlManager {

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`host`, `_host`)
        .To(`css`, `_defaultCSS`)
        .To(`dataFn`, `_preProcessDataFn`);

    constructor(p_owner, p_defaultCSS = `ctrl`) {

        this._owner = p_owner;

        this._isDisplayed = false;

        this._context = null;
        this._editor = null;
        this._host = p_owner;
        this._defaultCSS = p_defaultCSS;
        this._bindingContext = CONTEXT.CONTROLLER;

        this._preProcessDataFn = null;

        this._controls = [];
        this._dataMap = new Map();

        this._ctrlObserver = new com.signals.Observer();
        this._ctrlObserver.Hook(com.SIGNAL.RELEASED, this._OnCtrlReleased, this);

    }

    set host(p_value) { this._host = p_value; }
    get host() { return this._host; }

    set preProcessDataFn(p_value) { this._preProcessDataFn = p_value; }

    set defaultCSS(p_value) { this._defaultCSS = p_value; }

    set editor(p_value) { this._controls.forEach(ctrl => { ctrl.editor = p_value; }); }

    set context(p_value) { this._controls.forEach(ctrl => { ctrl.context = p_value; }); }

    Handle(p_data, p_css = null, p_host = null) {

        let ctrl = this._dataMap.get(p_data);

        if (ctrl) { return ctrl; }

        let cl = com.BINDINGS.Get(this._bindingContext, p_data, null);

        if (!cl) { return null; }
        ctrl = this._owner.Attach(cl, p_css ? `${p_css} ${this._defaultCSS}` : this._defaultCSS, p_host || this._host);

        this._controls.push(ctrl);
        this._dataMap.set(p_data, ctrl);

        ctrl.editor = this._owner.editor;
        ctrl.context = this._owner.context;
        ctrl.data = p_data;

        this._ctrlObserver.Observe(ctrl);

        return ctrl;

    }

    Release(p_data) {

        let ctrl = this._dataMap.get(p_data);

        if (!ctrl) { return; }

        let index = this._controls.indexOf(ctrl);

        this._controls.splice(index, 1);
        this._dataMap.delete(p_data);

        this._ctrlObserver.Unobserve(ctrl);

        return ctrl;

    }

    Get(p_data) { return this._dataMap.set(p_data, ctrl); }

    Clear() {
        this._controls.forEach(ctrl => { ctrl.Release(); });
        this._dataMap.clear();
        this._controls.length = 0;
    }

    DisplayGranted() {
        if (this._isDisplayed) { return; }
        this._isDisplayed = true;
        this._controls.forEach(ctrl => { if (`DisplayGranted` in ctrl) { ctrl.DisplayGranted(); } });
    }

    DisplayLost() {
        if (!this._isDisplayed) { return; }
        this._isDisplayed = false;
        this._controls.forEach(ctrl => { if (`DisplayLost` in ctrl) { ctrl.DisplayLost(); } });
    }

    _OnCtrlReleased(p_ctrl) { this.Release(p_ctrl); }

}

module.exports = ControlManager;