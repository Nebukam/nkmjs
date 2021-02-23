'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core.catalog
 */
class CATALOG_SIGNAL{
    constructor() {}

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ROOT_ITEM_ADDED = Symbol(`rootItemAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ROOT_ITEM_REMOVED = Symbol(`rootItemRemoved`);


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ITEM_DATA_CHANGED = Symbol(`dataItemAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ITEM_DATA_RELEASED = Symbol(`dataItemRemoved`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static ITEM_DATA_UPDATED = Symbol(`dataItemUpdated`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static SORTED = Symbol(`sorted`);

}

module.exports = CATALOG_SIGNAL;