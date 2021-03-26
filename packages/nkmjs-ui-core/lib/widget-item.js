'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const UI = require(`./ui`);
const POINTER = require("./pointer");
const FLAGS = require(`./flags`);
const extensions = require(`./extensions`);
const FlagEnum = require(`./helpers/flag-enum`);
const Widget = require(`./widget`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class WidgetItem extends Widget {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this._ExecuteCommand);

        this._dataObserver.Hook(data.catalogs.SIGNAL.ITEM_DATA_CHANGED, this._OnCatalogItemDataChanged, this);
        this._itemData = null;

        this._flavorEnum = new FlagEnum(FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._pointer.Hook(POINTER.MOUSE_LEFT, POINTER.RELEASE_TWICE, this._Bind(this.AltActivate));

        this._extDrag = this._extensions.Add(extensions.Drag);
        this._extDrag.grabDataCallback = this._Bind(this._GrabDragData);

        this._dragActivator = null;
        this._dragFeedbackHost = this;

        this._optionsHandler = new com.helpers.OptionsHandler();
        this._optionsHandler.Setup(this);

        this._optionsHandler.Hook(`flagOn`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], true) } });
        this._optionsHandler.Hook(`flagOff`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], false) } });
        this._optionsHandler.Hook(`flavor`);
        
    }

    _PostInit() {
        super._PostInit();
        this._extDrag.Setup(this, this._dragActivator, this._dragFeedbackHost);
        this._optionsHandler.Hook(`data`, `itemData`); // Make sure
    }

    _Wake() {
        super._Wake();
        this._extDrag.owner = this;
    }


    // ----> DOM

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set flavor(p_value) { this._flavorEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     */
    get flavor() { return this._flavorEnum.currentFlag; }

    // ----> DATA    

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        if (this._data) {

            let options = null;

            if (u.isInstanceOf(this._data, data.catalogs.CatalogItem)) { options = this._data.options; }
            else { options = this._data; }

            this._optionsHandler.Process(this, options);

            if (this._isFocused) { this._BuildCommandHandles(); }

        } else {
            this.itemData = null;
        }
    }

    _OnDataUpdated(p_data) {

        super._OnDataUpdated(p_data);

        let options = null;

        if (u.isInstanceOf(this._data, data.catalogs.CatalogItem)) { options = this._data.options; }
        else { options = this._data; }

        this._optionsHandler.Process(this, options);

    }

    _OnCatalogItemDataChanged(p_item, p_newData, p_oldData) {
        this.itemData = p_newData;
    }

    /**
     * @access protected
     * @description TODO
     * @param {common.signals.Observer} p_observer 
     */
    _HookItemDataSignals(p_observer, p_itemData) {
        p_observer.Hook(data.SIGNAL.DIRTY, this._OnItemDataDirty, this);
        p_observer.Hook(data.SIGNAL.DIRTY_CLEARED, this._OnItemDataCleaned, this);
        p_observer.Hook(com.SIGNAL.UPDATED, this._OnItemDataUpdated, this);

        if (p_itemData.isDirty) { this._OnItemDataDirty(p_itemData); }
        else { this._OnItemDataCleaned(p_itemData); }
    }

    get itemData() { return this._itemData; }

    /**
     * @description TODO
     * @type {*}
     */
    set itemData(p_value) {

        if (this._itemData === p_value) { return; }

        let oldData = this._itemData;
        this._itemData = p_value;

        if (oldData) { this._itemDataObserver.Flush(); }

        if (com.signals.isObservable(this._itemData)) {
            if (!this._itemDataObserver) {
                // Create observer
                this._itemDataObserver = com.Rent(com.signals.Observer);
                this._HookItemDataSignals(this._itemDataObserver, this._itemData);
            }
            this._itemDataObserver.ObserveOnly(this._itemData);

        } else {
            if (this._itemDataObserver) {
                this._itemDataObserver.Release();
                this._itemDataObserver = null;
            }
        }

        this._OnItemDataChanged(oldData);
        if (this._itemData) { this._OnItemDataUpdated(this._itemData); }

    }

    _OnItemDataChanged(p_oldItemData) {

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataDirty(p_data) { this._flavorEnum.Set(com.FLAGS.WARNING); }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataCleaned(p_data) { this._flavorEnum.Set(null); }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataUpdated(p_data) {
        if (p_data.isDirty) { this._OnItemDataDirty(p_data); }
        else { this._OnItemDataCleaned(p_data); }
    }

    // ---->

    /**
     * @access private
     */
    _GrabDragData() { return this._data; }

    _FocusGain() {
        super._FocusGain();
        if (!this._data) { return; }
        this._BuildCommandHandles();
        //TODO : Check if we're not drag and dropping something first.
        if (this._data.primaryCommand) { this._data.primaryCommand.context = this; }
        if (this._data.secondaryCommand) { this._data.secondaryCommand.context = this; }
    }

    _FocusLost() {
        super._FocusLost();
        if (!this._data) { return; }
        this._ClearCommandHandles();
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    AltActivate(p_evt) {
        if (this._data.primaryCommand) {
            this._data.primaryCommand.Execute();
            return false;
        }
        return true;
    }

    // ----> COMMANDS

    /**
     * @access protected
     * @description Create command handles in the toolbar
     * according to the content of `this._data.commandList`
     * @group Commands
     */
    _BuildCommandHandles() {

        this._ClearCommandHandles();
        if (!this._data) { return; }

        let list = this._data.commandList;

        if (!list) { return; }

        for (let i = 0, n = list.length; i < n; i++) {
            let cmd = list[i];
            cmd.context = this;
            this._BuildCommand(cmd);
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     * @customtag override-me
     * @group Commands
     */
    _BuildCommand(p_cmd) { }

    /**
     * @access protected
     * @description Clear any command handles created through `_BuildCommandHandles`
     * @customtag override-me
     * @group Commands
     */
    _ClearCommandHandles() { }

    /**
     * @access private
     * @description Callback for the command handles when triggered.
     * @param {actions.Command} p_cmd 
     * @group Commands
     */
    _ExecuteCommand(p_cmd) {
        p_cmd.emitter = this;
        p_cmd.Execute(this._data);
    }

}

module.exports = WidgetItem;
//UI.Register(`nkmjs-widget-item`, WidgetItem);