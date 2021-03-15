'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class IDS {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     * @groupdescription These IDs collection are directly referencing the one found in {@link common.IDS}.
     * They are present in IDS for convenience.
     */
    static UID = com.IDS.UID;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static NAME = com.IDS.NAME;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static TITLE = com.IDS.TITLE;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static MESSAGE = com.IDS.MESSAGE;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static ICON = com.IDS.ICON;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static IMG = `img`;

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Common
    */
    static FLAVOR = `flavor`;

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Common
   */
    static VARIANT = `variant`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static PATH = com.IDS.PATH;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static DATA = com.IDS.DATA;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_PRIMARY = com.IDS.CMD_PRIMARY;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_SECONDARY = com.IDS.CMD_SECONDARY;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static CMD_LIST = com.IDS.CMD_LIST;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static OWNER = com.IDS.OWNER;

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

module.exports = IDS;