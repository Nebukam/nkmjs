'use strict';

/**
 * Wraps a list of common string IDs used through the framework.  
 * This exists primarily to avoid typos in property names, and streamline
 * lookup for commonly used properties in certain part of the @nkmjs framework.
 * @class
 * @hideconstructor
 * @memberof documents
 */
const IDS = {};


/**
 * @type {string}
 * @customtag read-only
 */
IDS.TYPE_RSC = Object.freeze(`resource`);

/**
 * @type {string}
 * @customtag read-only
 */
IDS.ENCODING = Object.freeze(`encoding`);

/**
* @type {string}
* @customtag read-only
*/
IDS.SERIAL_CTX = Object.freeze(`serializationContext`);

/**
* @type {string}
* @customtag read-only
*/
IDS.TYPE_IO = Object.freeze(`defaultIOType`);

/**
* @type {string}
* @customtag read-only
*/
IDS.DATA_BOUND = Object.freeze(`dataBound`);

module.exports = IDS;