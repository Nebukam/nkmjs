'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

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
    static NONE  = Object.freeze(`none`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static SELF  = Object.freeze(`self`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static CONTEXT  = Object.freeze(`context`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static INSIDE  = Object.freeze(`inside`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static OUTSIDE  = Object.freeze(`outside`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static VERTICAL  = Object.freeze(`vertical`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static HORIZONTAL  = Object.freeze(`horizontal`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    static VERTICAL_AND_HORIZONTAL  = Object.freeze(`${this.VERTICAL} ${this.HORIZONTAL}`);

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
    static EXPANDED  = Object.freeze(`expanded`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static COLLAPSED  = Object.freeze(`collapsed`);

    // Interactive states

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static DISABLED  = Object.freeze(`disabled`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static IDLE  = Object.freeze(`idle`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static FOCUSED  = Object.freeze(`focused`);

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
    static ACTIVATED  = Object.freeze(`activated`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static SELECTED  = Object.freeze(`selected`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static TOGGLED  = Object.freeze(`toggled`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    static TOGGLABLE  = Object.freeze(`togglable`);

    // Placements

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static LEFT  = Object.freeze(`left`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static RIGHT  = Object.freeze(`right`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP  = Object.freeze(`top`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM  = Object.freeze(`bottom`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP_LEFT  = Object.freeze(`${this.TOP} ${this.LEFT}`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static TOP_RIGHT  = Object.freeze(`${this.TOP} ${this.RIGHT}`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM_LEFT  = Object.freeze(`${this.BOTTOM} ${this.LEFT}`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    static BOTTOM_RIGHT  = Object.freeze(`${this.BOTTOM} ${this.RIGHT}`);

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
    static placement = [ // Order do matter!
        this.TOP_LEFT,
        this.LEFT,
        this.RIGHT,
        this.TOP,
        this.BOTTOM,
        this.TOP_RIGHT,
        this.BOTTOM_LEFT,
        this.BOTTOM_RIGHT
    ];

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
    static SHOWN  = Object.freeze(`shown`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_ICON  = Object.freeze(`no-icon`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_LABEL  = Object.freeze(`no-label`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static NO_SCALE  = Object.freeze(`no-scale`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static FIXED_SIZE  = Object.freeze(`fixed-size`);

    // Sizes

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_XXS  = Object.freeze(`size-xxs`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_XS  = Object.freeze(`size-xs`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_S  = Object.freeze(`size-s`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_M  = Object.freeze(`size-m`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_L  = Object.freeze(`size-l`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    static SIZE_XL  = Object.freeze(`size-xl`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
     static SIZE_FILL  = Object.freeze(`size-fill`);

     /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
      static SIZE_CUSTOM  = Object.freeze(`size-custom`);

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
        this.SIZE_XL,
        this.SIZE_FILL,
        this.SIZE_CUSTOM
    ];

    // Flavors

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Flavors
     * @groupdescription Flavors are mostly taken from {@link common.FLAGS}.
     */
    static CTA  = Object.freeze(`cta`);

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
        com.FLAGS.ACTIVE,
        this.CTA
    ];

    // Variants

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    static MINIMAL  = Object.freeze(`minimal`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    static FRAME  = Object.freeze(`frame`);

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
    static A_START  = Object.freeze(`start`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_END  = Object.freeze(`end`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_ITERATION  = Object.freeze(`iteration`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    static A_CANCEL  = Object.freeze(`cancel`);

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Animation
    */
    static A_ANY_END  = Object.freeze(`any-end`);

    // Drag & Drop

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static DRAGGED  = Object.freeze(`dragged`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static ALLOW_DROP  = Object.freeze(`allow-drop`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    static ALLOW_DROP_TOP  = Object.freeze(`allow-drop-top`);

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    static ALLOW_DROP_BOTTOM  = Object.freeze(`allow-drop-bottom`);

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Drag'n Drop
   */
    static ALLOW_DROP_LEFT  = Object.freeze(`allow-drop-left`);

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    static ALLOW_DROP_RIGHT  = Object.freeze(`allow-drop-right`);

    //

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Views
    */
    static EMPTY  = Object.freeze(`empty`);



}

module.exports = FLAGS;