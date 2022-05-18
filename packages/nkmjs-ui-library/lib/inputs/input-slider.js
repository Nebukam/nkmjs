'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const dom = ui.dom;
const style = require(`@nkmjs/style`);

const InputNumber = require(`./input-number`);
const InputSliderOnly = require(`./input-slider-only`);

const base = ui.inputs.InputNumberBase;

class InputSlider extends base {
    constructor() { super(); }

    static __inputProperties = { type: `range`, class: `slider` };
    static __default_useMin = true;
    static __default_useMax = true;
    static __default_useStep = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/slider.css`]
    }, base, ['css']);

    _Init() {
        super._Init();

        this._handler._managedUpdateInput = false;
        this._handler._managedUpdateChange = false;

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;

        this._updatePreviewWhenFocused = true;
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                'height': `var(--size)`,
                'display': 'flex',
                'flex-flow': 'row nowrap',
                'align-items': 'center',
                '--thumbSize':'calc(var(--size) * 0.5)',
                'min-width':'calc(var(--size) * 2)'
            },
            '.direct-field': {
                'flex': '0 0 50px',
                'margin-left': '4px'
            }
        }, InputSliderOnly._Style());
    }

    _Render() {

        let sliderCtnr = dom.El(`div`, { class: `slider-ctnr item` }, this._host);

        dom.El(`div`, { class: `slider-assets` }, sliderCtnr);
        this._inputField = dom.El(`input`, { class: 'field', ...this.constructor.__inputProperties }, sliderCtnr);

        this._directField = this.Attach(InputNumber, `direct-field item`, this._host);
        //directField._updatePreviewOnInput = false;

        this._sizeEnum.AddManaged(this._directField._sizeEnum);
        this._handler.AddManaged(this._directField._handler);
        this._directField.hideArrow = true;

        this.useMin = true;
        this.useMax = true;
        this.useStep = this.constructor.__default_useStep;
        
    }

    _GrabValue() {
        let n = Number(this._inputField.value);
        return Number.isNaN(n) ? 0 : n;
    }

    _UpdatePreview() {
        super._UpdatePreview();
        this.style.setProperty(`--fill`, `${u.tils.Map(this.inputValue, this._min, this._max, 0, 100)}%`);
    }

    _onFocusIn(p_evt) {
        super._onFocusIn(p_evt);
        this._handler._updatePreviewOnInput = true;
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = InputSlider;
ui.Register(`nkmjs-input-slider`, InputSlider);