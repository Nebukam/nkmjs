'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class UI_SIGNAL {
    constructor() { }

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    static PAINTED = Symbol(`painted`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    static UNPAINTED = Symbol(`unpainted`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Rendering
     */
    static FIRST_PAINT = Symbol(`first-paint`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    static CHILD_ADDED = Symbol(`childAdded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    static CHILD_MOVED = Symbol(`childMoved`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Child management
     */
    static CHILD_REMOVED = Symbol(`childRemoved`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static SELECTION_GAIN = Symbol(`selectionGain`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static SELECTION_LOST = Symbol(`selectionLost`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static FOCUS_GAIN = Symbol(`focusGain`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static FOCUS_LOST = Symbol(`focusLost`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static ACTIVATED = Symbol(`activated`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static ALT_ACTIVATED = Symbol(`altActivated`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static TRIGGERED = Symbol(`triggered`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Interactivity
     */
    static DEACTIVATED = Symbol(`deactivated`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Data
     */
    static DATA_CHANGED = Symbol(`dataChanged`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static DISPLAY_REQUESTED = Symbol(`focusRequested`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static CLOSE_REQUESTED = Symbol(`closeRequested`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static EXPANDED = Symbol(`expanded`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static COLLAPSED = Symbol(`collapsed`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    static DRAG_STARTED = Symbol(`dragStarted`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    static DRAGGED = Symbol(`dragged`);
    
    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Drag and drop
     */
    static DRAG_ENDED = Symbol(`dragEnded`);

}

module.exports = UI_SIGNAL;