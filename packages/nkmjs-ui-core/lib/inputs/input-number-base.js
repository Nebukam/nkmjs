//implement this : https://javascript.info/events-change-input

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const INPUT = require(`../input`);
const KB = actions.KEYBOARD;

const InputField = require(`./input-field`);

const base = InputField;

class InputNumberBase extends base {
    constructor() { super(); }

    static __usePaintCallback = true;

    static __inputProperties = {};
    static __default_useMin = false;
    static __default_useMax = false;
    static __default_useStep = false;

    _Init() {
        super._Init();

        this._useMin = false;
        this._useMax = false;
        this._useStep = false;
        this._min = 0;
        this._max = 0;
        this._step = 1;

        this._Bind(this._SanitizeMin);
        this._Bind(this._SanitizeMax);

        this._pointer._wheelFn = this._Bind(this._OnWheel);

        this._handler._updatePreviewOnInput = false;
        this._handler._changeOnInput = false;

    }

    _PostInit() {
        super._PostInit();
        this.focusArea = this;
    }

    //#region min

    get useMin() { return this._useMin; }
    set useMin(p_value) {
        this._useMin = p_value;
        if (p_value) { this.min = this._min; }
        else {
            dom.RAtt(this._inputField, `min`);
            this._handler.RemoveSanitization(this._SanitizeMin);
        }
    }

    get min() { return this._min; }
    set min(p_value) {
        this._min = p_value;
        if (this._useMin) {
            dom.SAtt(this._inputField, `min`, this._min);
            this._handler.AddSanitization(this._SanitizeMin);
        }
    }

    _SanitizeMin(p_value) {
        return p_value < this._min ? this._min : p_value;
    }

    //#endregion

    //#region max

    get useMax() { return this._useMax; }
    set useMax(p_value) {
        this._useMax = p_value;
        if (p_value) { this.max = this._max; }
        else {
            dom.RAtt(this._inputField, `max`);
            this._handler.RemoveSanitization(this._SanitizeMax);
        }
    }

    get max() { return this._max; }
    set max(p_value) {
        this._max = p_value;
        if (this._useMax) {
            dom.SAtt(this._inputField, `max`, this._max);
            this._handler.AddSanitization(this._SanitizeMax);
        }
    }

    _SanitizeMax(p_value) {
        return p_value > this._max ? this._max : p_value;
    }

    //#endregion

    //#region step

    get useStep() { return this._useStep; }
    set useStep(p_value) {
        if (this._useStep == p_value) { return; }
        this._useStep = p_value;
        if (p_value) { this.step = this._step }
        else {
            dom.RAtt(this._inputField, `step`);
            // TODO : Rem validation
        }
    }

    get step() { return this._step; }
    set step(p_value) {
        this._step = p_value;
        if (this._useStep) {
            dom.SAtt(this._inputField, `step`, this._step);
            // TODO : Add validation
        }
    }

    //#endregion

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {

        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);

        this.useMin = u.isNumber(p_options.min) ? true : false;
        if (this._useMin) { this.min = p_options.min; }

        this.useMax = u.isNumber(p_options.max) ? true : false;
        if (this._useMax) { this.max = p_options.max; }

        this.useStep = p_options.step ? true : false;
        if (this._useStep) { this.step = p_options.step; }

    }

    _OnWheel(p_evt) {
        let increase = p_evt.deltaY < 0 ? this._step : -this._step;
        if (INPUT.shiftKey) { increase *= 10; }
        let value = this._GrabValue() + increase;

        if (this._useMin && value < this._min) { value = this._min; }
        if (this._useMax && value > this._max) { value = this._max; }

        this._handler.changedValue = value;
        this._handler.SubmitValue();

        return true;

    }

    // ----> DOM

    static _Style() {

        return style.Extends({
            ':host': {
                ...style.rules.pos.rel,
                ...style.rules.flex.stretch,
            },
            '.field': {
                ...style.rules.item.fill,
            }
        }, base._Style());

    }

    _Render() {
        super._Render();
        this.useMin = this.constructor.__default_useMin;
        this.useMax = this.constructor.__default_useMax;
        this.useStep = this.constructor.__default_useStep;
    }

    _CleanUp() {
        this.useMin = this.constructor.__default_useMin;
        this.useMax = this.constructor.__default_useMax;
        this.useStep = this.constructor.__default_useStep;
        super._CleanUp();
    }

}

module.exports = InputNumberBase;