'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const dom = ui.dom;
const style = require(`@nkmjs/style`);

const InputNumber = require(`./input-number`);

const base = ui.inputs.InputNumberBase;

class InputSliderOnly extends base {
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
                ...style.flex.row,
                ...style.flex.align.center.all,
                '--thumbSize':'calc(var(--size) * 0.5)',
                'min-width':'calc(var(--size) * 2)'
            },
            '.item': {
                'position': 'relative'
            },
            '.direct-field': {
                'flex': '0 0 50px',
                'margin-left': '4px'
            },
            '.slider-ctnr': {
                ...style.flexItem.fill,
                'height': 'var(--size)',
                'margin-left': 'calc(var(--thumbSize) * 0.5)',
                'margin-right': 'calc(var(--thumbSize) * 0.5)'
            },
            '.slider': {
                'cursor': 'pointer',
                'position': 'absolute',
                'width': `100%`,
                'height': `var(--size)`,
                'outline': 'none',
                'background-color': 'transparent',
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
        }, base._Style());
    }

    _Render() {

        let sliderCtnr = dom.El(`div`, { class: `slider-ctnr item` }, this._host);

        dom.El(`div`, { class: `slider-assets` }, sliderCtnr);
        this._inputField = dom.El(`input`, { class: 'field', ...this.constructor.__inputProperties }, sliderCtnr);

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
        ui.dom.CSS(this, '--fill', `${u.tils.Map(this.inputValue, this._min, this._max, 0, 100)}%`);
    }

    _onFocusIn(p_evt) {
        super._onFocusIn(p_evt);
        this._handler._updatePreviewOnInput = true;
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = InputSliderOnly;
ui.Register(`nkmjs-input-slider-only`, InputSliderOnly);