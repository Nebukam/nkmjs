'use strict';

/**
 * Wraps a list of common string IDs used through the framework.  
 * This exists primarily to avoid typos in property names, and streamline
 * lookup for commonly used properties in certain part of the @nkmjs framework.
 * @class
 * @hideconstructor
 * @memberof common
 */
class IDS {
    constructor() { }

    /**
     * @description String prefix used to register metadata bindings (see `{@link data.core.Metadata}`)
     * @type {string}
     * @customtag read-only
     * @order 1000
     */
    static METAPREFIX = `META@`;

    /**
     * @description A property often expected to be found in a class `{@link common.NFOS|NFO}`.  
     * It is looked-up by the `{@link common.helpers.BindingKit}` in order to make a class globally available through a string identifier.
     * @type {string}
     * @customtag read-only
     * @order 1000
     */
    static UID = `uid`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static NAME = `name`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static TITLE = `title`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static MESSAGE = `message`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static ICON = `icon`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static PATH = `path`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static DATA = `data`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static CMD_PRIMARY = `primaryCommand`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static CMD_SECONDARY = `secondaryCommand`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static CMD_LIST = `commandList`;

    /**
     * @type {string}
     * @customtag read-only
     */
    static OWNER = `owner`;

}

module.exports = IDS;