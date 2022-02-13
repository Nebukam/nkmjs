'use strict';

/**
 * @class
 * @hideconstructor
 * @memberof actions
 */
class SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ACTIVATED = Symbol(`activated`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DEACTIVATED = Symbol(`deactivated`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static ENABLED = Symbol(`enabled`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DISABLED = Symbol(`disabled`);

}

module.exports = SIGNAL;