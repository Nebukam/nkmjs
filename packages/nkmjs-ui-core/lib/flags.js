'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const FLAGS = {};
/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */


// Generics

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Generic
 */
FLAGS.NONE = Object.freeze(`none`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Generic
 */
FLAGS.SELF = Object.freeze(`self`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Generic
 */
FLAGS.CONTEXT = Object.freeze(`context`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Generic
 */
FLAGS.INSIDE = Object.freeze(`inside`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Generic
 */
FLAGS.OUTSIDE = Object.freeze(`outside`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Orientation
 */
FLAGS.VERTICAL = Object.freeze(`vertical`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Orientation
 */
FLAGS.HORIZONTAL = Object.freeze(`horizontal`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Orientation
 */
FLAGS.VERTICAL_AND_HORIZONTAL = Object.freeze(`vertical horizontal`);

FLAGS.BOTH = Object.freeze(`both`);

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Orientation
 */
FLAGS.orientations = [
    FLAGS.VERTICAL,
    FLAGS.HORIZONTAL,
    FLAGS.VERTICAL_AND_HORIZONTAL
];

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.EXPANDED = Object.freeze(`expanded`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.COLLAPSED = Object.freeze(`collapsed`);

// Interactive states

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.DISABLED = Object.freeze(`disabled`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.IDLE = Object.freeze(`idle`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.FOCUSED = Object.freeze(`focused`);

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.istates = [
    FLAGS.DISABLED,
    FLAGS.IDLE,
    FLAGS.FOCUSED
];


// Interactive additive

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.ACTIVATED = Object.freeze(`activated`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.SELECTED = Object.freeze(`selected`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.TOGGLED = Object.freeze(`toggled`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Interactivity
 */
FLAGS.TOGGLABLE = Object.freeze(`togglable`);

// Placements

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.LEFT = Object.freeze(`left`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.RIGHT = Object.freeze(`right`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.TOP = Object.freeze(`top`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.BOTTOM = Object.freeze(`bottom`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.TOP_LEFT = Object.freeze(`top left`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.TOP_RIGHT = Object.freeze(`top right`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.BOTTOM_LEFT = Object.freeze(`bottom left`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Position
 */
FLAGS.BOTTOM_RIGHT = Object.freeze(`bottom right`);

/**
 * @description Contains the following values = 
 * * {@link ui.core.UI_FLAG.LEFT}
 * * {@link ui.core.UI_FLAG.RIGHT}
 * * {@link ui.core.UI_FLAG.TOP}
 * * {@link ui.core.UI_FLAG.BOTTOM}
 * @type {Array}
 * @customtag read-only
 * @group Position
 */
FLAGS.placement = [ // Order do matter!
    FLAGS.TOP_LEFT,
    FLAGS.LEFT,
    FLAGS.RIGHT,
    FLAGS.TOP,
    FLAGS.BOTTOM,
    FLAGS.TOP_RIGHT,
    FLAGS.BOTTOM_LEFT,
    FLAGS.BOTTOM_RIGHT
];

/**
 * @description Contains the following values = 
 * * {@link ui.core.UI_FLAG.LEFT}
 * * {@link ui.core.UI_FLAG.RIGHT}
 * * {@link ui.core.UI_FLAG.TOP}
 * * {@link ui.core.UI_FLAG.BOTTOM}
 * @type {Array}
 * @customtag read-only
 * @group Position
 */
FLAGS.placementSimplified = [
    FLAGS.LEFT,
    FLAGS.RIGHT,
    FLAGS.TOP,
    FLAGS.BOTTOM
];

/**
 * @description Returns the placement directly opposite to the one provided
 * @param {string} p_placement 
 * @param {boolean} [p_simplify] if set to true 
 * @param {boolean} [p_verticalFirst] if set to true 
 * @returns {string} Opposite placement
 * @group Position
 */
FLAGS.Opposite = function (p_placement, p_simplify = true, p_verticalFirst = true) {
    if (p_simplify) { p_placement = FLAGS.SimplifyPlacement(p_placement, p_verticalFirst); }
    switch (p_placement) {
        case FLAGS.LEFT: return FLAGS.RIGHT; break;
        case FLAGS.RIGHT: return FLAGS.LEFT; break;
        case FLAGS.TOP: return FLAGS.BOTTOM; break;
        case FLAGS.BOTTOM: return FLAGS.TOP; break;
        case FLAGS.TOP_LEFT: return FLAGS.BOTTOM_RIGHT; break;
        case FLAGS.TOP_RIGHT: return FLAGS.BOTTOM_LEFT; break;
        case FLAGS.BOTTOM_LEFT: return FLAGS.TOP_RIGHT; break;
        case FLAGS.BOTTOM_RIGHT: return FLAGS.TOP_LEFT; break;
        default: return null; break;
    }
};

/**
 * @description TODO
 * @param {string} p_placement
 * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
 * @group Position 
 */
FLAGS.SimplifyPlacement = function (p_placement, p_verticalFirst = true) {
    switch (p_placement) {
        case FLAGS.TOP_LEFT: return p_verticalFirst ? FLAGS.TOP : FLAGS.LEFT; break;
        case FLAGS.TOP_RIGHT: return p_verticalFirst ? FLAGS.TOP : FLAGS.RIGHT; break;
        case FLAGS.BOTTOM_LEFT: return p_verticalFirst ? FLAGS.BOTTOM : FLAGS.LEFT; break;
        case FLAGS.BOTTOM_RIGHT: return p_verticalFirst ? FLAGS.BOTTOM : FLAGS.RIGHT; break;
    }
    return p_placement;
};

/**
 * @description Returns the orientation matching the placement
 * @param {string} p_placement 
 * @param {boolean} [p_verticalFirst] If true, uses top/down value for corner placement, otherwise left/right.
 * Use `null` to get HORIZONTAL_AND_VERTICAL for corner placements.
 * @returns {string} Opposite placement
 * @group Position
 */
FLAGS.Orientation = function (p_placement, p_verticalFirst = true) {
    switch (p_placement) {
        case FLAGS.LEFT: return FLAGS.HORIZONTAL; break;
        case FLAGS.RIGHT: return FLAGS.HORIZONTAL; break;
        case FLAGS.TOP: return FLAGS.VERTICAL; break;
        case FLAGS.BOTTOM: return FLAGS.VERTICAL; break;
        case FLAGS.TOP_LEFT: return p_verticalFirst ? FLAGS.VERTICAL : p_verticalFirst === null ? FLAGS.HORIZONTAL : FLAGS.VERTICAL_AND_HORIZONTAL; break;
        case FLAGS.TOP_RIGHT: return p_verticalFirst ? FLAGS.VERTICAL : p_verticalFirst === null ? FLAGS.HORIZONTAL : FLAGS.VERTICAL_AND_HORIZONTAL; break;
        case FLAGS.BOTTOM_LEFT: return p_verticalFirst ? FLAGS.VERTICAL : p_verticalFirst === null ? FLAGS.HORIZONTAL : FLAGS.VERTICAL_AND_HORIZONTAL; break;
        case FLAGS.BOTTOM_RIGHT: return p_verticalFirst ? FLAGS.VERTICAL : p_verticalFirst === null ? FLAGS.HORIZONTAL : FLAGS.VERTICAL_AND_HORIZONTAL; break;
    }
    return p_verticalFirst ? FLAGS.VERTICAL : p_verticalFirst === null ? FLAGS.HORIZONTAL : FLAGS.VERTICAL_AND_HORIZONTAL;
};

// Misc

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.SHOWN = Object.freeze(`shown`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.NO_ICON = Object.freeze(`no-icon`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.NO_LABEL = Object.freeze(`no-label`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.NO_SCALE = Object.freeze(`no-scale`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 */
FLAGS.FIXED_SIZE = Object.freeze(`fixed-size`);

// Sizes

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_XXS = Object.freeze(`size-xxs`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_XS = Object.freeze(`size-xs`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_S = Object.freeze(`size-s`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_M = Object.freeze(`size-m`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_L = Object.freeze(`size-l`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_XL = Object.freeze(`size-xl`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.SIZE_FILL = Object.freeze(`size-fill`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Sizes
*/
FLAGS.SIZE_CUSTOM = Object.freeze(`size-custom`);

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Sizes
 */
FLAGS.sizes = [
    FLAGS.SIZE_XXS,
    FLAGS.SIZE_XS,
    FLAGS.SIZE_S,
    FLAGS.SIZE_M,
    FLAGS.SIZE_L,
    FLAGS.SIZE_XL,
    FLAGS.SIZE_FILL,
    FLAGS.SIZE_CUSTOM
];


/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Sizing
*/
FLAGS.INLINE = Object.freeze(`inline`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Sizing
*/
FLAGS.STRETCH = Object.freeze(`stretch`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Sizing
*/
FLAGS.STRETCH_SAME = Object.freeze(`stretch-same`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Sizing
*/
FLAGS.STRETCH_SQUEEZE = Object.freeze(`stretch-squeeze`);

/**
* @description TODO
* @type {Array}
* @customtag read-only
* @group Sizing
*/
FLAGS.stretches = [
    FLAGS.STRETCH,
    FLAGS.STRETCH_SAME,
    FLAGS.STRETCH_SQUEEZE
];

// Flavors

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Flavors
 * @groupdescription Flavors are mostly taken from {@link common.FLAGS}.
 */
FLAGS.CTA = Object.freeze(`cta`);

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Flavors
 */
FLAGS.flavors = [
    com.FLAGS.INFOS,
    com.FLAGS.WARNING,
    com.FLAGS.ERROR,
    FLAGS.CTA
];

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Flavors
 */
FLAGS.flavorsExtended = [
    com.FLAGS.INFOS,
    com.FLAGS.WARNING,
    com.FLAGS.ERROR,
    com.FLAGS.READY,
    com.FLAGS.DIRTY,
    com.FLAGS.LOADING,
    com.FLAGS.PROCESSING,
    com.FLAGS.WAITING,
    com.FLAGS.ACTIVE,
    FLAGS.CTA
];

// Variants

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Variants
 */
FLAGS.MINIMAL = Object.freeze(`minimal`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Variants
 */
FLAGS.FRAME = Object.freeze(`frame`);

/**
 * @description TODO
 * @type {Array}
 * @customtag read-only
 * @group Variants
 */
FLAGS.variants = [
    FLAGS.MINIMAL,
    FLAGS.FRAME
];

// Animation

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Animation
 */
FLAGS.A_START = Object.freeze(`start`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Animation
 */
FLAGS.A_END = Object.freeze(`end`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Animation
 */
FLAGS.A_ITERATION = Object.freeze(`iteration`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Animation
 */
FLAGS.A_CANCEL = Object.freeze(`cancel`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Animation
*/
FLAGS.A_ANY_END = Object.freeze(`any-end`);

// Drag & Drop

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Drag'n Drop
 */
FLAGS.DRAGGED = Object.freeze(`dragged`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Drag'n Drop
 */
FLAGS.ALLOW_DROP = Object.freeze(`allow-drop`);

/**
 * @description TODO
 * @type {string}
 * @customtag read-only
 * @group Drag'n Drop
 */
FLAGS.ALLOW_DROP_TOP = Object.freeze(`allow-drop-top`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Drag'n Drop
*/
FLAGS.ALLOW_DROP_BOTTOM = Object.freeze(`allow-drop-bottom`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Drag'n Drop
*/
FLAGS.ALLOW_DROP_LEFT = Object.freeze(`allow-drop-left`);

/**
* @description TODO
* @type {string}
* @customtag read-only
* @group Drag'n Drop
*/
FLAGS.ALLOW_DROP_RIGHT = Object.freeze(`allow-drop-right`);

//

/**
* @description TODO
* @type {symbol}
* @customtag read-only
* @group Views
*/
FLAGS.EMPTY = Object.freeze(`empty`);


module.exports = FLAGS;