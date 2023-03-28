'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Search
     */
    static SEARCH_TOGGLED = Symbol(`searchToggled`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Search
     */
    static SEARCH_COMPLETE = Symbol(`searchComplete`);

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Search
    */
    static SEARCH_PROGRESS = Symbol(`searchProgress`);

}

module.exports = SIGNAL;