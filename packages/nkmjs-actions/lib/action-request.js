'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof actions
 */
class ACTION_REQUEST {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static EXIT = 'exit';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static EDIT = 'edit';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static PREVIEW = 'preview';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static OPEN = 'open';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static CLOSE = 'close';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static CREATE = 'create';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SAVE = 'save';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DELETE = 'delete';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static RENAME = 'rename';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static APPLY = 'apply';

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DIALOG = 'dialog';

}

module.exports = ACTION_REQUEST;