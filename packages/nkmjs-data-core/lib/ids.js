'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
class IDS {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static AUTO_RELEASE = Object.freeze(`autoRelease`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BOUND = Object.freeze(`dataBound`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BLOCS = Object.freeze(`blocs`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SKIP_SERIALIZATION = Object.freeze(`skipSerialization`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static GROUP_OTHERS = Object.freeze(`group:others`);

}

module.exports = IDS;