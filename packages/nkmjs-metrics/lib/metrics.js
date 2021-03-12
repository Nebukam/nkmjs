/**
 * This is the core facade for all system and apps.
 */
'use strict';

const { ServiceBase } = require(`@nkmjs/services`);

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