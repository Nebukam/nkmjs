'use strict';

const col = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof services
 */
class ServicesManager extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._services = [];
    }

    /**
     * @description TODO
     */
    Boot() {

    }

    /**
     * @description TODO
     * @param {services.ServiceBase} p_instance 
     */
    Register(p_instance) {
        this._services.Add(p_instance.constructor);
    }

}

module.exports = new ServicesManager();
