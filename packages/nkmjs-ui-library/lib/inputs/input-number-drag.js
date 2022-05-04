'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");

const InputNumber = require(`./input-number`);
const base = InputNumber;
const __slider = `slider`;
const _flag_noArrows = `no-arrows`;

class InputNumberDrag extends base {
    constructor() { super(); }

    static __distribute = base.__distribute.Ext()

    _Init() {
        super._Init();

        this._pointer
            .Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.DOWN, () => { return this._Pin(true); })
            .Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.UP, () => { return this._Pin(false); })
            .Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.RELEASE_OUTSIDE, () => { return this._Pin(false); });

        this._Bind(this._OnMove);
    }

    static _Style() {
        return style.Extends({
            ':host, .field': {
                'cursor': `ew-resize !important`,
            },
        }, base._Style());
    }

    _Pin(p_toggle) {

        this._pinned = p_toggle;
        if (this._pinned) {
            this._pinnedValue = this._handler.inputValue;
            document.addEventListener('mousemove', this._OnMove);
        } else {
            document.removeEventListener('mousemove', this._OnMove);
        }
        return true;
    }

    _OnMove(p_evt) {

        let
            pos = this._pointer._position,
            tdx = p_evt.clientX - pos.x,
            tdy = p_evt.clientY - pos.y,
            dx = tdx - pos.tdx,
            dy = tdy - pos.tdy;

        pos.dx = dx;
        pos.dy = dy;
        pos.tdx = tdx;
        pos.tdy = tdy;

        if (!this._pinned) { return false; }
        if (pos.tdx == 0) { return false; }

        let increase = this._step;
        if (ui.INPUT.shift) { increase *= 10; }
        let value = this._pinnedValue + increase * pos.tdx;

        if (this._useMin && value < this._min) { value = this._min; }
        if (this._useMax && value > this._max) { value = this._max; }

        this._handler.changedValue = value;
        this._handler.SubmitValue();

        return true;
    }

}

module.exports = InputNumberDrag;
ui.Register(`nkmjs-input-number-drag`, InputNumberDrag);