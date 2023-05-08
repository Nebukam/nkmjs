'use strict';

const SERVICE_STATE = require(`./service-state`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof services
 */
module.exports = {

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get UNINITIALIZED() { return SERVICE_STATE.UNINITIALIZED; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get INITIALIZING() { return SERVICE_STATE.INITIALIZING; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get INITIALIZED() { return SERVICE_STATE.INITIALIZED; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get STARTING() { return SERVICE_STATE.STARTING; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get STARTED() { return SERVICE_STATE.STARTED; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get STOPPING() { return SERVICE_STATE.STOPPING; },

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    get STOPPED() { return SERVICE_STATE.STOPPED; },

}