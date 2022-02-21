//implement this : https://javascript.info/events-change-input

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");
const data = require("@nkmjs/data-core");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const INPUT = require(`../input`);
const KB = actions.KEYBOARD;

const InputBase = require(`./input-base`);

class InputCatalogBase extends InputBase {
    constructor() { super(); }

    static __inputProperties = {};

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/field.css`]
    }, InputBase, ['css']);

    _Init() {
        super._Init();

        this._catalogHandler = new data.catalogs.CatalogHandler();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);

        this._useCatalogsAsGroup = false;
        this._groupOptionId = null;

        this._Bind(this._onInput);
        this._Bind(this._onChange);

    }

    _PostInit() {
        super._PostInit();
        if (this._preventTabIndexing) { this.preventTabIndexing = true; }
    }

    set useCatalogsAsGroup(p_value){ this._useCatalogsAsGroup = p_value; }
    set groupOptionID(p_value){ this._groupOptionId = p_value; }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);
        if(`catalog` in p_options){ this.data = p_options.catalog; }
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
                'min-width': 0
            }
        }, super._Style());

    }

    _Render() {
        //this._inputField = dom.El(`input`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }

    set preventTabIndexing(p_value) {
        this._preventTabIndexing = p_value;
        // Implementation detail
        throw new Error(`not implemented`);
    }

    _PreProcessData(p_data) {
        if (u.isInstanceOf(p_data, data.catalogs.Catalog)) { return null; }
        return p_data;
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        console.log(this._data);
        this._catalogHandler.catalog = this._data;
    }

    _OnCatalogItemAdded(p_catalog, p_item) {
        let control = this._HandleItem(p_item);
        if (control) { this._catalogHandler.Set(p_item, control); }
    }

    _OnCatalogItemRemoved(p_catalog, p_item, p_control) {
        this._CleanItem(p_item, p_control);
        if (`Release` in p_control) { p_control.Release(); }
        else { dom.Detach(p_control); }
    }

    _HandleItem(p_item) {
        // Implementation detail
        return null;
    }

    _CleanItem(p_item, p_control) {
        // Implementation detail
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
        // Implementation detail
        throw new Error(`not implemented`);
    }

    _UpdatePreview() {
        // Implementation detail
        throw new Error(`not implemented`);
    }

}

module.exports = InputCatalogBase;