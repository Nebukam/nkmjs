'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");
const data = require("@nkmjs/data-core");
const col = require("@nkmjs/collections");

const base = ui.inputs.InputCatalogBase;
const __slider = `slider`;
const _flag_noArrows = `no-arrows`;
var __uid = 0;

class InputSelect extends base {
    constructor() { super(); }

    static __inputProperties = {};

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/select.css`, `@/inputs/field.css`]
    }, base, ['css']);

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

        this._idMap = new Map();
        this._reverseIdMap = new Map();
        this._selectedOption = null;
    }

    _PostInit() {
        super._PostInit();
        this._inputField.addEventListener(`input`, this._onInput);
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.display.flex,
                'align-content': `stretch`,
                'align-items': `center`,
            },
            '.field': {
                ...style.rules.display.none,
                ...style.flexItem.fill,
                'height': 'var(--size)',
                'min-height': `28px !important` //min height for input field

            }
        }, base._Style());
    }

    _Render() {
        this._inputField = ui.dom.El(`select`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }


    _HandleItem(p_item) {
        // Implementation detail
        let control = null;

        if (this._useCatalogsAsGroup && p_item.isDir) {
            // Implementation detail, might prove trickier than it seems
            throw new Error(`not implemented`);
        } else {
            let cid = `@${__uid++}`;
            control = ui.dom.El(`option`, { class: 'field-option', value: cid }, this._inputField);
            control.innerText = p_item.name;
            //TODO : Listen to renaming to update option
            this._idMap.set(cid, p_item);
        }

        return control;
    }

    _CleanItem(p_item, p_control) {
        if (this._useCatalogsAsGroup && p_item.isDir) {
            // Cleanup group AND childrens
        }
        let cid = this._reverseIdMap.get(p_item);
        this._idMap.delete(cid);
        this._reverseIdMap.delete(p_item);
    }

    _onInput(p_evt) {
        this._handler.changedValue = this._KeyValue(this._idMap.get(p_evt.currentTarget.value));
    }

    _GrabValue() {
        return this._handler.changedValue;
    }

    _UpdatePreview() {
        //find which option should be selected
        let control = this._catalogHandler.Get(this.inputKeyItem);

        if (this._selectedOption) {
            ui.dom.RAtt(this._selectedOption, `selected`);
            this._selectedOption = null;
        }

        if (control) {
            ui.dom.SAtt(control, `selected`, `selected`);
            this._selectedOption = control;
        }

    }

    _CleanUp() {
        this.hideArrow = false;
        super._CleanUp();
    }

}

module.exports = InputSelect;
ui.Register(`nkmjs-input-select`, InputSelect);