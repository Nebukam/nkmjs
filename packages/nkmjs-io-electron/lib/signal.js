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
    static WATCH_STARTED = Symbol(`watchStarted`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static WATCH_ENDED = Symbol(`watchEnded`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static WATCH_ERROR = Symbol(`watchError`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static FILE_CHANGED = Symbol(`fileChange`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    static FILE_ADDED = Symbol(`fileAdd`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static FILE_DELETE = Symbol(`fileDelete`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
     static DIR_ADDED = Symbol(`dirAdd`);

     /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
     static DIR_DELETE = Symbol(`dirDelete`);
 
}

module.exports = SIGNAL;