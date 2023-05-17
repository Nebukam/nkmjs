'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
const ENV_DISPLAY = {};

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Display mode
 */
ENV_DISPLAY.NONE = `none`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.DEFAULT = `browser`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.FULLSCREEN = `fullscreen`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.MINIMAL = `minimal-ui`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.STANDALONE = `standalone`;

/**
 * @description TODO
 * @type {array}
 * @customtag read-only
 */
ENV_DISPLAY.displayModes = [
    ENV_DISPLAY.DEFAULT,
    ENV_DISPLAY.FULLSCREEN,
    ENV_DISPLAY.MINIMAL,
    ENV_DISPLAY.STANDALONE
]

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Color schemes
 */
ENV_DISPLAY.COLORSCHEME_DARK = `dark`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.COLORSCHEME_LIGHT = `light`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES = `no-preferences`;

/**
 * @description TODO
 * @type {array}
 * @customtag read-only
 */
ENV_DISPLAY.colorSchemes = [
    ENV_DISPLAY.COLORSCHEME_DARK,
    ENV_DISPLAY.COLORSCHEME_LIGHT,
    ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES
];

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Display type
 */
ENV_DISPLAY.MOBILE = `mobile`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.TABLET = `tablet`;

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
ENV_DISPLAY.DESKTOP = `desktop`;

/**
 * @description TODO
 * @type {array}
 * @customtag read-only
 */
ENV_DISPLAY.displayTypes = [
    ENV_DISPLAY.DESKTOP,
    ENV_DISPLAY.TABLET,
    ENV_DISPLAY.MOBILE
];

/**
 * @description TODO
 * @type {array}
 * @customtag read-only
 */
ENV_DISPLAY.displayTypes_width = [
    1280,
    1024,
    760
];

module.exports = ENV_DISPLAY;