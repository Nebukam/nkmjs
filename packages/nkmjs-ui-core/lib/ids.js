'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
const IDS = {

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     * @groupdescription These IDs collection are directly referencing the one found in {@link common.IDS}.
     * They are present in IDS for convenience.
     */
    UID: com.IDS.UID,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    STATIC: com.IDS.STATIC,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    NAME: com.IDS.NAME,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    TITLE: com.IDS.TITLE,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    MESSAGE: com.IDS.MESSAGE,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    ICON: com.IDS.ICON,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    IMG: Object.freeze(`img`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Common
    */
    FLAVOR: Object.freeze(`flavor`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    VARIANT: Object.freeze(`variant`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    SIZE: Object.freeze(`size`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    ORDER: Object.freeze(`order`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    PATH: com.IDS.PATH,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    DATA: com.IDS.DATA,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    CMD_PRIMARY: com.IDS.CMD_PRIMARY,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    CMD_SECONDARY: com.IDS.CMD_SECONDARY,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    CMD_LIST: com.IDS.CMD_LIST,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    OWNER: com.IDS.OWNER,

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    ITEM: Object.freeze(`item`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    GROUP: Object.freeze(`group`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    LABEL: Object.freeze(`label`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    SUBTITLE: Object.freeze(`subtitle`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    HEADER: Object.freeze(`header`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    BODY: Object.freeze(`body`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    FOOTER: Object.freeze(`footer`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    VIEW: Object.freeze(`view`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    VIEW_CLASS: Object.freeze(`viewClass`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    CONTROLS: Object.freeze(`controls`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    CSS_CL: Object.freeze(`csscl`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group elements
     */
    TRIGGER: Object.freeze(`trigger`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Common
     */
    CMD: Object.freeze(`command`),

}

module.exports = IDS;