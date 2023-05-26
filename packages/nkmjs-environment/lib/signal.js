'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
const SIGNALS = {};

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.START = Symbol(`environment-start`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.DOMSTATE_CHANGED = Symbol(`displaymode-changed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.DISPLAY_MODE_CHANGED = Symbol(`color-scheme-changed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.COLOR_SCHEME_CHANGED = Symbol(`domstate-changed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.DISPLAY_TYPE_CHANGED = Symbol(`device-changed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ONLINE = Symbol(`online`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.OFFLINE = Symbol(`offline`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.PWA_UPDATE_AVAILABLE = Symbol(`pwa-update-available`);

module.exports = SIGNALS;