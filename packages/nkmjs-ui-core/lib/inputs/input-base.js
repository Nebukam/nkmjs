/**
 * Input are abstract data manipulator.
 * They don't know what they are manipulating, or why.
 */

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const IDS = require(`../ids`);
const FLAGS = require(`../flags`);
const Widget = require(`../widget`);
const FlagEnum = require(`../helpers/flag-enum`);

const SIGNAL = require(`./input-signal`);
const InputHandler = require(`./input-handler`);

class BaseInput extends Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/global-input.css`]
    }, Widget, ['css']);

    static __usePaintCallback = false;

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

        this._sizeEnum = new FlagEnum(FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new FlagEnum(FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._distribute = new com.helpers.OptionsDistribute(
            this._Bind(this._OnOptionsUpdated),
            this._Bind(this._OnOptionsWillUpdate));

        this._distribute
            .To(`flagOn`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], true) } })
            .To(`flagOff`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], false) } })
            .To(`size`)
            .To(`currentValue`)
            .To(IDS.FLAVOR)
            .To(IDS.VARIANT);

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
        this._distribute.Update(this, p_value);
    }

    /**
     * @description TODO
     * @type {object}
     */
    set altOptions(p_value) {
        if (!p_value) { return; }
        this._distribute.ProcessExistingOnly(this, p_value, null, false, false);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (!p_options) { return; }
        p_options.htitle = u.tils.Get(p_options, `htitle`, (p_options.label || ``));
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {

        this._handler.changeOnInput = u.tils.Get(p_options, `changeOnInput`, this._handler.changeOnInput);
        this._handler.submitOnChange = u.tils.Get(p_options, `submitOnChange`, this._handler.submitOnChange);
        this._handler.preventTabIndexing = u.tils.Get(p_options, `preventTabIndexing`, this._handler.preventTabIndexing);        

        let onSubmit = p_options.onSubmit;
        if (onSubmit) { this._handler.Watch(SIGNAL.VALUE_SUBMITTED, onSubmit.fn, onSubmit.thisArg || null ); }

        let onChange = p_options.onChange;
        if (onChange) { this._handler.Watch(com.SIGNAL.VALUE_CHANGED, onChange.fn, onChange.thisArg || null); }

        let onInput = p_options.onInput;
        if (onInput) { this._handler.Watch(SIGNAL.VALUE_INPUT_CHANGED, onInput.fn, onInput.thisArg || null); }

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

        this._sizeEnum.Set(null);
        this._flavorEnum.Set(null);
        this._handler.Clear();

    }

}

module.exports = BaseInput;
//UI.Register(`nkmjs-input-base`, BaseInput);