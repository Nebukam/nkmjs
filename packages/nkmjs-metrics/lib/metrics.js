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
    }

    InitializeAndStart(){

    }

}

module.exports = METRICS;