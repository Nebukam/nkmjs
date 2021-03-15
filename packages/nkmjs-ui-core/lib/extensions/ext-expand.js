'use strict';

const u = require("@nkmjs/utils");

const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);
const DisplayObject = require("../display-object");

const Extension = require("./extension");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 */
class ExpandExtension extends Extension {
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
                if (u.tils.isInstanceOf(oldValue, DisplayObject)) { oldValue.Unwatch(SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
                else { oldValue.removeEventListener(`click`, this._mClick); }
            }
            if (p_value) {
                if (u.tils.isInstanceOf(p_value, DisplayObject)) { p_value.Watch(SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
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

        p_target.flags.Add(p_target, FLAGS.EXPANDED, FLAGS.COLLAPSED);
        if (p_wrapper) {
            p_target.flags.Add(p_wrapper, FLAGS.EXPANDED, FLAGS.COLLAPSED);
        }

        this._UpdateFlags();
        this._Broadcast(this._isExpanded ? SIGNAL.EXPANDED : SIGNAL.COLLAPSED);

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
            if (u.tils.isInstanceOf(this._activator, DisplayObject)) { this._activator.Watch(SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
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
            if (u.tils.isInstanceOf(this._activator, DisplayObject)) { this._activator.Unwatch(SIGNAL.ACTIVATED, this._OnWidgetActivated, this); }
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
        this._Broadcast(SIGNAL.EXPANDED);
    }

    /**
     * @description TODO
     */
    Collapse() {
        if (!this._isExpanded) { return; }
        this._isExpanded = false;
        this._UpdateFlags();
        this._Broadcast(SIGNAL.COLLAPSED);
    }

    _UpdateFlags() {
        if (!this._target) { return; }
        this._target.flags.Set(FLAGS.EXPANDED, this._isExpanded);
        this._target.flags.Set(FLAGS.COLLAPSED, !this._isExpanded);
    }

    // ----> Pooling

    _CleanUp() {
        this._HideHint();
        this._hintElement = null;
        this._target = null;
        super._CleanUp();
    }

}

module.exports = ExpandExtension;