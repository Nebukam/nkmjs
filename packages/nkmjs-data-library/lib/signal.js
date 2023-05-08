'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    BASE_CHANGED: Symbol(`baseChanged`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    SLOT_ADDED: Symbol(`slotAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    SLOT_REMOVED: Symbol(`slotRemoved`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    SLOT_UPDATED: Symbol(`slotUpdated`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    SLOT_RENAMED: Symbol(`slotRenamed`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    DESCRIPTOR_CHANGED: Symbol(`slotDescriptorChanged`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    REFERENCE_SOLVED: Symbol(`referenceSolved`),

    /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
    DATA_REFERENCES_SOLVED: Symbol(`dataReferenceSolved`),

}