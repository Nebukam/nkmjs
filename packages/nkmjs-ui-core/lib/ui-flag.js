'use strict';

const com = require(`@nkmjs/common`); //{ COMMON_FLAG }

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class UI_FLAG {
    constructor() { }

    // Generics

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static NONE = `none`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static SELF = `self`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static INSIDE = `inside`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static OUTSIDE = `outside`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static VERTICAL = `vertical`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static HORIZONTAL = `horizontal`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static VERTICAL_AND_HORIZONTAL = `vertical horizontal`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Orientation
     */
    static orientations = [
        this.VERTICAL,
        this.HORIZONTAL,
        this.VERTICAL_AND_HORIZONTAL
    ]

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static EXPANDED = `expanded`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static COLLAPSED = `collapsed`;

    // Interactive states

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static DISABLED = `disabled`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static IDLE = `idle`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static FOCUSED = `focused`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Interactivity
     */
    static istates = [
        this.DISABLED,
        this.IDLE,
        this.FOCUSED
    ];


    // Interactive additive

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static ACTIVATED = `activated`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static SELECTED = `selected`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static TOGGLED = `toggled`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static DRAGGED = `dragged`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static ALLOW_DROP = `allow-drop`;

    // Placements

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static LEFT = `left`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static RIGHT = `right`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP = `top`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM = `bottom`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP_LEFT = `${this.TOP} ${this.LEFT}`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP_RIGHT = `${this.TOP} ${this.RIGHT}`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM_LEFT = `${this.BOTTOM} ${this.LEFT}`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM_RIGHT = `${this.BOTTOM} ${this.RIGHT}`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Position
     */
    static placement = [
        this.LEFT,
        this.RIGHT,
        this.TOP,
        this.BOTTOM,
        this.TOP_LEFT,
        this.TOP_RIGHT,
        this.BOTTOM_LEFT,
        this.BOTTOM_RIGHT
    ];

    // Misc

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_ICON = `no-icon`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_LABEL = `no-label`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_SCALE = `no-scale`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static FIXED_SIZE = `fixed-size`;

    // Sizes

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_XS = `size-xs`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_S = `size-s`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_M = `size-m`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_L = `size-l`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_XL = `size-xl`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Sizes
     */
    static sizes = [
        this.SIZE_XS,
        this.SIZE_S,
        this.SIZE_M,
        this.SIZE_L,
        this.SIZE_XL
    ];

    // Flavors

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Flavors
     * @groupdescription Flavors are mostly taken from {@link common.COMMON_FLAG}.
     */
    static CTA = `cta`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    static flavors = [
        com.COMMON_FLAG.INFOS,
        com.COMMON_FLAG.WARNING,
        com.COMMON_FLAG.ERROR,
        this.CTA
    ];

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    static flavorsExtended = [
        com.COMMON_FLAG.INFOS,
        com.COMMON_FLAG.WARNING,
        com.COMMON_FLAG.ERROR,
        com.COMMON_FLAG.READY,
        com.COMMON_FLAG.DIRTY,
        com.COMMON_FLAG.LOADING,
        com.COMMON_FLAG.PROCESSING,
        com.COMMON_FLAG.WAITING,
        com.COMMON_FLAG.active,
        this.CTA
    ];

    // Variants

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    static MINIMAL = `minimal`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    static FRAME = `frame`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Variants
     */
    static variants = [
        this.MINIMAL,
        this.FRAME
    ];


}

module.exports = UI_FLAG;