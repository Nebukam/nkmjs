'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class FLAGS {
    constructor() { }


    // API Types

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group API Type
     */
    static GET = new Symbol(`get`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group API Type
     */
     static POST = new Symbol(`post`);


}

module.exports = FLAGS;