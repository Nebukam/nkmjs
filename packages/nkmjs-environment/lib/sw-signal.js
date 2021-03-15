'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class SW_SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Service Worker
     */
     static SW_MESSAGE = Symbol(`message`);

     /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Service Worker
     */
      static SW_REGISTERED = Symbol(`registered`);

      /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Service Worker
     */
       static SW_REGISTERED = Symbol(`installed`);

       /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Service Worker
     */
        static SW_REGISTRATION_ERROR = Symbol(`registration-fail`);

        static SW_READY =  Symbol(`ready`);

        static SW_UPDATE_AVAILABLE =  Symbol(`update-available`);
}

module.exports = SW_SIGNAL;