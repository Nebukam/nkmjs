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

const base = InputBase;

class InputCatalogBase extends base {
    constructor() { super(); }

    static __usePaintCallback = true;
    static __inputProperties = {};
    static __defaultScrollable = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/field.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`itemKey`, `_itemKey`, null)
        .To(`catalog`, `data`)
        .To(`scrollable`)
        .Move(`currentValue`);

    _Init() {

        super._Init();

        this._catalogHandler = new data.catalogs.CatalogHandler();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this);

        this.forwardData.To(this._catalogHandler, { set: `catalog` });

        this._useCatalogsAsGroup = false;
        this._groupOptionId = null;
        this._scrollable = this.constructor.__defaultScrollable;

        this._Bind(this._onInput);
        this._Bind(this._onChange);
        this._Bind(this._OnWheel);

        this.scrollable = this.constructor.__defaultScrollable;

        this._itemKey = null;

    }

    _PostInit() {
        super._PostInit();
        if (this._preventTabIndexing) { this.preventTabIndexing = true; }
        this.focusArea = this;
    }

    set useCatalogsAsGroup(p_value) { this._useCatalogsAsGroup = p_value; }
    set groupOptionID(p_value) { this._groupOptionId = p_value; }

    set scrollable(p_value) {
        this._scrollable = p_value;
        this._pointer._wheelFn = p_value ? this._OnWheel : null;
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `center`,
                'min-height': `28px !important` //min height for input field
            },
            '.item': {
                flex: `1 1 auto`,
                'min-width': 0
            }
        }, base._Style());

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

    _OnItemAdded(p_catalog, p_item) {
        let control = this._HandleItem(p_item);
        if (control) { this._catalogHandler.Set(p_item, control); }
    }

    _OnItemRemoved(p_catalog, p_item, p_control) {
        this._CleanItem(p_item, p_control);
        if (p_control) {
            if (`Release` in p_control) { p_control.Release(); }
            else { dom.Detach(p_control); }
        }
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

    get inputKeyItem() {
        if (!this._data) { return null; }
        return this._itemKey ?
            data.catalogs.Find(this._data, (i) => { return i.GetOption(this._itemKey) == this._handler.inputValue; }) :
            this._handler.inputValue;
    }

    _KeyValue(p_item) {
        return this._itemKey ?
            p_item.GetOption(this._itemKey) :
            p_item;
    }

    _OnWheel(p_evt) {

        let
            increase = p_evt.deltaY < 0 ? -1 : 1,
            itemList = this._data._items,
            maxValue = itemList.length - 1,
            index = this._data._items.indexOf(this.inputKeyItem) + increase;

        if (index > maxValue) { index = maxValue; }
        if (index < 0) { index = 0; }

        this._handler.changedValue = this._KeyValue(itemList[index]);
        this._handler.SubmitValue();

        return true;

    }

    _UpdatePreview() {
        // Implementation detail
        throw new Error(`not implemented`);
    }

    _CleanUp() {
        this.scrollable = this.constructor.__defaultScrollable;
        super._CleanUp();
    }

}

module.exports = InputCatalogBase;