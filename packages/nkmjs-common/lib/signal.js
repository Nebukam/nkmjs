'use strict';

/**
 * This class contains the common, SIGNAL identifiers. They are semantic values, the _like_ of an enum
 * in other programming languages.
 * These values are primarily used by the broadcasting system or core nkmjs' objects; They are like
 * regular event's string value, only these are unique Symbols as opposed to mutable Strings.
 * <div class="tip warning" data-title="Important note"> The exact meaning & documentation of a signal is done on a per-class basis = each class is
 * responsible for its own implementation of a signal. A good example of that is the `{@link common.Observable}`'s doc.
 * </div>
 * @class
 * @hideconstructor
 * @memberof common
 */
const SIGNAL = {};

/**
 * @description Commonly used by disposable objects to signal they are about to be released.
 * @type {symbol}
 * @customtag read-only
 * @group Pooling
 */
SIGNAL.RELEASING = Symbol(`releasing`);
/**
 * @description Commonly used by disposable objects to signal they have been released.
 * @type {symbol}
 * @customtag read-only
 * @group Pooling
 */
SIGNAL.RELEASED = Symbol(`released`);

/**
 * @description Commonly used by an object to signal it has been updated.
 * @type {symbol}
 * @customtag read-only
 * @group Updates
 */
SIGNAL.UPDATED = Symbol(`updated`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Updates
 */
SIGNAL.RENAMING = Symbol(`renaming`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.RENAMED = Symbol(`renamed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.STATE_CHANGING = Symbol(`stateChanging`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.STATE_CHANGED = Symbol(`stateChanged`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.STARTED = Symbol(`started`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.STOPPED = Symbol(`stopped`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.PROGRESS = Symbol(`progress`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.COMPLETE = Symbol(`complete`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.FAIL = Symbol(`fail`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.CANCELED = Symbol(`canceled`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.READY = Symbol(`ready`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.TICK = Symbol(`tick`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group Generic
 */
SIGNAL.CONSUMED = Symbol(`consumed`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.ITEM_ADDED = Symbol(`itemAdded`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.ITEM_BUMPED = Symbol(`itemBumped`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.ITEM_REMOVED = Symbol(`itemRemoved`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.ITEM_MOVED = Symbol(`itemMoved`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.ITEM_UPDATED = Symbol(`itemUpdated`);

/**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 * @group ListItem Management
 */
SIGNAL.VALUE_CHANGED = Symbol(`valueChanged`);

/**
* @description TODO
* @type {symbol}
* @customtag read-only
*/
SIGNAL.SORTED = Symbol(`sorted`);

module.exports = SIGNAL;