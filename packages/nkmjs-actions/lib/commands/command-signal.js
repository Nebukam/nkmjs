'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof actions
 */
class COMMAND_SIGNAL{
    constructor() {}

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static SUCCESS = Symbol(`success`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static FAIL = Symbol(`fail`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static CANCEL = Symbol(`cancel`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static START = Symbol(`start`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static END = Symbol(`end`);
    

}

module.exports = COMMAND_SIGNAL;