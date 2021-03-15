'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);
const DisplayObjectContainer = require(`../display-object-container`);

const FlagEnum = require(`./flag-enum`);



/**
 * A PopIn is a lightweight container with absolute positioning added to an object.
 * It is attached to a specific position in parent screen-space, and can follow an object if attached to one.
 * Use cases :
 * - input field feedback
 * - overlay search box (closable)
 * - informational popins
 * - contextual menu
 * 
 * If used at document level, the PopIn will attempt to find the best possible placement to stay visible (moving left/right/up/down)
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core.helpers
 */
class PopIn extends DisplayObjectContainer {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_ANCHOR = `mode-anchor`; // Anchored to something (possibly) moving on screen

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_FLOAT_INSIDE = `mode-float-inside`; // Float at a given place in a container

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_FLOAT_OUTSIDE = `mode-float-outside`; // Float at a given place outside a container

    static modes = [
        this.MODE_ANCHOR,
        this.MODE_FLOAT_INSIDE,
        this.MODE_FLOAT_OUTSIDE
    ];

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static LEFT = { x:-0.5, y:0 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static RIGHT = { x:0.5, y:0 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP = { x:0, y:-0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM = { x:0, y:0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP_LEFT = { x:-0.5, y:-0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP_RIGHT = { x:0.5, y:-0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM_LEFT = { x:-0.5, y:0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM_RIGHT = { x:0.5, y:0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static CENTER = { x:0, y:0 };



    /**
     * @description TODO
     * @param {object} p_options
     * @param {Element} p_options.context
     * @param {function|ui.core.DisplayObject} p_options.content
     * @param {Element} p_options.anchor
     * 
     */
    static Pop(p_options) {
        let popin = UI.Rent(PopIn);
        popin.options = p_options;
        return popin;
    }

    _Init() {

        super._Init();

        this._content = null;
        this._options = null;
        this._placement = null;

        this._placementEnum = new FlagEnum(FLAGS.placements);
        this._placementEnum.Add(this);

        this._modeEnum = new FlagEnum(this.constructor.modes, true);
        this._modeEnum.Add(this);

        this._optionsHandler = new com.helpers.OptionsHandler(this._Bind(this._OnOptionsProcessed));
        this._optionsHandler.Hook(`mode`);
        this._optionsHandler.Hook(`context`, null, document.body);
        this._optionsHandler.Hook(`anchor`);
        this._optionsHandler.Hook(`placement`, null, PopIn.CENTER);
        this._optionsHandler.Hook(`origin`, null, PopIn.CENTER);

        this._ownsContent = false;

        this._Bind(this._UpdateAnchoredPosition);

    }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.content = p_options.content;
        if (this._content) { this._optionsHandler.Process(this, this._options); }
        else { throw new Error(`PopIn options has no content set.`); }
    }

    /**
     * @description TODO
     * @type {string}
     * @group Mode
     */
    get mode() { return this._modeEnum.currentFlag; }
    set mode(p_value) { this._modeEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {object}
     * @group Placement
     */
    get placement() { return this._placement; }
    set placement(p_value) { this._placement = p_value; }

    /**
     * @description Point inside the pop-in to pin at position
     * @type {object}
     * @group Placement
     */
    get origin() { return this._placement; }
    set origin(p_value) { this._placement = p_value; }

    /**
     * @description TODO
     * @type {function|ui.core.DisplayObject}
     */
    get content() { return this._content; }
    set content(p_value) {

        if (this._content === p_value) { return; }
        if (this._content) {
            if(this._ownsContent){ 
                this._content.Release(); 
            }else{
                // Clear inline style properties
            }
            this._content = null;
        }

        if (!p_value) { 
            this._ownsContent = false;
            return; 
        }

        this._ownsContent = u.tils.isFunc(p_value);

        this._content = this.Add(p_value, `content`);
        this._content.Watch(SIGNAL.CLOSE_REQUESTED, () => { this.Release(); });

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get context() { return this._context; }
    set context(p_value) {
        if (this._context === p_value) { return; }
        if (this._context) { u.dom.Detach(this); }
        this._context = p_value;
        if (this._context) { u.dom.Attach(this, this._context); }
    }

    /**
     * @description TODO
     * @type {Element}
     */
    get anchor() { return this._anchor; }
    set anchor(p_value) {
        if (this._anchor === p_value) { return; }
        this._anchor = p_value;
        if(this._anchor){ com.time.TIME.Watch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }
        else{ com.time.TIME.Unwatch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_options 
     */
    _OnOptionsProcessed(p_options) {

    }


    // ----> DOM

    _Style(){
        return {
            ':host':{
                'position':'absolute',
                'border':'2px solid #ff0000',
                //'width':'0', 'height':'0',
                'display':'flex' // making sure things are properly sized
            },
            ':host(.mode-float-inside)':{

            },
            ':host(.mode-anchor)':{
                
            },
            /*
            // Float inside
            ':host(.mode-float-inside.top)':{ 'top':'0px' },
            ':host(.mode-float-inside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-inside.left)':{ 'left':'0px' },
            ':host(.mode-float-inside.right)':{ 'right':'0px' },

            // Float outside
            ':host(.mode-float-outside.top)':{ 'top':'0px' },
            ':host(.mode-float-outside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-outside.left)':{ 'left':'0px' },
            ':host(.mode-float-outside.right)':{ 'right':'0px' },
            */
        };
    }

    /**
     * @access private
     * @description TODO
     */
    _UpdateAnchoredPosition(){
        
        let rect = u.dom.Rect(this._anchor, this.parentElement),
        centerX = rect.x + rect.width * 0.5,
        centerY = rect.y + rect.height * 0.5,
        x = centerX + rect.width * this._placement.x,
        y = centerY + rect.height * this._placement.y;


        if(this._placement.x < 0.5){
            // offset by pop-in width
        }else{
            // no re-positioning
        }
        
        if(this._placement.y < 0.5){
            // offset by pop-in width
        }else{
            // no re-positioning
        }

        this.style.left = `${x}px`;
        this.style.top = `${y}px`;

    }

    _CleanUp() {

        this._ownsContent = false;

        this.context = null;
        this.content = null;
        this.anchor = null;
        this.mode = null;

        this._options = null;

        super._CleanUp();

    }



}

module.exports = PopIn;
UI.Register(`nkmjs-pop-in`, PopIn);