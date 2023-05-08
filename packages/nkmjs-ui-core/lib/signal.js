'use strict';


/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    RESIZE: Symbol(`resize`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    PAINTED: Symbol(`painted`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    UNPAINTED: Symbol(`unpainted`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    FIRST_PAINT: Symbol(`first-paint`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    CHILD_ATTACHED: Symbol(`childAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    CHILD_MOVED: Symbol(`childMoved`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    CHILD_DETACHED: Symbol(`childRemoved`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    SEL_GAIN: Symbol(`selectionGain`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    SEL_LOST: Symbol(`selectionLost`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    FOCUS_GAIN: Symbol(`focusGain`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    FOCUS_LOST: Symbol(`focusLost`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    ACTIVATED: Symbol(`activated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    ALT_ACTIVATED: Symbol(`altActivated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    TRIGGERED: Symbol(`triggered`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    DEACTIVATED: Symbol(`deactivated`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Data
     */
    DATA_CHANGED: Symbol(`dataChanged`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DISPLAY_REQUESTED: Symbol(`displayRequested`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    CLOSE_REQUESTED: Symbol(`closeRequested`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    DISPLAY_GAIN: Symbol(`displayGain`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    */
    DISPLAY_LOST: Symbol(`displayLost`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    EXPANDED: Symbol(`expanded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    COLLAPSED: Symbol(`collapsed`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    DRAG_STARTED: Symbol(`dragStarted`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    DRAGGED: Symbol(`dragged`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    DRAG_ENDED: Symbol(`dragEnded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    DROPPED: Symbol(`dropped`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Views
     */
    VIEW_ADDED: Symbol(`viewAdded`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Views
     */
    EMPTY: Symbol(`empty`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Views
     */
    NON_EMPTY: Symbol(`non-empty`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    DRAW_REQUEST_BEFORE: Symbol(`drawRequestBefore`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Rendering
    */
    DRAW_REQUEST_AFTER: Symbol(`drawRequestAfter`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
    */
    ITEM_REQUESTED: Symbol(`itemRequested`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
    */
    ITEM_UPDATE_REQUESTED: Symbol(`itemUpdateRequested`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
    */
    ITEM_CLEARED: Symbol(`itemCleared`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Selection
    */
    ITEM_REQUEST_RANGE_UPDATE: Symbol(`itemRequestRangeUpdate`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Selection
    */
    SEL_REQ_ADD: Symbol(`selectionAddRequest`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Selection
    */
    SEL_REQ_INDEX: Symbol(`selectionIndexRequest`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Selection
    */
    SEL_REQ_LENGTH: Symbol(`selectionTotalCountRequest`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Selection
    */
    SEL_REQ_REMOVE: Symbol(`selectionRemoveRequest`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Selection
    */
    SEL_MODIFIER_CHANGED: Symbol(`selectionModifierChanged`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Selection
    */
    SEL_CLEARED: Symbol(`selectionCleared`),

    /**
    * @description TODO
    * @type {symbol}
    * @customtag read-only
    * @group Key Signal
    */
    KEY_UP: Symbol('keyUp'),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Key Signal
     */
    KEY_DOWN: Symbol('keyDown'),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Key Signal
     */
    KEY_REPEAT: Symbol('keyRepeat'),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    MOUSE_UP: Symbol('mouseUp'),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    MOUSE_DOWN: Symbol('mouseDown'),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    MOUSE_MOVE: Symbol('mouseMove'),

}