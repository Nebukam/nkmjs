'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
class SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
     static BASE_CHANGED = Symbol(`baseChanged`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static SLOT_ADDED = Symbol(`slotAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static SLOT_REMOVED = Symbol(`slotRemoved`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static SLOT_UPDATED = Symbol(`slotUpdated`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static SLOT_RENAMED = Symbol(`slotRenamed`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static DESCRIPTOR_CHANGED = Symbol(`slotDescriptorChanged`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static REFERENCE_SOLVED = Symbol(`referenceSolved`);

    /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
    static DATA_REFERENCES_SOLVED = Symbol(`dataReferenceSolved`);

}

module.exports = SIGNAL;