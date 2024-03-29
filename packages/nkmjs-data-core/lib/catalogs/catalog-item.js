'use strict';

const com = require("@nkmjs/common");

const IDS = require(`../ids`);
const SIGNAL = require(`./catalog-signal`);

const base = com.helpers.OptionsObject;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.OptionsObject
 * @memberof data.core.catalog
 */
class CatalogItem extends base {
    constructor() { super(); }

    static __distribute = base.__distribute.Ext({ wrapUpFn: `_OnOptionsUpdated` })
        .To(com.IDS.DATA)
        .To(IDS.BOUND)
        .To(`tags`, `tagsetter`);

    // ----> Init

    _Init() {

        super._Init();

        this._parent = null;
        this._rootCatalog = null;
        this._rootDistance = -1;
        this._autoRelease = true;
        this._isFirstUpdate = true;

        this._delayedUpdate = com.DelayedCall(this._Bind(this._OnUpdate));

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isDir() { return false; }

    /**
     * @access protected
     * @description TODO
     * @type {data.core.catalogs.Catalog}
     */
    get rootCatalog() { return this._rootCatalog; }
    set rootCatalog(p_value) { this._rootCatalog = p_value; }

    /**
     * @access protected
     * @description TODO
     * @type {number}
     */
    get rootDistance() { return this._rootDistance; }
    set rootDistance(p_value) { this._rootDistance = p_value; }

    /**
     * @description the item will be released as it is removed from its parent
     * without having been attached to another catalog
     * @type {boolean}
     */
    get autoRelease() { return this._autoRelease; }
    set autoRelease(p_value) { this._autoRelease = p_value; }

    /**
     * @description TODO
     * @type {data.core.catalogs.Catalog}
     */
    set parent(p_value) {
        
        if (this._parent === p_value) { return; }
        
        let oldValue = this._parent;
        this._parent = p_value;

        oldValue?.Remove(this);
        p_value?.Add(this);

    }
    get parent() { return this._parent; }

    /**
     * @access protected
     * @param {object} p_options 
     */
    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        if (p_options?.tags) {
            p_options.tags.length = 0;
            delete p_options.tags;
        }
        this._delayedUpdate.Schedule();
    }

    /**
     * @description TODO
     * @type {string}
     */
    get name() { return this._options[com.IDS.NAME]; }
    set name(p_value) { this.SetOption(com.IDS.NAME, p_value); }

    /**
     * @description TODO
     * @type {string}
     */
    get path() { return this._options[com.IDS.PATH]; }
    set path(p_value) { this.SetOption(com.IDS.PATH, p_value); }

    /**
     * @description TODO
     * @type {string}
     */
    get value() { return this._options[com.IDS.VALUE]; }
    set value(p_value) { this.SetOption(com.IDS.VALUE, p_value); }

    /**
     * @description TODO
     * @type {boolean}
     */
    get dataBound() { return this._options[IDS.BOUND] }
    set dataBound(p_value) { this.SetOption(IDS.BOUND, p_value); }

    /**
     * @description TODO
     * @type {core.data.DataBlock}
     */
    get data() { return this._options[com.IDS.DATA]; }
    set data(p_value) {
        let p_oldValue = this._options[com.IDS.DATA];
        this._options[com.IDS.DATA] = p_value;
        this._OnDataChanged(p_value, p_oldValue);
    }

    /**
     * @description TODO
     * @type {actions.Command}
     */
    get primaryCommand() { return this._options[com.IDS.CMD_PRIMARY]; }
    set primaryCommand(p_value) { this.SetOption(com.IDS.CMD_PRIMARY, p_value); }

    /**
     * @description TODO
     * @type {actions.Command}
     */
    get secondaryCommand() { return this._options[com.IDS.CMD_SECONDARY]; }
    set secondaryCommand(p_value) { this.SetOption(com.IDS.CMD_SECONDARY, p_value); }

    /**
     * @description TODO
     * @type {actions.Command}
     */
    get commandList() { return this._options[com.IDS.CMD_LIST]; }
    set commandList(p_value) { this.SetOption(com.IDS.CMD_LIST, p_value); }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_newData 
     * @param {*} p_oldData 
     */
    _OnDataChanged(p_newData, p_oldData) {

        if (p_oldData?.Unwatch) { p_oldData.Unwatch(com.SIGNAL.RELEASED, this._OnDataReleased, this); }
        if (p_newData?.Watch) { p_newData.Watch(com.SIGNAL.RELEASED, this._OnDataReleased, this); }

        this.Broadcast(SIGNAL.ITEM_DATA_CHANGED, this, p_newData, p_oldData);
        this._delayedUpdate.Schedule();
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataBlock} p_data 
     */
    _OnDataReleased(p_data) {
        this.Broadcast(SIGNAL.ITEM_DATA_RELEASED, this, p_data);
        if (this._options[IDS.BOUND]) { this.Release(); }
    }

    // ----> Commands

    /**
     * @description TODO
     * @param {data.core.Command} p_cmd 
     */
    AddCommand(p_cmd) {
        let cmdList = this.GetOrSetOption(com.IDS.CMD_LIST, [], false);
        if (cmdList.includes(p_cmd)) { return; }
        cmdList.push(p_cmd);
        this._delayedUpdate.Schedule();
    }

    _CleanUp() {

        if (this._parent) { this._parent.Remove(this); }

        this._autoRelease = true;
        this._parent = null;
        this._rootCatalog = null;
        this._rootDistance = -1;
        this._isFirstUpdate = true;

        this.data = null;

        super._CleanUp();

    }

    /**
     * @access protected
     * @description TODO
     */
    _OnUpdate() {
        if (this._isFirstUpdate) {
            // Ignore first update ?
            this._isFirstUpdate = false;
            return;
        }
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    toString() {
        return `${this._options[com.IDS.NAME]} (${this.constructor.name})`;
    }

}

module.exports = CatalogItem;