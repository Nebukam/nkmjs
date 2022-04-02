'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
class IO_TYPE {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DEFAULT = `default`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
     static DOCUMENT = `document`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
     static FETCH = `fetch`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static REMOTE = `remote`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static LOCAL_STORAGE = `local-storage`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static FILE_SYSTEM = `file-system`;

}

module.exports = IO_TYPE;