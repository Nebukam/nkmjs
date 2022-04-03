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
     * @group Rendering
     */
    static CURRENT_VIEW_CHANGED = Symbol(`currentViewChanged`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
     static CURRENT_HANDLE_CHANGED = Symbol(`currentHandleChanged`);

}

module.exports = SIGNAL;