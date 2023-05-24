'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");

const base = ui.inputs.InputNumberBase;
const __slider = `slider`;
const _flag_noArrows = `no-arrows`;

class InputNumber extends base {
    constructor() { super(); }

    static __inputProperties = { type: `number` };

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/number.css`]
    }, base, ['css']);
    
/*
    static __distribute = base.__distribute.Ext()
        .To(`hideArrow`, null, false);
        */

    _Init(){
        super._Init();
        this._flags.Add(this, _flag_noArrows);
        this._Bind(this._ToggleBoost);
    }

    set hideArrow(p_value){
        this._flags.Set(_flag_noArrows, p_value);
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                'height': `var(--size)`,
                ...style.rules.flex.row.centerNowrap,
            },
            ':host(.no-arrows) .field': {
                'text-align': 'center'
            },
            ':host(.no-arrows) input[type=number]': {
                '-moz-appearance': 'textfield'
            },
            ':host(.no-arrows) input::-webkit-outer-spin-button, :host(.no-arrows) input::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                'margin': '0'
            }
        }, base._Style());
    }

    _onFocusIn(p_evt) {
        ui.INPUT.ONKeyToggle(actions.KEYBOARD.shiftKey, this._ToggleBoost);
        super._onFocusIn(p_evt);
    }

    _onFocusOut(p_evt) {
        ui.INPUT.OFFKeyToggle(actions.KEYBOARD.shiftKey, this._ToggleBoost);
        this._ToggleBoost(false);
        super._onFocusOut(p_evt);
    }

    _ToggleBoost(p_toggle){ 
        ui.dom.SAtt(this._inputField, `step`, this._step * (p_toggle ? 10 : 1)); 
    }

    _GrabValue() {
        let n = Number(this._inputField.value);
        return Number.isNaN(n) ? 0 : n;
    }

    _CleanUp() {
        this.hideArrow = false;
        super._CleanUp();
    }

}

module.exports = InputNumber;
ui.Register(`nkmjs-input-number`, InputNumber);