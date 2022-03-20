'use strict';

/**
 * @class
 * @hideconstructor
 * @memberof actions
 */
class ACTION_STATE {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DONE = `done`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
     static UNDONE = `undone`;

}

module.exports = ACTION_STATE;