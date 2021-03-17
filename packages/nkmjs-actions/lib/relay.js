/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);
const env = require(`@nkmjs/environment`);
const { signals } = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof actions 
 */
class RELAY extends services.ServiceBase {

    /**
     * @description TODO
     * @param {*} p_request 
     */
    static HandleRequest(p_request) {
        u.LOG._(`⚡ ${p_request}`, 'color: #bebebe');
        this.instance.HandleRequest(p_request);
    }

    /**
     * @description TODO
     * @param {*} p_evt 
     * @param  {...any} args 
     */
    static Broadcast(p_evt, ...args) {
        this.instance._Broadcast(p_evt, ...args);
    }

    constructor() { super(); }

    _Init() {
        super._Init();
        this._requests = new collections.List();
        if (env.ENV.FEATURES.isExtension) {
            this._extIpc = new signals.SignalBox();
            env.ENV.FEATURES.runtime.onMessage.addListener(function (request, sender, response) {
                let signal = request.signal,
                    data = request;
                request.respond = response;
                RELAY.instance._extIpc.Broadcast(signal, data);
            });
        }
    }

    /**
     * @description TODO
     * @param {actions.Request} p_request 
     */
    HandleRequest(p_request) {
        this._requests.Add(p_request);
        this._Broadcast(p_request.requestType, p_request);
        this._tick.Schedule();
    }

    _Tick(p_delta) {
        super._Tick(p_delta);

        //Clear requests stack
        let list = this._requests;

        for (let i = 0; i < list.count; i++) {

            let release = true,
                request = list.At(i);

            if (!request.handled) {
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
    static ipcOn(p_evt, p_fn) { this.instance._ipcOn(p_evt, p_fn); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    _ipcOn(p_evt, p_fn) { 
        if(this._extIpc){ this._extIpc.Watch(p_evt, p_fn); }
    }

    /**
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    static ipcSend(p_evt, ...args) { this.instance._ipcSend(p_evt, ...args); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_evt 
     * @param {function} p_fn 
     */
    _ipcSend(p_evt, ...args) {
        if (env.ENV.FEATURES.isExtension) {
            // sendMessage to background extension, if any
            env.ENV.FEATURES.runtime.sendMessage(null, JSON.stringify({ signal:p_evt, args:args }));
        }
    }

    /**
     * @description TODO
     * @param {*} p_options 
     * @returns {Promise}
     */
    static ShowOpenDialog(p_options) { return this.instance._ShowOpenDialog(p_options); }

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

module.exports = RELAY;