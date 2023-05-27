'use strict';

const u = require("@nkmjs/utils");

const dom = require(`./utils-dom`);
const UI = require(`./ui`);

const FLAGS = require(`./flags`);
const FlagEnum = require(`./helpers/flag-enum`);
const Widget = require(`./widget`);

const base = Widget;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class WidgetOrientable extends base {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {symbol}
     */
    //static CONTROL_ACTIVATED = Symbol(`controlActivated`);

    // ----> Init

    /**
     * @access protected
     * @description TODO
     * @type {string}
     */
    static __defaultOrientation = FLAGS.HORIZONTAL;

    _Init() {

        super._Init();
        this._isHorizontalScrollEnabled = false;

        /**
         * @type {FlagEnum}
         */
        FlagEnum.Attach(this, `orientation`, FLAGS.orientations)
            .onFlagChanged.Add(this._Bind(this._OnOrientationChanged));

        this._Bind(this._HorizontalScroll);

    }

    _PostInit() {
        super._PostInit();
        this.orientation = this.constructor.__defaultOrientation;
    }

    // ----> Placement & Orientation

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
            if (this.orientation === FLAGS.VERTICAL) { this._pointer.wheelFn = null; }
            else { this._pointer.wheelFn = this._HorizontalScroll; }
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
        if (!dom.OverflowsX(this._wrapper)) { return; }
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
        this.orientation = this.constructor.__defaultOrientation;
    }

}

module.exports = WidgetOrientable;
//UI.Register(`nkmjs-widget-orientable`, WidgetOrientable);