'use strict';

/**
 * Wraps a list of common string IDs used through the framework.  
 * This exists primarily to avoid typos in property names, and streamline
 * lookup for commonly used properties in certain part of the @nkmjs framework.
 * @class
 * @hideconstructor
 * @memberof common
 */
const IDS = {

    /**
     * @description String prefix used to register metadata bindings (see `{@link data.core.Metadata}`)
     * @type {string}
     * @customtag read-only
     * @order 1000
     */
    METAPREFIX: Object.freeze(`META@`),

    /**
     * @description A property often expected to be found in a constructor `{@link common.NFOS|NFO}`.  
     * It is looked-up by the `{@link common.helpers.BindingKit}` in order to use the right deserialization version when multiple one exists.
     * @type {string}
     * @customtag read-only
     * @order 1000
     */
    VER: Object.freeze(`ver`),

    /**
     * @description A property often expected to be found in a constructor `{@link common.NFOS|NFO}`.  
     * It is looked-up by the `{@link common.helpers.BindingKit}` in order to make a constructor globally available through a string identifier.
     * @type {string}
     * @customtag read-only
     * @order 1000
     */
    UID: Object.freeze(`uid`),

    /**
     * @type {string}
     * @customtag read-only
     */
    NAME: Object.freeze(`name`),

    /**
     * @type {string}
     * @customtag read-only
     */
    VALUE: Object.freeze(`value`),

    /**
     * @type {string}
     * @customtag read-only
     */
    TITLE: Object.freeze(`title`),

    /**
     * @type {string}
     * @customtag read-only
     */
    MESSAGE: Object.freeze(`message`),

    /**
     * @type {string}
     * @customtag read-only
     */
    ICON: Object.freeze(`icon`),

    /**
     * @type {string}
     * @customtag read-only
     */
    PATH: Object.freeze(`path`),

    /**
     * @type {string}
     * @customtag read-only
     */
    DATA: Object.freeze(`data`),

    /**
     * @type {string}
     * @customtag read-only
     */
    CMD_PRIMARY: Object.freeze(`primaryCommand`),

    /**
     * @type {string}
     * @customtag read-only
     */
    CMD_SECONDARY: Object.freeze(`secondaryCommand`),

    /**
     * @type {string}
     * @customtag read-only
     */
    CMD_LIST: Object.freeze(`commandList`),

    /**
     * @type {string}
     * @customtag read-only
     */
    OWNER: Object.freeze(`owner`),

    /**
     * @type {string}
     * @customtag read-only
     */
    STATIC: Object.freeze(`static`),

}

module.exports = IDS;