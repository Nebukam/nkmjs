'use strict';

const UI = require(`./ui`);
const UI_FLAG = require(`./ui-flag`);
const FlagEnum = require(`./helpers/flag-enum`);
const Widget = require(`./widget`);
const { UDOM } = require("@nkmjs/utils");

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class OrientableWidget extends Widget {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {symbol}
     */
    static CONTROL_ACTIVATED = Symbol(`controlActivated`);

    // ----> Init

    /**
     * @access protected
     * @description TODO
     * @type {string}
     */
    static __default_orientation = UI_FLAG.HORIZONTAL;

    _Init() {

        super._Init();
        this._isHorizontalScrollEnabled = false;

        this._orientation = new FlagEnum(UI_FLAG.orientations);
        this._orientation.Add(this);
        this._orientation.onFlagChanged.Add(this._Bind(this._OnOrientationChanged));

        this._Bind(this._HorizontalScroll);

    }

    _PostInit() {
        super._PostInit();
        this._orientation.Set(this.constructor.__default_orientation);
    }

    // ----> Placement & Orientation

    /**
     * @description TODO
     * @type {string}
     * @group Placement & Orientation
     */
    get orientation() { return this._orientation; }
    set orientation(p_value) { this._orientation.Set(p_value); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_newValue 
     * @param {string} p_oldValue
     * @customtag override-me
     * @group Placement & Orientation
     */
    _OnOrientationChanged(p_newValue, p_oldValue) {
        if (this._isHorizontalScrollEnabled) {
            if (this._orientation.currentFlag === UI_FLAG.VERTICAL) { this._interactions.wheelFn = null; }
            else { this._interactions.wheelFn = this._HorizontalScroll; }
        }
    }

    // ----> DOM

    /**
     * @access protected
     * @description TODO
     * @param {Event} p_evt 
     * @customtag override-me
     * @group Placement & Orientation
     */
    _HorizontalScroll(p_evt) {
        if(!UDOM.OverflowsX(this._wrapper)){ return; }
        let delta = Math.sign(p_evt.deltaY);
        this._wrapper.scrollBy({ 
            top: 0, // could be negative value
            left: (delta * 50), 
            //behavior: 'smooth' 
          });
        p_evt.preventDefault();
    }

    _CleanUp() {
        super._CleanUp();
        this._orientation.Set(this.constructor.__default_orientation);
    }

}

module.exports = OrientableWidget;