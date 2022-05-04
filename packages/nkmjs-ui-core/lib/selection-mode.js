'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class SEL_MODE {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static NONE = 0;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static TOGGLE = 1;

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Generic
    */
    static RANGE = 2;


}

module.exports = SEL_MODE;