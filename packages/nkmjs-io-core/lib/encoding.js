'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
class ENCODING{
    constructor() {}

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static UTF8 = 'utf8';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static UCS2 = 'ucs2';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static UTF16le = 'utf16le';    

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static LATIN1 = 'latin1';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BINARY = 'binary';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BASE64 = 'base64';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static ASCII = 'ascii';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static HEX = 'hex';

}

module.exports = ENCODING;
