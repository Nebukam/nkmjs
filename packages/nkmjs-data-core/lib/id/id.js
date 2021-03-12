'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class ID extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Static methods

    /**
     * @description TODO
     * @param {data.core.ID} p_id 
     */
    static New(p_id){
        let newID = com.pool.POOL.Rent(ID);
        newID.name = p_id;
        return newID;
    }

    // ----> Init

    _Init() {
        super._Init();
        this._renamingPrevented = false;
        this._name = "";
    }

    /**
     * @description TODO
     */
    PreventRenaming() {
        this._renamingPrevented = true;
    }

    /**
     * @description TODO
     * @type {string}
     */
    set name(p_value) {

        if (this._name === p_value) { return; }

        this._Broadcast(com.SIGNAL.RENAMING, this, p_value);

        if (this._renamingPrevented) {
            this._renamingPrevented = false;
            return;
        }

        let oldName = this._name;
        this._name = p_value;

        this._renamingPrevented = false;

        this._Broadcast(com.SIGNAL.RENAMED, this, oldName);

    }
    get name() { return this._name; }

    // ---->

    _CleanUp() {
        this._name = "";
        super._CleanUp();
    }

    toString() {
        return `[ID::${this.name}]`;
    }

}

module.exports = ID;