'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof dialog
 */
class DIALOG_SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static CONSUMED = Symbol(`consumed`);

}

module.exports = DIALOG_SIGNAL;