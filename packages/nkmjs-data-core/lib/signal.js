'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
class SIGNAL {
  constructor() { }

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static ITEM_REGISTERED = Symbol(`itemRegistered`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static ITEM_UNREGISTERED = Symbol(`itemUnregistered`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static ITEM_UPDATED = Symbol(`itemUpdated`);


  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static META_ADDED = Symbol(`metaAdded`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static META_REMOVED = Symbol(`metaRemoved`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static META_UPDATED = Symbol(`metaUpdated`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static META_MID_UPDATE = Symbol(`metaMidUpdate`);


  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static DIRTY = Symbol(`dirty`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static DIRTY_CLEARED = Symbol(`dirty-cleared`);


  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static VALUE_CHANGED = Symbol(`valueChanged`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static TAG_ADDED = Symbol(`tagAdded`);

  /**
  * @description TODO
  * @type {symbol}
  * @customtag read-only
  */
  static TAG_REMOVED = Symbol(`tagRemoved`);

  /**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
  static TAGS_CLEARED = Symbol(`tagsCleared`);

  /**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
  static USE_COUNT_CHANGED = Symbol(`useCountChanged`);

}

module.exports = SIGNAL;