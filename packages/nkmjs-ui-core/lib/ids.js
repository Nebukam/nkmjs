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
    static STATIC = com.IDS.STATIC;

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
    static IMG = Object.freeze(`img`);

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Common
    */
    static FLAVOR = Object.freeze(`flavor`);

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Common
   */
    static VARIANT = Object.freeze(`variant`);

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Common
   */
     static SIZE = Object.freeze(`size`);

     /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Common
   */
     static ORDER = Object.freeze(`order`);

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
     * @group Common
     */
    static ITEM = Object.freeze(`item`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    static GROUP = Object.freeze(`group`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static LABEL = Object.freeze(`label`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static SUBTITLE = Object.freeze(`subtitle`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static HEADER = Object.freeze(`header`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static BODY = Object.freeze(`body`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static FOOTER = Object.freeze(`footer`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static VIEW = Object.freeze(`view`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static VIEW_CLASS = Object.freeze(`viewClass`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static CONTROLS = Object.freeze(`controls`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static CSS_CL = Object.freeze(`csscl`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    static TRIGGER = Object.freeze(`trigger`);

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Common
   */
     static CMD = Object.freeze(`command`);

}

module.exports = IDS;