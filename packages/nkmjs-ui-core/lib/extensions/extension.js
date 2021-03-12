'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof ui.core.extensions
 */
class Extension extends com.pool.DisposableObjectEx {

    constructor() {
        super();
        this._isEnabled = false;
        this._childExtensions = null;
    }

    /**
     * @description TODO
     * @param {ui.core.extensions.ExtBase} p_ext 
     */
    Add(p_ext) {
        if (!this._childExtensions) { this._childExtensions = new Array(0); }
        if (this._childExtensions.includes(p_ext)) { return p_ext; }
        if(u.tils.isFunc(p_ext)){ p_ext = com.pool.POOL.Rent(p_ext); }
        this._childExtensions.push(p_ext);
        p_ext.enabled = this._isEnabled;
        return p_ext;
    }

    /**
     * @description TODO
     * @param {ui.core.extensions.ExtBase} p_ext 
     */
    Remove(p_ext) {
        if (!this._childExtensions || this._childExtensions.includes(p_ext)) { return null; }
        this._childExtensions.push(p_ext);
        p_ext.Disable();
        return p_ext;
    }
    

    // ----> Availability

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEnabled() { return this._isEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set enabled(p_value){
        if (p_value) { this.Enable(); }
        else { this.Disable(); }
    }

    /**
     * @description TODO
     */
    Enable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = true;
        if (this._childExtensions) {
            for (let i = 0, n = this._childExtensions.length; i < n; i++) {
                this._childExtensions[i].Enable();
            }
        }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!this._isEnabled) { return false; }
        this._isEnabled = false;
        if (this._childExtensions) {
            for (let i = 0, n = this._childExtensions.length; i < n; i++) {
                this._childExtensions[i].Disable();
            }
        }
        return true;
    }


    _CleanUp() {
        this.Disable();
        this._childExtensions.length = 0;
        this._childExtensions = null;
        super._CleanUp();
    }

}

module.exports = Extension;
