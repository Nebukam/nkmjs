'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");
const data = require("@nkmjs/data-core");
const col = require("@nkmjs/collections");

const __slider = `slider`;
const _flag_noArrows = `no-arrows`;
var __uid = 0;

const ButtonEx = require(`../buttons/button-ex`);
const InputSliderOnly = require(`./input-slider-only`);

const base = ui.inputs.InputCatalogBase;

class InputSelectSlider extends base {
    constructor() { super(); }

    static __inputProperties = {};
    static __defaultScrollable = false;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/slider.css`]
    }, ui.WidgetBar, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`showLabel`, null, false)
        .To(`showIcon`, null, true);

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

        this._selectedOption = null;

        this._showIcon = true;
        this._showLabel = false;

        this._Bind(this._onInput);
        this._Bind(this._onChange);
        this._Bind(this._onFocusIn);
        this._Bind(this._onFocusOut);

    }

    _PostInit() {
        super._PostInit();
        this._inputField.addEventListener('focus', this._onFocusIn);
        this._inputField.addEventListener('focusout', this._onFocusOut);
        this._inputField.addEventListener(`input`, this._onInput);
        this._inputField.addEventListener(`change`, this._onChange);
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {

            }
        }, InputSliderOnly._Style());
    }

    _Render() {

        let sliderCtnr = ui.dom.El(`div`, { class: `slider-ctnr item` }, this._host);

        ui.dom.El(`div`, { class: `slider-assets` }, sliderCtnr);
        this._inputField = ui.dom.El(`input`, { class: 'slider', type: 'range', min: 0, max: 10, step: 1 }, sliderCtnr);

    }

    //#region slider mngmt

    _onInput(p_evt) { this._handler.inputValue = this._GrabValue(); }

    _onChange(p_evt) { this._handler.changedValue = this._GrabValue(); }

    _onFocusIn(p_evt) {
        this._inFocus = true;
        ui.INPUT.focusedField = this;
    }

    _onFocusOut(p_evt) {
        this._inFocus = false;
        if (ui.INPUT.focusedField == this) { ui.INPUT.focusedField = null; }
        this._handler.SubmitValue();
    }

    //#endregion

    set showIcon(p_value) { this._showIcon = p_value; }
    set showLabel(p_value) { this._showLabel = p_value; }

    _OnDataChanged(p_oldData) {
        this._ignoreItemUpdates = true;
        super._OnDataChanged(p_oldData);
        this._ignoreItemUpdates = false;
        this._RefreshSlider();
        this._UpdatePreview();
    }

    _OnItemAdded(p_catalog, p_item) {
        if (this._ignoreItemUpdates) { return; }
        this._RefreshSlider();
        this._UpdatePreview();
    }

    _OnItemRemoved(p_catalog, p_item, p_control) {
        if (this._ignoreItemUpdates) { return; }
        this._RefreshSlider();
        this._UpdatePreview();
    }

    _GrabValue() {
        return this._KeyValue(this._data._items[this._inputField.value]);
    }

    _UpdatePreview() {

        if (!this._data) {
            this._inputField.value = 0;
            return;
        }

        this._inputField.value = this._data._items.indexOf(this.inputKeyItem);
        this._RefreshSlider();

    }

    _RefreshSlider() {

        if (!this._data) { return; }

        let
            items = this._data._items,
            max = items.length - 1,
            index = items.indexOf(this.inputKeyItem);

        this._inputField.setAttribute(`max`, max);

        ui.dom.CSS(this, '--fill', `${u.tils.Map(index, 0, max, 0, 100)}%`);
        
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = InputSelectSlider;
ui.Register(`nkmjs-input-select-slider`, InputSelectSlider);