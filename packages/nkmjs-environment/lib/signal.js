'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static START = Symbol(`environment-start`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DOMSTATE_CHANGED = Symbol(`displaymode-changed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DISPLAY_MODE_CHANGED = Symbol(`color-scheme-changed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static COLOR_SCHEME_CHANGED = Symbol(`domstate-changed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DISPLAY_TYPE_CHANGED = Symbol(`device-changed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ONLINE = Symbol(`online`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static OFFLINE = Symbol(`offline`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
     static PWA_UPDATE_AVAILABLE = Symbol(`pwa-update-available`);

}

module.exports = SIGNAL;