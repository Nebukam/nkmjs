'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.StateBase
 * @memberof io.core
 */
class RESOURCE_STATE extends com.helpers.StateBase {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get NONE() { return RESOURCE_STATE.GetOrCreate(`none`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get READ_PENDING() { return RESOURCE_STATE.GetOrCreate(`read-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get READING() { return RESOURCE_STATE.GetOrCreate(`reading`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get WRITE_PENDING() { return RESOURCE_STATE.GetOrCreate(`write-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get WRITING() { return RESOURCE_STATE.GetOrCreate(`writing`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get RENAME_PENDING() { return RESOURCE_STATE.GetOrCreate(`rename-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get RENAMING() { return RESOURCE_STATE.GetOrCreate(`renaming`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get DELETE_PENDING() { return RESOURCE_STATE.GetOrCreate(`delete-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get DELETING() { return RESOURCE_STATE.GetOrCreate(`deleting`); }

    /**
     * @description TODO
     * @type {io.core.RESOURCE_STATE}
     * @customtag read-only
     */
    static get READY() { return RESOURCE_STATE.GetOrCreate(`ready`); }

}

module.exports = RESOURCE_STATE;
