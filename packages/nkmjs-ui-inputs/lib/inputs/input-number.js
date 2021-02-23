'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS, COMMON_FLAG } = require(`@nkmjs/common`);
const { CSS } = require("@nkmjs/style");
const { UI } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

const __slider = `slider`;

class InputNumber extends InputField {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/inputs/number.css`]
    }, InputField, ['css']);

    _Init() {
        super._Init();
    }

    SetSliderData(m_min = 0, m_max = 0, m_step = null) {
        if (m_min != m_max) {
            if (!m_step) { m_step = (m_max - m_min) / 100; }
            this._inputField.setAttribute('type', `range`);
            this._inputField.setAttribute('min', m_min);
            this._inputField.setAttribute('max', m_max);
            this._inputField.setAttribute('step', m_step);
            this._flags.Set(__slider, true);
        } else {
            this._inputField.setAttribute('type', `number`);
            this._inputField.removeAttribute('min');
            this._inputField.removeAttribute('max');
            this._inputField.removeAttribute('step');
            this._flags.Set(__slider, false);
        }
    }

    // ----> DOM

    _Render() {
        this._inputField = UDOM.New(`input`, { class: 'field', type: 'number' }, this._host);
        this._flags.Add(this._inputField, __slider);
        //this.SetSliderData(0,1,0.01);
    }

    _GrabValue() {
        let n = Number(this._inputField.value);
        return Number.isNaN(n) ? 0 : n;
    }

    _CleanUp() {
        this.SetSliderData();
        super._CleanUp();
    }

}

module.exports = InputNumber;
UI.Register(`nkmjs-input-number`, InputNumber);