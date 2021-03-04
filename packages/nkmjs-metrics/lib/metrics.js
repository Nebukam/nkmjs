/**
 * This is the core facade for all system and apps.
 */
'use strict';

const { LOG } = require(`@nkmjs/utils`);
const { List } = require(`@nkmjs/collections`);
const { ServiceBase } = require(`@nkmjs/services`);
const { ENV } = require(`@nkmjs/environment`);
const { SignalBox } = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof metrics 
 */
class METRICS extends ServiceBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._requests = new List();
        if (ENV.FEATURES.isExtension) {
            this._extIpc = new SignalBox();
            ENV.FEATURES.runtime.onMessage.addListener(function (request, sender, response) {
                let signal = request.signal,
                    data = request;
                request.respond = response;
                RELAY.instance._extIpc.Broadcast(signal, data);
            });
        }
    }

}

module.exports = METRICS;