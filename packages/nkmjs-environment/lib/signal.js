'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    START: Symbol(`environment-start`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DOMSTATE_CHANGED: Symbol(`displaymode-changed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DISPLAY_MODE_CHANGED: Symbol(`color-scheme-changed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    COLOR_SCHEME_CHANGED: Symbol(`domstate-changed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DISPLAY_TYPE_CHANGED: Symbol(`device-changed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ONLINE: Symbol(`online`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    OFFLINE: Symbol(`offline`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    PWA_UPDATE_AVAILABLE: Symbol(`pwa-update-available`),

}