'use strict';

/**
 * @class
 * @hideconstructor
 * @memberof actions
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ACTIVATED: Symbol(`activated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DEACTIVATED: Symbol(`deactivated`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    ENABLED: Symbol(`enabled`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DISABLED: Symbol(`disabled`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ACTION_STATE_CHANGED: Symbol(`actionStateChanged`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    STACK_STATE_CHANGED: Symbol(`stackStateChanged`),

}