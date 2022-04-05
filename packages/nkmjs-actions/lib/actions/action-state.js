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

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Position
     */
     static stateList = [
        this.DONE,
        this.UNDONE
    ];

}

module.exports = ACTION_STATE;