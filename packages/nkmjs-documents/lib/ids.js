'use strict';

/**
 * Wraps a list of common string IDs used through the framework.  
 * This exists primarily to avoid typos in property names, and streamline
 * lookup for commonly used properties in certain part of the @nkmjs framework.
 * @class
 * @hideconstructor
 * @memberof documents
 */
class IDS {
    constructor() { }


    /**
     * @type {string}
     * @customtag read-only
     */
    static TYPE_RSC = `resource`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static ENCODING = `encoding`;

    /**
    * @type {string}
    * @customtag read-only
    */
    static SERIAL_CTX = `serializationContext`;

    /**
    * @type {string}
    * @customtag read-only
    */
    static TYPE_IO = `defaultIOType`;

    /**
    * @type {string}
    * @customtag read-only
    */
     static DATA_BOUND = `dataBound`;

}

module.exports = IDS;