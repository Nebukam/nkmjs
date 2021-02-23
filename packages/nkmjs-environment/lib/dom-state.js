'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class DOM_STATE {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NONE = `none`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static LOADING = `loading`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static INTERACTIVE = `interactive`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static COMPLETE = `complete`;

}

module.exports = DOM_STATE;