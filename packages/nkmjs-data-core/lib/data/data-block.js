'use strict';

const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);
const Metadata = require(`./metadata`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class DataBlock extends com.Observable {

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/data-core:data-block`,
        [com.IDS.ICON]: `data-block`
    };

    constructor() { super(); }

    _Init() {

        super._Init();
        this._id = null;
        this._isTemp = false;
        this._isDirty = false;

        this._metadata = new Metadata();
        this._metadata.owner = this;

        this._metadata
            .Watch(SIGNAL.DIRTY, this.Dirty, this)
            .Watch(SIGNAL.DIRTY_CLEARED, this._OnMetadataCleaned, this);

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
    Dirty() {
        if (this._isDirty) { return; }
        this._isDirty = true;
        this.Broadcast(SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty() {
        if (!this._isDirty) { return; } this._isDirty = false;
        this.Broadcast(SIGNAL.DIRTY_CLEARED, this);
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
        if (oldId) { oldId.Unwatch(com.SIGNAL.RENAMED, this.Dirty, this); }
        if (p_value) { p_value.Watch(com.SIGNAL.RENAMED, this.Dirty, this); }
    }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get name() { return this._id ? this._id.name : ``; }

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
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    _CleanUp() {

        if (this._id) {
            this._id.Release();
            this._id = null;
        }

        this._metadata._isDirty = false;
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