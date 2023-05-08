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
    WATCH_STARTED: Symbol(`watchStarted`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    WATCH_ENDED: Symbol(`watchEnded`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    WATCH_ERROR: Symbol(`watchError`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    FILE_CHANGED: Symbol(`fileChange`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    FILE_ADDED: Symbol(`fileAdd`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    FILE_DELETE: Symbol(`fileDelete`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DIR_ADDED: Symbol(`dirAdd`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    DIR_DELETE: Symbol(`dirDelete`),

}