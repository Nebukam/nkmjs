'use strict';

const { COM_ID, SIGNAL, DisposableObjectEx } = require(`@nkmjs/common`);

const DATA_SIGNAL = require(`../data-signal`);
const Metadata = require(`./metadata`);
const ID = require(`../id/id`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class DataBlock extends DisposableObjectEx {
    
    static __NFO__ = {
        [COM_ID.ICON]: `%ICON%/icon_data_block.svg`,
        [COM_ID.UID]: `@nkmjs/data-core:data-block`
    };

    constructor() { super(); }

    _Init() {

        super._Init();
        this._id = null;
        this._isTemp = false;
        this._metadirty = false;
        this._isDirty = false;
        this._ecosystem = null;

        this._metadata = new Metadata();
        this._metadata.owner = this;

        this._metadata.Watch(DATA_SIGNAL.DIRTY, this.Dirty, this);
        this._metadata.Watch(DATA_SIGNAL.DIRTY_CLEARED, this._OnMetadataCleaned, this);

        this._ready = true;
        
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get ready() { return this._ready; }

    /**
     * @description TODO
     * @type {data.core.Metadata}
     * @customtag read-only
     */
    get metadata() { return this._metadata; }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get uri() { `${this._id.name}`; }

    /**
     * @description True if the DataBlock is dirty, otherwise false
     * @type {boolean} 
     * @customtag read-only
     */
    get isDirty() { return this._isDirty; }

    /**
     * @description TODO
     */
    Dirty(){
        if(this._isDirty){return;} this._isDirty = true;
        this._Broadcast(DATA_SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty(){
        if(!this._isDirty){return;} this._isDirty = false;
        this._Broadcast(DATA_SIGNAL.DIRTY_CLEARED, this);
    }

    /**
     * @description TODO
     * @type {data.core.ID}
     */
    get id() { return this._id; }
    set id(p_value) {
        if (this._id === p_value) { return; }
        let oldId = this._id;
        this._id = p_value;
        if (oldId) { oldId.Unwatch(SIGNAL.RENAMED, this.Dirty, this); }
        if (p_value) { p_value.Watch(SIGNAL.RENAMED, this.Dirty, this); }
    }
    
    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get name(){ return this._id ? this._id.name : ``; }
    
    /**
     * @description True if the DataBlock is meant to be a temporary one, otherwise false.
     * @type {boolean}
     * @customtag read-only
     */
    get isTemp() { return this._isTemp; }

    /**
     * @description Make this DataBlock dirty and broadcast an 'UPDATED' signal.
     */
    CommitUpdate() {
        this.Dirty();
        this._Broadcast(SIGNAL.UPDATED, this);
    }

    /**
     * @description Packs the object's data into a writable format. The result of Pack is what
     * is meant to be provided to Unpack().
     * @returns {object} packed DataObject
     */
    Pack() { 
        return { '!!!warning!!!':`you must re-implement the DataBlock.Pack() method in your data objects !` }
    }

    /**
     * @description Unpack data contained in the provided p_object. p_object should have
     * been created by the Pack() method.
     * @param {object} p_object packaged data
     */
    Unpack(p_object) { }

    _CleanUp() {

        if (this._id) {
            this._id.Release();
            this._id = null;
        }

        this._metadata._dirty = false;
        this._metadirty = false;
        this._isDirty = false;

        this._ready = true;
        this._isTemp = false;
        this._metadata.Clear();

        super._CleanUp();

    }    

    /**
     * @access protected
     * @description TODO
     */
    _OnMetadataCleaned() { }

    toString() {
        if (this._id) {
            return `[${this.constructor.name}::${this._id.name}]`;
        } else {
            return `[${this.constructor.name}::]`;
        }
    }

}

module.exports = DataBlock;