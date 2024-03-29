'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const data = nkm.data;

const SIGNAL = require(`./signal`);

/**
 * @class
 * @augments data.DataBlock
 * @memberof ecosystem
 */
class DataBlockExtendable extends data.DataBlock {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:data-block-extendable`,
        [com.IDS.ICON]: `data-block-extendable`
    };

    static __uriPrefix = ``;

    _Init() {
        super._Init();
        this._ecosystem = null;
        this._base = null;
        this._baseObserver = new com.signals.Observer();
        this._baseObserver.Hook(com.SIGNAL.UPDATED, this._OnBaseUpdated, this);
    }

    get ecosystem() { return this._ecosystem; }
    set ecosystem(p_value) { this._ecosystem = p_value; }

    get hasUnresolvedReferences() { return this._ecosystem.HasUnresolvedReferences(this); }

    get uri() { throw new Error(`not implemented`); }

    /**
     * @description TODO
     * @type {data.ecosystem.DataBlockExtendable}
     * @param {*} p_oldBase 
     */
    get base() { return this._base; }
    set base(p_value) {
        if (this._base === p_value) { return; }
        let oldBase = this._base;
        this._base = p_value;
        this._baseObserver.ObserveOnly(p_value);
        this._OnBaseChanged(oldBase);
        if (p_value) { this._OnBaseUpdated(this._base); }
        this.Broadcast(SIGNAL.BASE_CHANGED, this, oldBase);
    }

    /**
     * @access protected
     * @description Called whenever the base has changed.
     * @param {*} p_oldBase 
     * @customtag override-me
     */
    _OnBaseChanged(p_oldBase) {

    }

    /**
     * @access protected
     * @description Called whenever the base broadcasts an UPDATED signal, as well as when the base
     * has changed to a new non-null value.
     * @param {*} p_base
     * @customtag override-me
     */
    _OnBaseUpdated(p_base) {

    }

    // Inheritance

    /**
     * @description Checks whether or not the provided data is part of the inheritance
     * chain of this data block.
     * @param {*} p_data
     */
    Inherits(p_data) {

        if (this._base === p_data) { return true; }
        if (!p_data) { return false; }
        if (this === p_data) { return true; }

        if (!this._base) {
            return false;
        } else {
            return this._base.Inherits(p_data);
        }
    }

    /**
     * Return the inheritance chain for this data-block, in an array.
     * The first item in the array is the closest inherited block, and so on.
     * @param {*} p_includeSelf 
     * @param {*} p_chain 
     * @returns 
     * @customtag debug
     */
    GetInheritanceChain(p_includeSelf = false, p_chain = null) {

        if (!p_chain) { p_chain = []; }
        if (p_includeSelf) { p_chain.push(this); }

        let b = this._base;
        while (b) {
            p_chain.push(b);
            b = b.base;
        }
        return p_chain;

    }

    _CleanUp() {
        super._CleanUp();
        this.base = null;
        this.ecosystem = null;
    }

    toString() {
        //if (this._id) { return `${this.uri}`; }
        return super.toString();
    }

}

module.exports = DataBlockExtendable;
