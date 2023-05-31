'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core.catalog
 */

const SIGNALS = {};

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ROOT_ITEM_ADDED = Symbol(`rootItemAdded`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ROOT_ITEM_REMOVED = Symbol(`rootItemRemoved`);


/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ITEM_DATA_CHANGED = Symbol(`dataItemAdded`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ITEM_DATA_RELEASED = Symbol(`dataItemRemoved`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNALS.ITEM_DATA_UPDATED = Symbol(`dataItemUpdated`);


module.exports = SIGNALS;
