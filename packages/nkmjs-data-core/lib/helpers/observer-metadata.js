'use strict';

const DATA_SIGNAL = require(`../data-signal`);
const com = require("@nkmjs/common");

const _add_ = `ADD`;
const _rem_ = `REM`;
const _upd_ = `UPD`;
const _mpd_ = `IPD`;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core.helpers
 */
class MetadataObserver extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._observer = new com.signals.Observer();
        this._observer.Hook(DATA_SIGNAL.META_ADDED, this._OnMetaAdded, this);
        this._observer.Hook(DATA_SIGNAL.META_REMOVED, this._OnMetaRemoved, this);
        this._observer.Hook(DATA_SIGNAL.META_UPDATED, this._OnMetaUpdated, this);
        this._observer.Hook(DATA_SIGNAL.META_MID_UPDATE, this._OnMetaMidUpdate, this);
    }
    
    /**
     * @description TODO
     * @type {*}
     */
    get target() { return this._observer._target; }
    set target(p_value) { this._observer.target = p_value; }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_evt 
     */
    _GetPrefix(p_evt) {
        switch (p_evt) {
            case DATA_SIGNAL.META_ADDED: return _add_;
            case DATA_SIGNAL.META_REMOVED: return _rem_;
            case DATA_SIGNAL.META_UPDATED: return _upd_;
            case DATA_SIGNAL.META_MID_UPDATE: return _mpd_;
        }

        throw new Error(`Cannot hook to a signal that isn't META_ADDED, META_REMOVED or META_UPDATED`);
    }

    /**
     * @description TODO
     * @param {*} p_evt 
     * @param {string} p_path 
     * @param {function} p_fn 
     * @param {*} [p_subscriber] 
     */
    Hook(p_evt, p_path, p_fn, p_subscriber = null) {
        let evt = `${this._GetPrefix(p_evt)}@${p_path}`;
        this.Watch(evt, p_fn, p_subscriber);
    }

    /**
     * @description TODO
     * @param {*} p_evt 
     * @param {string} p_path 
     * @param {function} p_fn 
     * @param {*} [p_subscriber] 
     */
    Unhook(p_evt, p_path, p_fn, p_subscriber = null) {
        let evt = `${this._GetPrefix(p_evt)}@${p_path}`;
        this.Unwatch(evt, p_fn, p_subscriber);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_meta 
     * @param {*} p_path 
     * @param {*} p_value 
     */
    _OnMetaAdded(p_meta, p_path, p_value) {
        let evt = `${_add_}@${p_path}`;
        this._Broadcast(evt, p_meta, p_path, p_value);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_meta 
     * @param {*} p_path 
     */
    _OnMetaRemoved(p_meta, p_path) {
        let evt = `${_rem_}@${p_path}`;
        this._Broadcast(evt, p_meta, p_path, p_value, p_oldValue);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_meta 
     * @param {*} p_path 
     * @param {*} p_value 
     * @param {*} p_oldValue 
     */
    _OnMetaUpdated(p_meta, p_path, p_value, p_oldValue) {
        let evt = `${_upd_}@${p_path}`;
        this._Broadcast(evt, p_meta, p_path, p_value, p_oldValue);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_meta 
     * @param {*} p_path 
     */
    _OnMetaMidUpdate(p_meta, p_path) {
        let evt = `${_mpd_}@${p_path}`;
        this._Broadcast(evt, p_meta, p_path);
    }

    _CleanUp() {
        this.target = null;
        super._CleanUp();
    }

}

module.exports = MetadataObserver;