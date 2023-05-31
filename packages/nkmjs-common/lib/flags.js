'use strict';

/**
 * Wraps a list of common 'flags' semantic flags used through the framework.  
 * These are primarily used as css class name to drive feedbacks in components.
 * @class
 * @hideconstructor
 * @memberof common
 */
const FLAGS = {};

/**
 * @description Semantic for anything related to general information.
 * @type {string}
 * @customtag read-only
 */
FLAGS.INFOS = Object.freeze(`infos`);

/**
 * @description Semantic for anything related to anything that should be important & emphasized to the used.
 * @type {string}
 * @customtag read-only
 */
FLAGS.WARNING = Object.freeze(`warning`);

/**
 * @description Semantic for anything related to an error, or dangerous behavior that often requires user action.
 * @type {string}
 * @customtag read-only
 */
FLAGS.ERROR = Object.freeze(`error`);

/**
 * @description Semantic for anything related to something being ready.
 * @type {string}
 * @customtag read-only
 */
FLAGS.READY = Object.freeze(`ready`);

/**
 * @description Semantic for anything related to something that has been changed, and is not yet saved.
 * @type {string}
 * @customtag read-only
 */
FLAGS.DIRTY = Object.freeze(`dirty`);

/**
 * @description Semantic for something that is loading and will lead to a noticeable outcome.  
 * Use `LOADING` when a progress can be communicated to the user, otherwise prefer `WAITING`.
 * @type {string}
 * @customtag read-only
 */
FLAGS.LOADING = Object.freeze(`loading`);

/**
 * @description Semantic for anything related to processing.  
 * This is an alternative state for `LOADING`, for cases where no noticeable outcome is expected.
 * @type {string}
 * @customtag read-only
 */
FLAGS.PROCESSING = Object.freeze(`processing`);

/**
 * @description Semantic for anything that requires the user to wait.  
 * This is an alternative state for `LOADING`, when no visible progress can be provided to the user.
 * @type {string}
 * @customtag read-only
 */
FLAGS.WAITING = Object.freeze(`waiting`);

/**
 * @description Semantic for anything related to something currently active.  
 * This is highly contextual.
 * @type {string}
 * @customtag read-only
 */
FLAGS.ACTIVE = Object.freeze(`active`);

/**
 * @description Semantic for anything related to general information.
 * @type {string}
 * @customtag read-only
 */
FLAGS.SELF = Object.freeze(`self`);

module.exports = FLAGS;