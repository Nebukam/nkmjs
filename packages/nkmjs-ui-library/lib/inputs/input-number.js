'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);

const __slider = `slider`;
const _flag_noArrows = `no-arrows`;

class InputNumber extends ui.inputs.InputNumberBase {
    constructor() { super(); }

    static __inputProperties = { type: `number` };

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/number.css`]
    }, ui.inputs.InputNumberBase, ['css']);

    _Init(){
        super._Init();
        this._flags.Add(this, _flag_noArrows);
    }

    set hideArrow(p_value){
        this._flags.Set(_flag_noArrows, p_value);
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'height': `var(--size)`,
                'display': 'flex',
                'flex-flow': 'row nowrap',
                'align-items': 'center'
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
        }, super._Style());
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