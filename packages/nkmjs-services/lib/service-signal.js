'use strict';

const SERVICE_STATE = require(`./service-state`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof services
 */
class SERVICE_SIGNAL{
    constructor() {}

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get UNINITIALIZED(){ return SERVICE_STATE.UNINITIALIZED; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get INITIALIZING(){ return SERVICE_STATE.INITIALIZING; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get INITIALIZED(){ return SERVICE_STATE.INITIALIZED; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STARTING(){ return SERVICE_STATE.STARTING; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STARTED(){ return SERVICE_STATE.STARTED; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STOPPING(){ return SERVICE_STATE.STOPPING; }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STOPPED(){ return SERVICE_STATE.STOPPED; }

}

module.exports = SERVICE_SIGNAL;