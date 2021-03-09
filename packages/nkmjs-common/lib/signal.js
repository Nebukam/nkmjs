'use strict';

/**
 * This class contains the common, static SIGNAL identifiers. They are semantic values, the _like_ of an enum
 * in other programming languages.
 * These values are primarily used by the broadcasting system or core nkmjs' objects; They are like
 * regular event's string value, only these are unique Symbols as opposed to mutable Strings.
 * <div class="tip warning" data-title="Important note"> The exact meaning & documentation of a signal is done on a per-class basis : each class is
 * responsible for its own implementation of a signal. A good example of that is the `{@link common.pool.DisposableObjectEx}`'s doc.
 * </div>
 * @class
 * @hideconstructor
 * @memberof common
 */
class SIGNAL{
    constructor() {}

    /**
     * @description Commonly used by disposable objects to signal they are about to be released.
     * @type {symbol}
     * @customtag read-only
     * @group Pooling
     */
    static RELEASING = Symbol(`releasing`);
    /**
     * @description Commonly used by disposable objects to signal they have been released.
     * @type {symbol}
     * @customtag read-only
     * @group Pooling
     */
    static RELEASED = Symbol(`released`);

    /**
     * @description Commonly used by an object to signal it has been updated.
     * @type {symbol}
     * @customtag read-only
     * @group Updates
     */
    static UPDATED = Symbol(`updated`);
    
    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Updates
     */
    static RENAMING = Symbol(`renaming`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static RENAMED = Symbol(`renamed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static STATE_CHANGING = Symbol(`stateChanging`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static STATE_CHANGED = Symbol(`stateChanged`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static STARTED = Symbol(`started`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static STOPPED = Symbol(`stopped`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static PROGRESS = Symbol(`progress`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static COMPLETE = Symbol(`complete`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static FAIL = Symbol(`fail`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static CANCELED = Symbol(`canceled`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static READY = Symbol(`ready`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
    static TICK = Symbol(`tick`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Generic
     */
     static CONSUMED = Symbol(`consumed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Item Management
     */
    static ITEM_ADDED = Symbol(`itemAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Item Management
     */
    static ITEM_REMOVED = Symbol(`itemRemoved`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Item Management
     */
    static ITEM_UPDATED = Symbol(`itemUpdated`);

}

module.exports = SIGNAL;