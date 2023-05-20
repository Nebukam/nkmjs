'use strict';

/**
 * Wraps a list of common string IDs used through the framework.  
 * This exists primarily to avoid typos in property names, and streamline
 * lookup for commonly used properties in certain part of the @nkmjs framework.
 * @class
 * @hideconstructor
 * @memberof common
 */
const IDS = {};

/**
 * @description String prefix used to register metadata bindings (see `{@link data.core.Metadata}`)
 * @type {string}
 * @customtag read-only
 * @order 1000
 */
IDS.METAPREFIX = Object.freeze(`META@`);

/**
 * @description A property often expected to be found in a constructor `{@link common.NFOS|NFO}`.  
 * It is looked-up by the `{@link common.helpers.BindingKit}` in order to use the right deserialization version when multiple one exists.
 * @type {string}
 * @customtag read-only
 * @order 1000
 */
IDS.VER = Object.freeze(`ver`);

/**
 * @description A property often expected to be found in a constructor `{@link common.NFOS|NFO}`.  
 * It is looked-up by the `{@link common.helpers.BindingKit}` in order to make a constructor globally available through a string identifier.
 * @type {string}
 * @customtag read-only
 * @order 1000
 */
IDS.UID = Object.freeze(`uid`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.NAME = Object.freeze(`name`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.VALUE = Object.freeze(`value`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.TITLE = Object.freeze(`title`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.MESSAGE = Object.freeze(`message`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.ICON = Object.freeze(`icon`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.PATH = Object.freeze(`path`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.DATA = Object.freeze(`data`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.TYPE = Object.freeze(`type`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.CMD_PRIMARY = Object.freeze(`primaryCommand`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.CMD_SECONDARY = Object.freeze(`secondaryCommand`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.CMD_LIST = Object.freeze(`commandList`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.OWNER = Object.freeze(`owner`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.STATIC = Object.freeze(`static`);

module.exports = IDS;