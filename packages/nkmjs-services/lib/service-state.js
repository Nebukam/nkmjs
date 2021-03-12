'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.StateBase
 * @memberof services
 */
class SERVICE_STATE extends com.helpers.StateBase {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get UNINITIALIZED() { return SERVICE_STATE.GetOrCreate(`uninitialized`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get INITIALIZING() { return SERVICE_STATE.GetOrCreate(`initializing`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get INITIALIZED() { return SERVICE_STATE.GetOrCreate(`initialized`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STARTING() { return SERVICE_STATE.GetOrCreate(`starting`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STARTED() { return SERVICE_STATE.GetOrCreate(`started`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STOPPING() { return SERVICE_STATE.GetOrCreate(`stopping`); }

    /**
     * @description TODO
     * @type {services.SERVICE_STATE}
     * @customtag read-only
     */
    static get STOPPED() { return SERVICE_STATE.GetOrCreate(`stopped`); }

}

module.exports = SERVICE_STATE;