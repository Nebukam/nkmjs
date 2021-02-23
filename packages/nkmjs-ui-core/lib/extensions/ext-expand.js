'use strict';

const { U } = require(`@nkmjs/utils`);
const { DisposableObjectEx } = require(`@nkmjs/common`);

const UI_FLAG = require(`../ui-flag`);
const UI_SIGNAL = require(`../ui-signal`);
const DisplayObject = require("../display-object");
const ExtBase = require("./ext-base");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.ExtBase
 * @memberof ui.core.extensions
 */
class ExtExpand extends ExtBase {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._target = null;
        this._wrapper = null;
        this._isExpanded = false;
        this._activator = null;
        this._activateOnAlt = false;
        this._Bind(this._mClick);
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isExpanded() { return this._isExpanded; }

    /**
     * @description TODO
     * @type {boolean}
     */
    get activateOnAlt() { return this._activateOnAlt; }
    set activateOnAlt(p_value) { this._activateOnAlt = p_value; }

    /**
     * @description TODO
     * @type {Element}
     */
    get activator() { return this._activator; }
    set activator(p_value) {
        //if(this._activator === p_value){return;}
        let oldValue = this._activator;
        this._activator = p_value;

        if (this._isEnabled) {

            if (oldValue) {
                if (U.isInstanceOf(oldValue, DisplayObject)) { oldValue.Unwatch(UI_SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
                else { oldValue.removeEventListener(`click`, this._mClick); }
            }
            if (p_value) {
                if (U.isInstanceOf(p_value, DisplayObject)) { p_value.Watch(UI_SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
                else { p_value.addEventListener(`click`, this._mClick); }
            }

        }
    }

    /**
     * @description TODO
     * @param {*} p_target 
     * @param {*} p_wrapper 
     * @param {*} [p_activator] 
     * @param {*} [p_activateOnAlt] 
     */
    Setup(p_target, p_wrapper, p_activator = null, p_activateOnAlt = false) {

        this._target = p_target;
        this._wrapper = p_wrapper;

        if (!p_target) { return; }

        p_target.flags.Add(p_target, UI_FLAG.EXPANDED, UI_FLAG.COLLAPSED);
        if (p_wrapper) {
            p_target.flags.Add(p_wrapper, UI_FLAG.EXPANDED, UI_FLAG.COLLAPSED);
        }

        this._UpdateFlags();
        this._Broadcast(this._isExpanded ? UI_SIGNAL.EXPANDED : UI_SIGNAL.COLLAPSED);

        if (p_activator) {
            this.activator = p_activator;
            this._activateOnAlt = p_activateOnAlt;
        }

    }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._activator) {
            if (U.isInstanceOf(this._activator, DisplayObject)) { this._activator.Watch(UI_SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
            else { this._activator.addEventListener(`click`, this._mClick); }
        }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._activator) {
            if (U.isInstanceOf(this._activator, DisplayObject)) { this._activator.Unwatch(UI_SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
            else { this._activator.removeEventListener(`click`, this._mClick); }
        }
        return true;
    }

    _OnWidgetActivated(p_widget, p_evt) {
        this.Toggle();
    }

    _mClick(p_evt) {
        if (p_evt.detail > 1) { if (this._activateOnAlt) { this.Toggle(); } } //second click of dbclick
        else if (!this._activateOnAlt) { this.Toggle(); }
    }

    /**
     * @description TODO
     */
    Toggle() {
        if (this._isExpanded) { this.Collapse(); }
        else { this.Expand(); }
    }

    /**
     * @description TODO
     * @param {boolean} p_scrollTo 
     */
    Expand(p_scrollTo = true) {
        if (this._isExpanded) { return; }
        this._isExpanded = true;
        this._UpdateFlags();
        if (p_scrollTo) {
            this._target.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
        }
        this._Broadcast(UI_SIGNAL.EXPANDED);
    }

    /**
     * @description TODO
     */
    Collapse() {
        if (!this._isExpanded) { return; }
        this._isExpanded = false;
        this._UpdateFlags();
        this._Broadcast(UI_SIGNAL.COLLAPSED);
    }

    _UpdateFlags() {
        if (!this._target) { return; }
        this._target.flags.Set(UI_FLAG.EXPANDED, this._isExpanded);
        this._target.flags.Set(UI_FLAG.COLLAPSED, !this._isExpanded);
    }

    // ----> Pooling

    _CleanUp() {
        this._HideHint();
        this._hintElement = null;
        this._target = null;
        super._CleanUp();
    }

}

module.exports = ExtExpand;