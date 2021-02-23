/**
 * This is the core facade for all system and apps.
 */
'use strict';

const { LOG } = require(`@nkmjs/utils`);
const { List } = require(`@nkmjs/collections`);
const { ServiceBase } = require(`@nkmjs/services`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof actions 
 */
class RELAY extends ServiceBase {

    /**
     * @description TODO
     * @param {*} p_request 
     */
    static HandleRequest(p_request) {
        LOG._(`⚡ ${p_request}`, 'color: #bebebe');
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
        this._requests = new List();
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
    _ipcOn(p_evt, p_fn) { /* Placeholder */ }

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
    _ipcSend(p_evt, ...args) { /* Placeholder */ }

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