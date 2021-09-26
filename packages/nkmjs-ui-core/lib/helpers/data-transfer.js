'use strict';

/**
 * @description DataTransfer utils/helper methods
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class DataTransfer {

    constructor() { }

    // ----> Static processors

    static AsIcon(node, opts, customOpts) {
        node = new manipulators.Icon(node, u.tils.Get(opts, __hide, true));
        node.Set(customOpts);
        return node;
    }

}

module.exports = DataTransfer;