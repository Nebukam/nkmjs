'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class ENV_DISPLAY {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Display mode
     */
    static NONE = `none`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DEFAULT = `browser`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static FULLSCREEN = `fullscreen`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static MINIMAL = `minimal-ui`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static STANDALONE = `standalone`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    static displayModes = [
        this.DEFAULT,
        this.FULLSCREEN,
        this.MINIMAL,
        this.STANDALONE
    ]

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Color schemes
     */
    static COLORSCHEME_DARK = `dark`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static COLORSCHEME_LIGHT = `light`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static COLORSCHEME_NO_PREFERENCES = `no-preferences`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    static colorSchemes = [
        this.COLORSCHEME_DARK,
        this.COLORSCHEME_LIGHT,
        this.COLORSCHEME_NO_PREFERENCES
    ];

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Display type
     */
    static MOBILE = `mobile`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static TABLET = `tablet`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DESKTOP = `desktop`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    static displayTypes = [
        this.DESKTOP,
        this.TABLET,
        this.MOBILE
    ];

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    static displayTypes_width = [
        1280,
        1024,
        760
    ];

}

module.exports = ENV_DISPLAY;