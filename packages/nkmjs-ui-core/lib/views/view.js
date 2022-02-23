'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const WidgetOrientable = require(`../widget-orientable`);

/**
* A View is a simple WidgetOrientable that can request focus, and includes
* an internal CommandBox.
* @hideconstructor
* @class
* @augments ui.core.WidgetOrientable
* @memberof ui.core.views
*/
class View extends WidgetOrientable {
    constructor() { super(); }

    static __default_iState = null;

    _Init() {
        super._Init();

        this._commands = new actions.CommandBox(this._Bind(this._OnCmdRegister));

        this._isDisplayed = false;
        this._flags.Add(this, FLAGS.SHOWN);
    }

    _Style() {
        return style.Extends({
            ':host': {

            }
        }, super._Style());
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        this._commands.context = this._data;
    }

    get displayed() { return this._isDisplayed; }

    // ----> Resizing

    /**
     * @access protected
     * @description Determine whether the object uses paint callbacks and thus broadcast paint signals.
     * <br>Note : this property is set on a per-class basis, rather than on a per-instance basis. 
     * Set this value by overloading it in your class definition.
     * @group Rendering
     * @customtag static
     * @example ... extends DisposableHTMLElement{
     *  static __usePaintCallback = true;
     * }
     */
    static __useResizeCallback = true;

    static __resizeObserver = new ResizeObserver(
        (entries, observer) => {

            for (let i = 0, n = entries.length; i < n; i++) {
                let entry = entries[i],
                    target = entry.target;

                if (target.constructor.__useResizeCallback) {
                    target._OnSizeChange(entry.contentRect);
                }

                /*
            if (entry.contentBoxSize) {
                // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                let boxSize = u.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

                h1Elem.style.fontSize = Math.max(1.5, boxSize.inlineSize / 200) + 'rem';
                pElem.style.fontSize = Math.max(1, boxSize.inlineSize / 600) + 'rem';
            } else {
                h1Elem.style.fontSize = Math.max(1.5, entry.contentRect.width / 200) + 'rem';
                pElem.style.fontSize = Math.max(1, entry.contentRect.width / 600) + 'rem';
                console.log
            }
            */
            }
        });

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _OnSizeChange(p_contentRect) {
    }

    //

    /**
     * @description TODO
     */
    RequestDisplay() {
        this._Broadcast(SIGNAL.DISPLAY_REQUESTED, this);
        //Handle notifications bubbles & warnings the same way.
    }

    /**
     * @description TODO
     */
    RequestClose() {
        this._Broadcast(SIGNAL.CLOSE_REQUESTED, this);
    }

    /**
     * @description Callback when RequestDisplay has been handled.
     */
    DisplayGranted() {
        if (this._isDisplayed) { return false; }
        this._isDisplayed = true;
        this._flags.Set(FLAGS.SHOWN, true);
        this._OnDisplayGain();
        this._Broadcast(SIGNAL.DISPLAY_GAIN, this);
        return true;
    }

    /**
     * @description Callback when the view handler granted display to another view.
     * @customtag override-me
     */
    _OnDisplayGain() { }

    /**
     * @description Called when the view handler granted display to another view.
     */
    DisplayLost() {
        if (!this._isDisplayed) { return false; }
        this._isDisplayed = false;
        this._flags.Set(FLAGS.SHOWN, false);
        this._OnDisplayLost();
        this._Broadcast(SIGNAL.DISPLAY_LOST, this);
        return true;
    }

    /**
     * @description Callback when the view handler granted display to another view.
     * @customtag override-me
     */
    _OnDisplayLost() { }

    /**
     * @access protected
     * @param {actions.Command} p_cmd 
     */
    _OnCmdRegister(p_cmd) {

    }

    _CleanUp() {
        this.DisplayLost();
        super._CleanUp();
        if (this.constructor.__useResizeCallback) {
            this.constructor.__resizeObserver.unobserve(this);
        }
    }

    Wake() {
        super.Wake();
        if (this.constructor.__useResizeCallback) {
            this.constructor.__resizeObserver.observe(this);
        }
    }

}

module.exports = View;
UI.Register('nkmjs-view', View);