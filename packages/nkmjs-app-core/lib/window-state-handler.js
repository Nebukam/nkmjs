'use strict';

const com = require(`@nkmjs/common`);
const ui = require(`@nkmjs/ui-core`);

const _signalPrefix = `paramValueChange_`;

class WindowStateHandler extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._currentParams = new URL(location).searchParams;

        window.onpopstate = this._Bind(this._OnWindowPopState);
        this.List();
    }

    _OnWindowPopState(p_evt) {
        console.log(`_OnWindowPopState`, p_evt);
        if (p_evt.state) {

        }
    }

    WatchParamChange(p_paramId, p_fn, p_listener) {
        this.Watch(`${_signalPrefix}${p_paramId}`, p_fn, p_listener);
    }

    UnwatchParamChange(p_paramId, p_fn, p_listener) {
        this.Unwatch(`${_signalPrefix}${p_paramId}`, p_fn, p_listener);
    }

    Get(p_id, p_fallback) {
        return this._currentParams.has(p_id) ? this._currentParams.get(p_id) : p_fallback;
    }

    Set(p_id, p_value) {
        let oldValue = this._currentParams.get(p_id);
        if (oldValue == p_value) { return; }
        this._currentParams.set(p_id, p_value);
        this.Broadcast(`${_signalPrefix}${p_id}`, p_value);
    }

    List() {
        let l = this._currentParams.keys();
        for (let k in l) { console.log(`URL@${k} = ${l[k]}`); }
    }

    Push(p_params, p_flush = false, p_silent = false) {

        let
            url = new URL(location),
            urlParams = url.searchParams,
            changed = {};

        if (p_flush) {

            let keys = urlParams.keys();

            for (let k in keys) {
                if (!(k in p_params)) {
                    keys.delete(k);
                    changed[k] = null;
                }
            }

        }

        for (let p in p_params) {

            let value = p_params[p];

            if (value === null) {
                urlParams.delete(p);
                changed[p] = null;
            } else {
                let prevValue = this._currentParams.has(p) ? this._currentParams.get(p) : null;
                urlParams.set(p, value);
                if (prevValue != value) { changed[p] = value; }
            }

        }

        history.pushState({}, "", url);
        this.params = urlParams;

        if (!p_silent && Object.keys(changed).length) {
            for (var c in changed) { this.Broadcast(`${_signalPrefix}${c}`, changed[c]); }
            this.Broadcast(com.SIGNAL.STATE_CHANGED, this, this._currentParams);
        }

    }

    Pop() {

    }

}

module.exports = new WindowStateHandler();