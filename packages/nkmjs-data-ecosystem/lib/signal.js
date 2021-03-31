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

}

module.exports = SIGNAL;