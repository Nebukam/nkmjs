'use strict';

const com = require("@nkmjs/common"); //{ COM_ID }

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class UI_ID {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     * @groupdescription These IDs collection are directly referencing the one found in {@link common.COM_ID}.
     * They are present in UI_ID for convenience.
     */
    static UID = com.COM_ID.UID;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static NAME = com.COM_ID.NAME;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static TITLE = com.COM_ID.TITLE;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static MESSAGE = com.COM_ID.MESSAGE;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static ICON = com.COM_ID.ICON;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static PATH = com.COM_ID.PATH;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static DATA = com.COM_ID.DATA;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_PRIMARY = com.COM_ID.CMD_PRIMARY;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_SECONDARY = com.COM_ID.CMD_SECONDARY;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_LIST = com.COM_ID.CMD_LIST;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static OWNER = com.COM_ID.OWNER;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static LABEL = `label`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static SUBTITLE = `subtitle`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static HEADER = `header`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static BODY = `body`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static FOOTER = `footer`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static VIEW = `view`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static CONTROLS = `controls`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static CSS_CL = `csscl`;

}

module.exports = UI_ID;