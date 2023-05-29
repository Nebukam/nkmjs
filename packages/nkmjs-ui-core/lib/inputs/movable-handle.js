'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);
const style = require("@nkmjs/style");

const UI = require(`../ui`);
const FlagEnum = require(`../helpers/flag-enum`);
const POINTER = require(`../pointer`);
const FLAGS = require(`../flags`);
const WidgetOrientable = require(`../widget-orientable`);

const UNITS = require(`./units`);

const base = WidgetOrientable;
const __units = [UNITS.PIXEL, UNITS.PERCENTAGE];

class MovableHandle extends base {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._Bind(this._PointerDown);
        this._Bind(this._OnPointerMove);
        this._Bind(this._OnPointerUp);

        this._pointer
            .Unhook(POINTER.KEYS.MOUSE_LEFT, POINTER.KEYS.RELEASE, this.Activate)
            .Hook(POINTER.KEYS.MOUSE_LEFT, POINTER.KEYS.DOWN, this._PointerDown);

        FlagEnum.Attach(this, `unit`, __units);

        this._movement = new u.helpers.Movement();

    }

    _PointerDown(p_evt) {
        this._movement.Pin(POINTER.position.y, POINTER.position.y);
        POINTER
            .Watch(SIGNAL.MOUSE_MOVE, this._OnPointerMove, this)
            .Watch(SIGNAL.MOUSE_UP, this._OnPointerUp, this);
    }

    _OnPointerMove(p_evt) {
        
        this._movement.Update(POINTER.position.y, POINTER.position.y);
        
        if (this.orientation === FLAGS.VERTICAL_AND_HORIZONTAL) {
            // movement is multi-directional
            // use both x & y

        }else{
            // movement is uni-directional
            // use a single coord
            let offset = 0;

            if (this.orientation === FLAGS.VERTICAL) {
                // movement is left-right

            } else if (this.orientation === FLAGS.HORIZONTAL) {
                // movement is top-down
                
            }
        }

    }

    _OnPointerUp(p_evt) {
        POINTER
            .Unwatch(SIGNAL.MOUSE_MOVE, this._OnPointerMove, this)
            .Unwatch(SIGNAL.MOUSE_UP, this._OnPointerUp, this);
    }

    static _Style() {
        return style.Extends({
            ':host': {
                'background-color': '#ff0000'
            },
            ':host(.horizontal:hover)': {
                'cursor': 'ns-resize'
            },
            ':host(.vertical:hover)': {
                'cursor': 'ew-resize'
            },
            ':host(.vertical.horizontal:hover)': {
                'cursor': 'move'
            }
        }, base._Style());
    }

}

module.exports = MovableHandle;
UI.Register(`nkmjs-edge-resize-handle`, MovableHandle)