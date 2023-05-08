'use strict';

/**
 * This class contains the common, SIGNAL identifiers. They are semantic values, the _like_ of an enum
 * in other programming languages.
 * These values are primarily used by the broadcasting system or core nkmjs' objects; They are like
 * regular event's string value, only these are unique Symbols as opposed to mutable Strings.
 * <div class="tip warning" data-title="Important note"> The exact meaning & documentation of a signal is done on a per-class basis : each class is
 * responsible for its own implementation of a signal. A good example of that is the `{@link common.Observable}`'s doc.
 * </div>
 * @class
 * @hideconstructor
 * @memberof common
 */
module.exports = {

    /**
     * @description Commonly used by disposable objects to signal they are about to be released.
     * @type {symbol}
     * @customtag read-only
     * @group Pooling
     */
    RELEASING: Symbol(`releasing`),
    /**
     * @description Commonly used by disposable objects to signal they have been released.
     * @type {symbol}
     * @customtag read-only
     * @group Pooling
     */
    RELEASED: Symbol(`released`),

    /**
     * @description Commonly used by an object to signal it has been updated.
     * @type {symbol}
     * @customtag read-only
     * @group Updates
     */
    UPDATED: Symbol(`updated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Updates
     */
    RENAMING: Symbol(`renaming`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    RENAMED: Symbol(`renamed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    STATE_CHANGING: Symbol(`stateChanging`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    STATE_CHANGED: Symbol(`stateChanged`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    STARTED: Symbol(`started`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    STOPPED: Symbol(`stopped`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    PROGRESS: Symbol(`progress`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    COMPLETE: Symbol(`complete`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    FAIL: Symbol(`fail`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    CANCELED: Symbol(`canceled`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    READY: Symbol(`ready`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    TICK: Symbol(`tick`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    CONSUMED: Symbol(`consumed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    ITEM_ADDED: Symbol(`itemAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    ITEM_BUMPED: Symbol(`itemBumped`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    ITEM_REMOVED: Symbol(`itemRemoved`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    ITEM_MOVED: Symbol(`itemMoved`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    ITEM_UPDATED: Symbol(`itemUpdated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group ListItem Management
     */
    VALUE_CHANGED: Symbol(`valueChanged`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    SORTED: Symbol(`sorted`),

}