'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core.catalog
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ROOT_ITEM_ADDED: Symbol(`rootItemAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ROOT_ITEM_REMOVED: Symbol(`rootItemRemoved`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ITEM_DATA_CHANGED: Symbol(`dataItemAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ITEM_DATA_RELEASED: Symbol(`dataItemRemoved`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    ITEM_DATA_UPDATED: Symbol(`dataItemUpdated`),

}
