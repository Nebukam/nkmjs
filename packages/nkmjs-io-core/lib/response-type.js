'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
class RESPONSE_TYPE{
    constructor() {}

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static TEXT = 'text';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static ARRAYBUFFER = 'arraybuffer';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BLOB = 'blob';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DOCUMENT = 'document';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static JSON = 'json';

}

module.exports = RESPONSE_TYPE;
