'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const dom = ui.dom;
const style = require(`@nkmjs/style`);

class InputSliderOnly extends ui.inputs.InputNumberBase {
    constructor() { super(); }

    static __inputProperties = { type: `range` };
    static __default_useMin = true;
    static __default_useMax = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/slider.css`]
    }, ui.inputs.InputNumberBase, ['css']);

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'height': `var(--size)`,
                'min-height': `var(--size)`,
                'display': 'flex',
                'flex-flow': 'row nowrap',
                'align-items': 'center',
                '--thumbSize': 'var(--size)',
                'min-width': 'calc(var(--size) * 2)'
            },
            '.slider-ctnr': {
                'position': 'relative',
                'flex': '1 1 auto',
                'height': 'var(--size)'
            },
            '.slider': {
                'cursor': 'pointer',
                'position': 'absolute',
                'width': `100%`,
                'height': `var(--size)`,
                'outline': 'none',
                'background-color': 'transparent'
            },
            '.slider-assets': {
                'position': 'absolute',
                'width': `calc(100% - var(--thumbSize))`,
                'height': `var(--size)`,
            },
            '.slider::-webkit-slider-thumb, .slider::-moz-range-thumb': {

            },
            '.slider, .slider::-webkit-slider-thumb, .slider::-webkit-slider-runnable-track': {
                '-webkit-appearance': `none`
            },
            '.slider::-moz-range-thumb, .slider::-moz-range-track, .slider::-moz-range-progress': {
                'appearance': `none`,
            }
        }, super._Style());
    }

    _Render() {

        let sliderCtnr = dom.El(`div`, { class: `slider-ctnr item` }, this._host);

        dom.El(`div`, { class: `slider-assets` }, sliderCtnr);
        this._inputField = dom.El(`input`, { class: 'slider', ...this.constructor.__inputProperties }, sliderCtnr);

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


    _CleanUp() {
        this.SetSliderData();
        super._CleanUp();
    }

}

module.exports = InputSliderOnly;
ui.Register(`nkmjs-input-slider-only`, InputSliderOnly);