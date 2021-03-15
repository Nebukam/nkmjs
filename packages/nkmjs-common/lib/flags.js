'use strict';

/**
 * Wraps a list of common 'flags' semantic flags used through the framework.  
 * These are primarily used as css class name to drive feedbacks in components.
 * @class
 * @hideconstructor
 * @memberof common
 */
class FLAGS{
    constructor() {}

    /**
     * @description Semantic for anything related to general information.
     * @type {string}
     * @customtag read-only
     */
    static INFOS = `infos`;

    /**
     * @description Semantic for anything related to anything that should be important & emphasized to the used.
     * @type {string}
     * @customtag read-only
     */
    static WARNING = `warning`;

    /**
     * @description Semantic for anything related to an error, or dangerous behavior that often requires user action.
     * @type {string}
     * @customtag read-only
     */
    static ERROR = `error`;

    /**
     * @description Semantic for anything related to something being ready.
     * @type {string}
     * @customtag read-only
     */
    static READY = `ready`;

    /**
     * @description Semantic for anything related to something that has been changed, and is not yet saved.
     * @type {string}
     * @customtag read-only
     */
    static DIRTY = `dirty`;

    /**
     * @description Semantic for something that is loading and will lead to a noticeable outcome.  
     * Use `LOADING` when a progress can be communicated to the user, otherwise prefer `WAITING`.
     * @type {string}
     * @customtag read-only
     */
    static LOADING = `loading`;

    /**
     * @description Semantic for anything related to processing.  
     * This is an alternative state for `LOADING`, for cases where no noticeable outcome is expected.
     * @type {string}
     * @customtag read-only
     */
    static PROCESSING = `processing`;

    /**
     * @description Semantic for anything that requires the user to wait.  
     * This is an alternative state for `LOADING`, when no visible progress can be provided to the user.
     * @type {string}
     * @customtag read-only
     */
    static WAITING = `waiting`;

    /**
     * @description Semantic for anything related to something currently active.  
     * This is highly contextual.
     * @type {string}
     * @customtag read-only
     */
    static ACTIVE = `active`;

}

module.exports = FLAGS;