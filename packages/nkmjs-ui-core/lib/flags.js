'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
module.exports = {

    // Generics

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    NONE: Object.freeze(`none`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    SELF: Object.freeze(`self`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    CONTEXT: Object.freeze(`context`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    INSIDE: Object.freeze(`inside`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    OUTSIDE: Object.freeze(`outside`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    VERTICAL: Object.freeze(`vertical`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    HORIZONTAL: Object.freeze(`horizontal`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Orientation
     */
    VERTICAL_AND_HORIZONTAL: Object.freeze(`vertical horizontal`),

    BOTH: Object.freeze(`both`),

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Orientation
     */
    orientations: [
        Object.freeze(`vertical`),
        Object.freeze(`horizontal`),
        Object.freeze(`vertical horizontal`)
    ],

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    EXPANDED: Object.freeze(`expanded`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    COLLAPSED: Object.freeze(`collapsed`),

    // Interactive states

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    DISABLED: Object.freeze(`disabled`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    IDLE: Object.freeze(`idle`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    FOCUSED: Object.freeze(`focused`),

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Interactivity
     */
    istates: [
        Object.freeze(`disabled`),
        Object.freeze(`idle`),
        Object.freeze(`focused`)
    ],


    // Interactive additive

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    ACTIVATED: Object.freeze(`activated`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    SELECTED: Object.freeze(`selected`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    TOGGLED: Object.freeze(`toggled`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Interactivity
     */
    TOGGLABLE: Object.freeze(`togglable`),

    // Placements

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    LEFT: Object.freeze(`left`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    RIGHT: Object.freeze(`right`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    TOP: Object.freeze(`top`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    BOTTOM: Object.freeze(`bottom`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    TOP_LEFT: Object.freeze(`top left`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    TOP_RIGHT: Object.freeze(`top right`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    BOTTOM_LEFT: Object.freeze(`bottom left`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Position
     */
    BOTTOM_RIGHT: Object.freeze(`bottom right`),

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
    placement: [ // Order do matter!
        Object.freeze(`top left`),
        Object.freeze(`left`),
        Object.freeze(`right`),
        Object.freeze(`top`),
        Object.freeze(`bottom`),
        Object.freeze(`top right`),
        Object.freeze(`bottom left`),
        Object.freeze(`bottom right`)
    ],

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
    placementSimplified: [
        Object.freeze(`left`),
        Object.freeze(`right`),
        Object.freeze(`top`),
        Object.freeze(`bottom`)
    ],

    /**
     * @description Returns the placement directly opposite to the one provided
     * @param {string} p_placement 
     * @param {boolean} [p_simplify] if set to true 
     * @param {boolean} [p_verticalFirst] if set to true 
     * @returns {string} Opposite placement
     * @group Position
     */
    Opposite: function (p_placement, p_simplify = true, p_verticalFirst = true) {
        if (p_simplify) { p_placement = module.exports.SimplifyPlacement(p_placement, p_verticalFirst); }
        switch (p_placement) {
            case module.exports.LEFT: return module.exports.RIGHT; break;
            case module.exports.RIGHT: return module.exports.LEFT; break;
            case module.exports.TOP: return module.exports.BOTTOM; break;
            case module.exports.BOTTOM: return module.exports.TOP; break;
            case module.exports.TOP_LEFT: return module.exports.BOTTOM_RIGHT; break;
            case module.exports.TOP_RIGHT: return module.exports.BOTTOM_LEFT; break;
            case module.exports.BOTTOM_LEFT: return module.exports.TOP_RIGHT; break;
            case module.exports.BOTTOM_RIGHT: return module.exports.TOP_LEFT; break;
            default: return null; break;
        }
    },

    /**
     * @description TODO
     * @param {string} p_placement
     * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
     * @group Position 
     */
    SimplifyPlacement: function (p_placement, p_verticalFirst = true) {
        switch (p_placement) {
            case module.exports.TOP_LEFT: return p_verticalFirst ? module.exports.TOP : module.exports.LEFT; break;
            case module.exports.TOP_RIGHT: return p_verticalFirst ? module.exports.TOP : module.exports.RIGHT; break;
            case module.exports.BOTTOM_LEFT: return p_verticalFirst ? module.exports.BOTTOM : module.exports.LEFT; break;
            case module.exports.BOTTOM_RIGHT: return p_verticalFirst ? module.exports.BOTTOM : module.exports.RIGHT; break;
        }
        return p_placement;
    },

    /**
     * @description Returns the orientation matching the placement
     * @param {string} p_placement 
     * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
     * Use `null` to get HORIZONTAL_AND_VERTICAL for corner placements.
     * @returns {string} Opposite placement
     * @group Position
     */
    Orientation: function (p_placement, p_verticalFirst = true) {
        switch (p_placement) {
            case module.exports.LEFT: return module.exports.HORIZONTAL; break;
            case module.exports.RIGHT: return module.exports.HORIZONTAL; break;
            case module.exports.TOP: return module.exports.VERTICAL; break;
            case module.exports.BOTTOM: return module.exports.VERTICAL; break;
            case module.exports.TOP_LEFT: return p_verticalFirst ? module.exports.VERTICAL : p_verticalFirst === null ? module.exports.HORIZONTAL : module.exports.VERTICAL_AND_HORIZONTAL; break;
            case module.exports.TOP_RIGHT: return p_verticalFirst ? module.exports.VERTICAL : p_verticalFirst === null ? module.exports.HORIZONTAL : module.exports.VERTICAL_AND_HORIZONTAL; break;
            case module.exports.BOTTOM_LEFT: return p_verticalFirst ? module.exports.VERTICAL : p_verticalFirst === null ? module.exports.HORIZONTAL : module.exports.VERTICAL_AND_HORIZONTAL; break;
            case module.exports.BOTTOM_RIGHT: return p_verticalFirst ? module.exports.VERTICAL : p_verticalFirst === null ? module.exports.HORIZONTAL : module.exports.VERTICAL_AND_HORIZONTAL; break;
        }
        return p_verticalFirst ? module.exports.VERTICAL : p_verticalFirst === null ? module.exports.HORIZONTAL : module.exports.VERTICAL_AND_HORIZONTAL;
    },

    // Misc

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    SHOWN: Object.freeze(`shown`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    NO_ICON: Object.freeze(`no-icon`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    NO_LABEL: Object.freeze(`no-label`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    NO_SCALE: Object.freeze(`no-scale`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    FIXED_SIZE: Object.freeze(`fixed-size`),

    // Sizes

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_XXS: Object.freeze(`size-xxs`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_XS: Object.freeze(`size-xs`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_S: Object.freeze(`size-s`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_M: Object.freeze(`size-m`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_L: Object.freeze(`size-l`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_XL: Object.freeze(`size-xl`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Sizes
     */
    SIZE_FILL: Object.freeze(`size-fill`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Sizes
    */
    SIZE_CUSTOM: Object.freeze(`size-custom`),

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Sizes
     */
    sizes: [
        Object.freeze(`size-xxs`),
        Object.freeze(`size-xs`),
        Object.freeze(`size-s`),
        Object.freeze(`size-m`),
        Object.freeze(`size-l`),
        Object.freeze(`size-xl`),
        Object.freeze(`size-fill`),
        Object.freeze(`size-custom`)
    ],


    /**
  * @description TODO
  * @type {string}
  * @customtag read-only
  * @group Sizing
  */
    INLINE: Object.freeze(`inline`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Sizing
    */
    STRETCH: Object.freeze(`stretch`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Sizing
    */
    STRETCH_SAME: Object.freeze(`stretch-same`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Sizing
    */
    STRETCH_SQUEEZE: Object.freeze(`stretch-squeeze`),

    /**
    * @description TODO
    * @type {array}
    * @customtag read-only
    * @group Sizing
    */
    stretches: [
        Object.freeze(`stretch`),
        Object.freeze(`stretch-same`),
        Object.freeze(`stretch-squeeze`)
    ],

    // Flavors

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Flavors
     * @groupdescription Flavors are mostly taken from {@link common.FLAGS}.
     */
    CTA: Object.freeze(`cta`),

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    flavors: [
        com.FLAGS.INFOS,
        com.FLAGS.WARNING,
        com.FLAGS.ERROR,
        Object.freeze(`cta`)
    ],

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Flavors
     */
    flavorsExtended: [
        com.FLAGS.INFOS,
        com.FLAGS.WARNING,
        com.FLAGS.ERROR,
        com.FLAGS.READY,
        com.FLAGS.DIRTY,
        com.FLAGS.LOADING,
        com.FLAGS.PROCESSING,
        com.FLAGS.WAITING,
        com.FLAGS.ACTIVE,
        Object.freeze(`cta`)
    ],

    // Variants

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    MINIMAL: Object.freeze(`minimal`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Variants
     */
    FRAME: Object.freeze(`frame`),

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     * @group Variants
     */
    variants: [
        Object.freeze(`minimal`),
        Object.freeze(`frame`)
    ],

    // Animation

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    A_START: Object.freeze(`start`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    A_END: Object.freeze(`end`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    A_ITERATION: Object.freeze(`iteration`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Animation
     */
    A_CANCEL: Object.freeze(`cancel`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Animation
    */
    A_ANY_END: Object.freeze(`any-end`),

    // Drag & Drop

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    DRAGGED: Object.freeze(`dragged`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    ALLOW_DROP: Object.freeze(`allow-drop`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Drag'n Drop
     */
    ALLOW_DROP_TOP: Object.freeze(`allow-drop-top`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    ALLOW_DROP_BOTTOM: Object.freeze(`allow-drop-bottom`),

    /**
   * @description TODO
   * @type {string}
   * @customtag read-only
   * @group Drag'n Drop
   */
    ALLOW_DROP_LEFT: Object.freeze(`allow-drop-left`),

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Drag'n Drop
    */
    ALLOW_DROP_RIGHT: Object.freeze(`allow-drop-right`),

    //

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Views
    */
    EMPTY: Object.freeze(`empty`),



}