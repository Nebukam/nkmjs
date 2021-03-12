'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.StateBase
 * @memberof io.core
 */
class RESSOURCE_STATE extends com.helpers.StateBase {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get NONE() { return RESSOURCE_STATE.GetOrCreate(`none`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get READ_PENDING() { return RESSOURCE_STATE.GetOrCreate(`read-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get READING() { return RESSOURCE_STATE.GetOrCreate(`reading`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get WRITE_PENDING() { return RESSOURCE_STATE.GetOrCreate(`write-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get WRITING() { return RESSOURCE_STATE.GetOrCreate(`writing`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get RENAME_PENDING() { return RESSOURCE_STATE.GetOrCreate(`rename-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get RENAMING() { return RESSOURCE_STATE.GetOrCreate(`renaming`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get DELETE_PENDING() { return RESSOURCE_STATE.GetOrCreate(`delete-pending`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get DELETING() { return RESSOURCE_STATE.GetOrCreate(`deleting`); }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    static get READY() { return RESSOURCE_STATE.GetOrCreate(`ready`); }

}

module.exports = RESSOURCE_STATE;
