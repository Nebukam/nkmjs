'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { DATA_SIGNAL, CATALOG_SIGNAL, CatalogItem } = require(`@nkmjs/data-core`);

const MOUSE = require("./mouse");
const UI_FLAG = require(`./ui-flag`);
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
class CatalogWidget extends Widget {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this._ExecuteCommand);

        this._dataObserver.Hook(CATALOG_SIGNAL.ITEM_DATA_CHANGED, this._OnItemDataChanged, this);
        this._itemData = null;

        this._flavorEnum = new FlagEnum(UI_FLAG.flavors, true);
        this._flavorEnum.Add(this);

        this._interactions.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE_TWICE, this._Bind(this.AltActivate));

        this._extDrag = this._interactions.Add(extensions.Drag);
        this._extDrag.grabDataCallback = this._Bind(this._GrabDragData);

        this._dragActivator = null;
        this._dragFeedbackHost = this;

    }

    _PostInit() {
        super._PostInit();
        this._extDrag.Setup(this, this._dragActivator, this._dragFeedbackHost);
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
        this.itemData = this._ExtractItemData(this._data);
        if (this._data) { this._UpdateInfos(); }
        if (this._isFocused) { this._BuildCommandHandles(); }
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        if (!this._itemData) { this._UpdateInfos(); }
    }

    _OnItemDataChanged(p_item, p_newData, p_oldData) {
        this.itemData = this._ExtractItemData(p_newData);
    }

    /**
     * @access private
     * @param {*} p_value 
     */
    _ExtractItemData(p_value) {
        if (!p_value) { return null; }
        if (u.tils.isInstanceOf(p_value, CatalogItem)) { return p_value.GetOption(com.COM_ID.DATA, null); }
        return null;
    }

    /**
     * @access protected
     * @description TODO
     * @param {common.signals.Observer} p_observer 
     */
    _HookItemDataSignals(p_observer) {
        p_observer.Hook(DATA_SIGNAL.DIRTY, this._OnItemDataDirty, this);
        p_observer.Hook(DATA_SIGNAL.DIRTY_CLEARED, this._OnItemDataCleaned, this);
        p_observer.Hook(com.SIGNAL.UPDATED, this._OnItemDataUpdated, this);
    }

    /**
     * @description TODO
     * @type {*}
     */
    set itemData(p_value) {

        if (this._itemData === p_value) { return; }

        let oldData = this._itemData;
        this._itemData = p_value;

        if (oldData) { this._itemDataObserver.Flush(); }

        if (this._itemData) {
            if (!this._itemDataObserver) {
                // Create observer
                this._itemDataObserver = com.pool.POOL.Rent(com.signals.Observer);
                this._HookItemDataSignals(this._itemDataObserver);
            }
            this._itemDataObserver.ObserveOnly(this._itemData);
            this._OnItemDataUpdated(this._itemData);
        } else if (this._itemDataObserver) {
            this._itemDataObserver.Release();
            this._itemDataObserver = null;
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataDirty(p_data) { this._flavorEnum.Set(com.COMMON_FLAG.WARNING); }

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
    _OnItemDataUpdated(p_data) { this._UpdateInfos(); }

    // ----> Update infos

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _UpdateInfos() { }

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

module.exports = CatalogWidget;