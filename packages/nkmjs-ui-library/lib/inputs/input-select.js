'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");
const data = require("@nkmjs/data-core");
const collections = require("@nkmjs/collections");

const __slider = `slider`;
const _flag_noArrows = `no-arrows`;
var __uid = 0;

class InputSelect extends ui.inputs.InputCatalogBase {
    constructor() { super(); }

    static __inputProperties = {};

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/select.css`, `@/inputs/field.css`]
    }, ui.inputs.InputCatalogBase, ['css']);

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

        this._idMap = new collections.Dictionary();
        this._reverseIdMap = new collections.Dictionary();
        this._selectedOption = null;
    }

    _PostInit() {
        super._PostInit();
        this._inputField.addEventListener(`input`, this._onInput);
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `center`,
                'min-height': `28px !important` //min height for input field
            },
            '.field': {
                display: 'none',
                flex: `1 1 auto`,
                'min-width': 0,
                'height': 'var(--size)',
                'min-height': `28px !important` //min height for input field
                
            }
        }, super._Style());
    }

    _Render() {
        this._inputField = ui.dom.El(`select`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }


    _HandleItem(p_item) {
        // Implementation detail
        let control = null;

        if (this._useCatalogsAsGroup
            && u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            // Implementation detail, might prove trickier than it seems
            throw new Error(`not implemented`);
        } else if (u.isInstanceOf(p_item, data.catalogs.CatalogItem)) {
            let cid = `@${__uid++}`;
            control = ui.dom.El(`option`, { class: 'field-option', value: cid }, this._inputField);
            control.innerText = p_item.name;
            //TODO : Listen to renaming to update option
            this._idMap.Set(cid, p_item);
        }

        return control;
    }

    _CleanItem(p_item, p_control) {
        if (this._useCatalogsAsGroup
            && u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            // Cleanup group AND childrens
        }
        let cid = this._reverseIdMap.Get(p_item);
        this._idMap.Remove(cid);
        this._reverseIdMap.Remove(p_item);
    }

    _onInput(p_evt) {
        this._handler.changedValue = this._idMap.Get(p_evt.currentTarget.value);
    }

    _GrabValue() {
        return this._handler.changedValue;
    }

    _UpdatePreview() {
        //find which option should be selected
        let control = this._catalogHandler.Get(this._handler.inputValue);

        if(this._selectedOption){
            ui.dom.RAtt(this._selectedOption, `selected`);
            this._selectedOption = null;
        }

        if(control){
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