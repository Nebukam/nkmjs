/**
 * Input are abstract data manipulator.
 * They don't know what they are manipulating, or why.
 */

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const helpers = require(`../helpers`);
const IDS = require(`../ids`);
const FLAGS = require(`../flags`);
const Widget = require(`../widget`);

const SIGNAL = require(`./input-signal`);
const InputHandler = require(`./input-handler`);

const base = Widget;

class BaseInput extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/global-input.css`]
    }, base, ['css']);

    static __usePaintCallback = false;

    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate`, wrapUpFn: `_OnOptionsUpdated` })
        .To(`flagOn`, helpers.flagOn)
        .To(`flagOff`, helpers.flagOff)
        .To(`htitle`)
        .To(IDS.SIZE)
        .To(`currentValue`)
        .To(IDS.FLAVOR)
        .To(IDS.VARIANT)
        .To(`onSubmit`, `onSubmitFn`, null)
        .To(`onChange`, `onChangeFn`, null)
        .To(`onInput`, `onInputFn`, null);

    // ----> Init

    _Init() {
        super._Init();


        //The SignalBox from the InputHandler is redundant with the BaseInput's one.
        //TODO : Need to redesign the relationship with the InputHandler object.
        //this._signals.Release();
        //this._signals = null;

        this._handler = new InputHandler();
        this._handler.owner = this;

        this._handler._updatePreviewFn = this._Bind(this._UpdatePreview);
        this._handler._onInputErrorFn = this._Bind(this._OnInputErrors);

        this._sizeEnum = new helpers.FlagEnum(FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new helpers.FlagEnum(FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._onSubmitFn = null;
        this._onChangeFn = null;
        this._onInputFn = null;

    }

    get handler() { return this._handler; }

    set size(p_value) { this._sizeEnum.Set(p_value); }
    get size() { return this._sizeEnum.currentFlag; }

    set flavor(p_value) { this._flavorEnum.Set(p_value); }
    get flavor() { return this._flavorEnum.currentFlag; }


    //#region Input properties

    /**
     * @type {*}
     */
    get currentValue() { return this._handler.currentValue; }
    set currentValue(p_value) { this._handler.currentValue = p_value; }

    /**
     * @type {*}
     */
    get changedValue() { return this._handler.changedValue; }
    set changedValue(p_value) { this._handler.changedValue = p_value; }

    get inputValue() { return this._handler.inputValue; }

    /**
     * @type {string}
     */
    get inputId() { return this._handler.inputId; }
    set inputId(p_value) { this._handler.inputId = p_value; }

    //#endregion

    //#region options handling

    /**
     * @description TODO
     * @type {object}
     */
    set options(p_value) {
        if (!p_value) { return; }
        this.constructor.__distribute.Update(this, p_value);
    }

    /**
     * @description TODO
     * @type {object}
     */
    set altOptions(p_value) {
        if (!p_value) { return; }
        this.constructor.__distribute.UpdateNoDefaults(this, p_value, null, false, false);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (!p_options) { return; }
        p_options.htitle = p_options.htitle || p_options.label || ``;
    }


    get onSubmitFn() { return this._onSubmitFn; }
    set onSubmitFn(p_value) {
        if (this._onSubmitFn == p_value) { return; }
        if (this._onSubmitFn) { this._handler.Unwatch(SIGNAL.VALUE_SUBMITTED, this._onSubmitFn.fn, this._onSubmitFn.thisArg || null); }
        this._onSubmitFn = p_value;
        if (p_value) { this._handler.Watch(SIGNAL.VALUE_SUBMITTED, p_value.fn, p_value.thisArg || null); }
    }

    get onChangeFn() { return this._onChangeFn; }
    set onChangeFn(p_value) {
        if (this._onChangeFn == p_value) { return; }
        if (this._onChangeFn) { this._handler.Unwatch(SIGNAL.VALUE_CHANGED, this._onChangeFn.fn, this._onChangeFn.thisArg || null); }
        this._onChangeFn = p_value;
        if (p_value) { this._handler.Watch(SIGNAL.VALUE_CHANGED, p_value.fn, p_value.thisArg || null); }
    }

    get onInputFn() { return this._onInputFn; }
    set onInputFn(p_value) {
        if (this._onInputFn == p_value) { return; }
        if (this._onInputFn) { this._handler.Unwatch(SIGNAL.VALUE_INPUT_CHANGED, this._onInputFn.fn, this._onInputFn.thisArg || null); }
        this._onInputFn = p_value;
        if (p_value) { this._handler.Watch(SIGNAL.VALUE_INPUT_CHANGED, p_value.fn, p_value.thisArg || null); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {

        this._handler.changeOnInput = `changeOnInput` in p_options ? p_options.changeOnInput : this._handler.changeOnInput;
        this._handler.submitOnChange = `submitOnChange` in p_options ? p_options.submitOnChange : this._handler.submitOnChange;
        this._handler.preventTabIndexing = `preventTabIndexing` in p_options ? p_options.preventTabIndexing : this._handler.preventTabIndexing;

    }

    //#endregion

    //#region Input error handling

    /**
     * @access protected
     * @description TODO
     * @param {array} p_errorList 
     */
    _OnInputErrors(p_errorList) {

        for (let i = 0, n = p_errorList.length; i < n; i++) {
            let err = p_errorList[i],
                feedback = this._RequestFeedback(err);

            this._flavorEnum.Bump(err.type);

            if (feedback) { this._handler._AddFeedback(feedback); }

        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_err 
     * @customtag override-me
     */
    _RequestFeedback(p_err) {
        return null;
    }

    //#endregion

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _UpdatePreview() { }

    /**
     * @access protected
     */
    _SelectionLost() {
        super._SelectionLost();

        //Auto-submit on selection lost
        this._handler.changedValue = this._GrabValue();
        this._handler.SubmitValue();
    }

    _GrabValue() { return null; }

    // ----> Pooling

    _CleanUp() {

        super._CleanUp();

        this.onSubmitFn = null;
        this.onChangeFn = null;
        this.onInputFn = null;

        this._sizeEnum.Set(null);
        this._flavorEnum.Set(null);
        this._handler.Clear();

    }

}

module.exports = BaseInput;
//UI.Register(`nkmjs-input-base`, BaseInput);