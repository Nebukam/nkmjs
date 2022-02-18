'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const SIGNAL = require(`../signal`);

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
        this._observer
            .Hook(SIGNAL.META_ADDED, this._OnMetaAdded, this)
            .Hook(SIGNAL.META_REMOVED, this._OnMetaRemoved, this)
            .Hook(SIGNAL.META_UPDATED, this._OnMetaUpdated, this)
            .Hook(SIGNAL.META_MID_UPDATE, this._OnMetaMidUpdate, this);
    }

    /**
     * @description TODO
     * @type {*}
     */
    set target(p_value) { this._observer.ObserveOnly(p_value); }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_evt 
     */
    _GetPrefix(p_evt) {
        switch (p_evt) {
            case SIGNAL.META_ADDED: return _add_;
            case SIGNAL.META_REMOVED: return _rem_;
            case SIGNAL.META_UPDATED: return _upd_;
            case SIGNAL.META_MID_UPDATE: return _mpd_;
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
        if (u.isArray(p_path)) { p_path = p_path.join('.'); }
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
        if (u.isArray(p_path)) { p_path = p_path.join('.'); }
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