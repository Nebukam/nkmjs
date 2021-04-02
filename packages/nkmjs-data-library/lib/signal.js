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
    static FIELD_ADDED = Symbol(`fieldAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static FIELD_REMOVED = Symbol(`fieldRemoved`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static FIELD_UPDATED = Symbol(`fieldUpdated`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static FIELD_RENAMED = Symbol(`fieldRenamed`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static FIELD_TYPE_CHANGED = Symbol(`fieldTypeChanged`);

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