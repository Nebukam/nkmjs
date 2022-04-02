'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
class CMD_TYPE {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SAVE = `save`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
     static LOAD = `load`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
     static RELEASE = `release`;

     /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
      static CREATE = `create`;

}

module.exports = CMD_TYPE;