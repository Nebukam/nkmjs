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

class InputNumberBase extends InputField {
    constructor() { super(); }

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
        this._step = 0;

        this._Bind(this._SanitizeMin);
        this._Bind(this._SanitizeMax);

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
        if (this._useMax) {
            dom.SAtt(this._inputField, `step`, this._step);
            // TODO : Add validation
        }
    }

    //#endregion

    set options(p_options) {

        this.useMin = p_options.min ? true : false;
        if (this._useMin) { this.min = p_options.min; }

        this.useMax = p_options.max ? true : false;
        if (this._useMax) { this.max = p_options.max; }

        this.useStep = p_options.step ? true : false;
        if (this._useStep) { this.step = p_options.step; }

    }

    // ----> DOM

    _Style() {

        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `stretch`
            },
            '.field': {
                flex: `1 1 auto`,
                'min-width': 0
            }
        }, super._Style());

    }

    _Render(){
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