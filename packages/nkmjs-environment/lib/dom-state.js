'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
const DOM_STATE = {

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    NONE: Object.freeze(`none`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    LOADING: Object.freeze(`loading`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    INTERACTIVE: Object.freeze(`interactive`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    COMPLETE: Object.freeze(`complete`),

}

module.exports = DOM_STATE;