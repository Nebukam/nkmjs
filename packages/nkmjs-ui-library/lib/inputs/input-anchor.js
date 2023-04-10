//implement this : https://javascript.info/events-change-input

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.inputs.InputBase;

class InputAnchor extends base {
    constructor() { super(); }

    static TOP_LEFT = 0;
    static TOP = 1;
    static TOP_RIGHT = 2;
    static LEFT = 3;
    static CENTER = 4;
    static RIGHT = 5;
    static BOTTOM_LEFT = 6;
    static BOTTOM = 7;
    static BOTTOM_RIGHT = 8;

    static ANCHORS = [
        this.TOP_LEFT,
        this.TOP,
        this.TOP_RIGHT,
        this.LEFT,
        this.CENTER,
        this.RIGHT,
        this.BOTTOM_LEFT,
        this.BOTTOM,
        this.BOTTOM_RIGHT
    ];

    static __usePaintCallback = true;
    static __inputProperties = {};
    static __defaultScrollable = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/anchor.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`itemKey`, `_itemKey`, null)
        .To(`scrollable`)
        .Move(`currentValue`);

    _Init() {

        super._Init();

        this._Bind(this._onInput);
        this._Bind(this._onChange);
        this._val = null;

    }

    _PostInit() {
        super._PostInit();
        if (this._preventTabIndexing) { this.preventTabIndexing = true; }
        this.focusArea = this;
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                '@': [`fade-in`],
                position: `relative`,
                display: `flex`,
                'justify-content': `center`,
                'align-content': `center`,
            },
            '.grid': {
                position: 'relative',
                flex: `0 0 auto`,
                display: `grid`,
                'grid-template-columns': 'repeat(3, calc(var(--size) / 3))',
                'grid-template-rows': 'repeat(3, calc(var(--size) / 3))',
            },
            '.anch': {
                position: 'relative',
                flex: `1 1 auto`,
            }
        }, base._Style());

    }

    _Render() {

        this._slots = [];

        let
            aList = this.constructor.ANCHORS,
            ctnr = ui.El(`div`, { class: `grid` }, this._host);

        aList.forEach(element => {
            let slot = ui.El(`div`, { class: `anch` }, ctnr);
            slot.addEventListener(`click`, (p_evt) => { this._handler.changedValue = element; });
            this._slots.push(slot);
        });

    }

    _onInput(p_evt) {
        this._handler.inputValue = this._GrabValue();
        //TODO: Need to refactor handler in order to dissociate check methods from "change" event
        //so we can have checks on current input without overriding it if it doesn't pass validation.
    }

    _onChange(p_evt) {
        this._handler.changedValue = this._GrabValue();
    }

    _GrabValue() {
        return this._val;
    }

    _UpdatePreview() {
        // Get index of item in whatever has been provided ()
        let inputValue = this._handler.inputValue;
        this._val = null;
        this._slots.forEach((slot, i) => {
            if (inputValue == i) { this._val = i; }
            ui.dom.CSSClass(slot, `selected`, inputValue == i);
        });
    }

    _CleanUp() {
        this._val = null;
        super._CleanUp();
    }

}

module.exports = InputAnchor;