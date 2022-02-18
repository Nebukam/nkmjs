'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class FLAGS {
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
    static VERTICAL_AND_HORIZONTAL = `${this.VERTICAL} ${this.HORIZONTAL}`;

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
    static TOGGLABLE = `togglable`;

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
     * @description Contains the following values :  
     * * {@link ui.core.UI_FLAG.LEFT}
     * * {@link ui.core.UI_FLAG.RIGHT}
     * * {@link ui.core.UI_FLAG.TOP}
     * * {@link ui.core.UI_FLAG.BOTTOM}
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

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Position
     */
    static placementSimplified = [
        this.LEFT,
        this.RIGHT,
        this.TOP,
        this.BOTTOM
    ];

    /**
     * @description Returns the placement directly opposite to the one provided
     * @param {string} p_placement 
     * @param {boolean} [p_simplify] if set to true 
     * @param {boolean} [p_verticalFirst] if set to true 
     * @returns {string} Opposite placement
     * @group Position
     */
    static Opposite(p_placement, p_simplify = true, p_verticalFirst = true) {
        if (p_simplify) { p_placement = this.SimplifyPlacement(p_placement, p_verticalFirst); }
        switch (p_placement) {
            case this.LEFT: return this.RIGHT; break;
            case this.RIGHT: return this.LEFT; break;
            case this.TOP: return this.BOTTOM; break;
            case this.BOTTOM: return this.TOP; break;
            case this.TOP_LEFT: return this.BOTTOM_RIGHT; break;
            case this.TOP_RIGHT: return this.BOTTOM_LEFT; break;
            case this.BOTTOM_LEFT: return this.TOP_RIGHT; break;
            case this.BOTTOM_RIGHT: return this.TOP_LEFT; break;
            default: return null; break;
        }
    }

    /**
     * @description TODO
     * @param {string} p_placement
     * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
     * @group Position 
     */
    static SimplifyPlacement(p_placement, p_verticalFirst = true) {
        switch (p_placement) {
            case this.TOP_LEFT: return p_verticalFirst ? this.TOP : this.LEFT; break;
            case this.TOP_RIGHT: return p_verticalFirst ? this.TOP : this.RIGHT; break;
            case this.BOTTOM_LEFT: return p_verticalFirst ? this.BOTTOM : this.LEFT; break;
            case this.BOTTOM_RIGHT: return p_verticalFirst ? this.BOTTOM : this.RIGHT; break;
        }
        return p_placement;
    }

    /**
     * @description Returns the orientation matching the placement
     * @param {string} p_placement 
     * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
     * Use `null` to get HORIZONTAL_AND_VERTICAL for corner placements.
     * @returns {string} Opposite placement
     * @group Position
     */
    static Orientation(p_placement, p_verticalFirst = true) {
        switch (p_placement) {
            case this.LEFT: return this.HORIZONTAL; break;
            case this.RIGHT: return this.HORIZONTAL; break;
            case this.TOP: return this.VERTICAL; break;
            case this.BOTTOM: return this.VERTICAL; break;
            case this.TOP_LEFT: return p_verticalFirst ? this.VERTICAL : p_verticalFirst === null ? this.HORIZONTAL : this.VERTICAL_AND_HORIZONTAL; break;
            case this.TOP_RIGHT: return p_verticalFirst ? this.VERTICAL : p_verticalFirst === null ? this.HORIZONTAL : this.VERTICAL_AND_HORIZONTAL; break;
            case this.BOTTOM_LEFT: return p_verticalFirst ? this.VERTICAL : p_verticalFirst === null ? this.HORIZONTAL : this.VERTICAL_AND_HORIZONTAL; break;
            case this.BOTTOM_RIGHT: return p_verticalFirst ? this.VERTICAL : p_verticalFirst === null ? this.HORIZONTAL : this.VERTICAL_AND_HORIZONTAL; break;
        }
        return p_verticalFirst ? this.VERTICAL : p_verticalFirst === null ? this.HORIZONTAL : this.VERTICAL_AND_HORIZONTAL;
    }

    // Misc

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SHOWN = `shown`;

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
    static SIZE_XXS = `size-xxs`;

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
        this.SIZE_XXS,
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
     * @groupdescription Flavors are mostly taken from {@link common.FLAGS}.
     */
    static CTA = `cta`;

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    static flavors = [
        com.FLAGS.INFOS,
        com.FLAGS.WARNING,
        com.FLAGS.ERROR,
        this.CTA
    ];

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    static flavorsExtended = [
        com.FLAGS.INFOS,
        com.FLAGS.WARNING,
        com.FLAGS.ERROR,
        com.FLAGS.READY,
        com.FLAGS.DIRTY,
        com.FLAGS.LOADING,
        com.FLAGS.PROCESSING,
        com.FLAGS.WAITING,
        com.FLAGS.active,
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

    // Animation

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_START = `start`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_END = `end`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_ITERATION = `iteration`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_CANCEL = `cancel`;

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Animation
    */
    static A_ANY_END = `any-end`;

    // Drag & Drop

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static DRAGGED = `dragged`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static ALLOW_DROP = `allow-drop`;

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static ALLOW_DROP_TOP = `allow-drop-top`;

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    static ALLOW_DROP_BOTTOM = `allow-drop-bottom`;

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Drag'n Drop
   */
    static ALLOW_DROP_LEFT = `allow-drop-left`;

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    static ALLOW_DROP_RIGHT = `allow-drop-right`;

    //

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Views
    */
    static EMPTY = `empty`;



}

module.exports = FLAGS;