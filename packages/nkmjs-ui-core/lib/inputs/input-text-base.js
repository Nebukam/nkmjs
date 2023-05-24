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

class InputTextBase extends base {
    constructor() { super(); }

    static __inputProperties = {};
    static __default_useMinlength = false;
    static __default_useMaxlength = false;

    _Init() {
        super._Init();

        this._useMinlength = false;
        this._useMaxlength = false;
        this._minlength = 0;
        this._maxlength = 0;

        this._Bind(this._SanitizeMinlength);
        this._Bind(this._SanitizeMaxlength);

        this._handler._updatePreviewOnInput = false;
        this._handler._changeOnInput = false;

    }

    _PostInit() {
        super._PostInit();
        this.focusArea = this;
    }

    //#region min

    get useMin() { return this._useMinlength; }
    set useMin(p_value) {
        this._useMinlength = p_value;
        if (p_value) { this.min = this._minlength; }
        else {
            dom.RAtt(this._inputField, `minlength`);
            this._handler.RemoveSanitization(this._SanitizeMinlength);
        }
    }

    get min() { return this._minlength; }
    set min(p_value) {
        this._minlength = p_value;
        if (this._useMinlength) {
            dom.SAtt(this._inputField, `minlength`, this._minlength);
            this._handler.AddSanitization(this._SanitizeMinlength);
        }
    }

    _SanitizeMinlength(p_value) {
        return p_value < this._minlength ? this._minlength : p_value;
    }

    //#endregion

    //#region max

    get useMax() { return this._useMaxlength; }
    set useMax(p_value) {
        this._useMaxlength = p_value;
        if (p_value) { this.max = this._maxlength; }
        else {
            dom.RAtt(this._inputField, `maxlength`);
            this._handler.RemoveSanitization(this._SanitizeMaxlength);
        }
    }

    get max() { return this._maxlength; }
    set max(p_value) {
        this._maxlength = p_value;
        if (this._useMaxlength) {
            dom.SAtt(this._inputField, `maxlength`, this._maxlength);
            this._handler.AddSanitization(this._SanitizeMaxlength);
        }
    }

    _SanitizeMaxlength(p_value) {
        return p_value > this._maxlength ? this._maxlength : p_value;
    }

    //#endregion

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {

        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);

        this.useMin = p_options.minlength ? true : false;
        if (this._useMinlength) { this.min = p_options.minlength; }

        this.useMax = p_options.maxlength ? true : false;
        if (this._useMaxlength) { this.max = p_options.maxlength; }

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
    }

    _CleanUp() {
        this.useMin = this.constructor.__default_useMin;
        this.useMax = this.constructor.__default_useMax;
        super._CleanUp();
    }

}

module.exports = InputTextBase;