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

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ACTION_STATE_CHANGED = Symbol(`actionStateChanged`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static STACK_STATE_CHANGED = Symbol(`stackStateChanged`);

}

module.exports = SIGNAL;