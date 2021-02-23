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
     * @customtag read-only
     */
    static RELEASING = Symbol(`releasing`);
    /**
     * @description Commonly used by disposable objects to signal they have been released.
     * @customtag read-only
     */
    static RELEASED = Symbol(`released`);

    /**
     * @description Commonly used by an object to signal it has been updated.
     * @customtag read-only
     */
    static UPDATED = Symbol(`updated`);
    
    /**
     * @description TODO
     * @customtag read-only
     */
    static RENAMING = Symbol(`renaming`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static RENAMED = Symbol(`renamed`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static STATE_CHANGING = Symbol(`stateChanging`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static STATE_CHANGED = Symbol(`stateChanged`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static STARTED = Symbol(`started`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static STOPPED = Symbol(`stopped`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static PROGRESS = Symbol(`progress`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static COMPLETE = Symbol(`complete`);

    /**
     * @description TODO
     * @customtag read-only
     */
    static FAIL = Symbol(`fail`);

    static CANCELED = Symbol(`canceled`);
    static READY = Symbol(`ready`);

    static TICK = Symbol(`tick`);

    static ITEM_ADDED = Symbol(`itemAdded`);
    static ITEM_REMOVED = Symbol(`itemRemoved`);
    static ITEM_UPDATED = Symbol(`itemUpdated`);

}

module.exports = SIGNAL;