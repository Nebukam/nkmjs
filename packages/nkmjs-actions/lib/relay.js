/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);
const env = require(`@nkmjs/environment`);
const com = require("@nkmjs/common");

const _requests = new collections.List();

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof actions 
 */
class RELAY extends services.ServiceBase {

    constructor() { super(); }

    _InternalStart() {

        if (env.isExtension) {

            this._extIpc = new com.signals.SignalBox();
            env.runtime.onMessage.addListener(function (request, sender, response) {
                let signal = request.signal,
                    data = request;
                request.respond = response;
                this._extIpc.Broadcast(signal, data);
            });

        }

        super._InternalStart();

    }

    /**
     * @description TODO
     * @param {actions.Request} p_request 
     */
    HandleRequest(p_request) {
        u.LOG._(`⚡ ${p_request}`, 'color: #bebebe');
        _requests.Add(p_request);
        this.Broadcast(p_request.requestType, p_request);
        this._tick.Schedule();
    }

    _Tick(p_delta) {
        super._Tick(p_delta);

        //Clear requests stack
        let list = _requests;

        for (let i = 0; i < list.count; i++) {

            let release = true,
                request = list.At(i);

            if (!request.isHandled) {
                if (request.life >= request.timeout) {
                    //Unhandled request timeout
                    request.HandleFail(`timeout`);
                } else {
                    //Keep request alive
                    request.life += p_delta;
                    release = false;
                }
            }

            if (release) {
                request.Release();
                list.RemoveAt(i);
                i--;
            }
        }
    }

    /**
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    ipcOn(p_evt, p_fn) { this._ipcOn(p_evt, p_fn); }

    /**
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    ipcOff(p_evt, p_fn) { this._ipcOff(p_evt, p_fn); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    _ipcOn(p_evt, p_fn) {
        if (this._extIpc) { this._extIpc.Watch(p_evt, p_fn); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    _ipcOff(p_evt, p_fn) {
        if (this._extIpc) { this._extIpc.Unwatch(p_evt, p_fn); }
    }

    /**
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    ipcSend(p_evt, ...args) { this._ipcSend(p_evt, ...args); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    _ipcSend(p_evt, ...args) {
        if (env.isExtension) {
            // sendMessage to background extension, if any
            env.runtime.sendMessage(null, JSON.stringify({ signal: p_evt, args: args }));
        }
    }

    /**
     * @description TODO
     * @param {*} p_options 
     * @returns {Promise}
     */
    ShowOpenDialog(p_options, p_callback) {
        this.__openDialogCallback = p_callback;
        this._ShowOpenDialog(p_options, p_callback);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @returns {Promise}
     */
    _ShowOpenDialog(p_options) {
        return null;
    }

}

module.exports = new RELAY();