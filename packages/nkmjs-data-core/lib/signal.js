'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
const SIGNAL = {};

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.ITEM_REGISTERED = Symbol(`itemRegistered`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.ITEM_UNREGISTERED = Symbol(`itemUnregistered`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.ITEM_UPDATED = Symbol(`itemUpdated`);


/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.META_ADDED = Symbol(`metaAdded`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.META_REMOVED = Symbol(`metaRemoved`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.META_UPDATED = Symbol(`metaUpdated`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.META_MID_UPDATE = Symbol(`metaMidUpdate`);


/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.DIRTY = Symbol(`dirty`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.DIRTY_CLEARED = Symbol(`dirty-cleared`);

//#region Tag

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.TAG_ADDED = Symbol(`tagAdded`);

/**
  * @description TODO
  * @type {symbol}
  * @customtag read-only
  */
SIGNAL.TAG_REMOVED = Symbol(`tagRemoved`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.TAGS_CLEARED = Symbol(`tagsCleared`);

//#endregion

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.USE_COUNT_CHANGED = Symbol(`useCountChanged`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.ACTIVE_EDITOR_LOST = Symbol(`activeEditorLost`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.ACTIVE_EDITOR_GAIN = Symbol(`activeEditorGain`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
SIGNAL.NO_ACTIVE_EDITOR = Symbol(`noActiveEditor`);

//#region Search

/**
* @description TODO
* @type {symbol}
* @customtag read-only
* @group Search
*/
SIGNAL.SEARCH_PARAMS_UPDATED = Symbol(`searchParamsUpdated`);

/**
  * @description TODO
  * @type {symbol}
  * @customtag read-only
  * @group Search
  */
SIGNAL.SEARCH_TOGGLED = Symbol(`searchToggled`);

/**
  * @description TODO
  * @type {symbol}
  * @customtag read-only
  * @group Search
  */
SIGNAL.SEARCH_STARTED = Symbol(`searchStarted`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Search
 */
SIGNAL.SEARCH_COMPLETE = Symbol(`searchComplete`);

/**
* @description TODO
* @type {symbol}
* @customtag read-only
* @group Search
*/
SIGNAL.SEARCH_PROGRESS = Symbol(`searchProgress`);

/**
* @description TODO
* @type {symbol}
* @customtag read-only
* @group Search
*/
SIGNAL.SEARCH_HEADER_CHANGED = Symbol(`searchHeaderChanged`);

/**
* @description TODO
* @type {symbol}
* @customtag read-only
* @group Search
*/
SIGNAL.SEARCH_HEADER_UPDATED = Symbol(`searchHeaderUpdated`);

//#endregion

module.exports = SIGNAL;