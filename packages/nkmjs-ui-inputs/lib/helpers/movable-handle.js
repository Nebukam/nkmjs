'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");

const UNITS = require(`../units`);

const __units = [UNITS.PIXEL, UNITS.PERCENTAGE];

class MovableHandle extends ui.OrientableWidget {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._Bind(this._PointerDown);
        this._Bind(this._OnPointerMove);
        this._Bind(this._OnPointerUp);

        this._pointer
            .Unhook(ui.POINTER.MOUSE_LEFT, ui.POINTER.RELEASE, this.Activate)
            .Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.DOWN, this._PointerDown);

        this._unitsFlagEnum = new ui.helpers.FlagEnum(__units);
        this._unitsFlagEnum.Add(this);

        this._movement = new u.helpers.Movement();

    }

    _PointerDown(p_evt) {
        this._movement.Pin(ui.POINTER.position.y, ui.POINTER.position.y);
        ui.POINTER
            .Watch(ui.POINTER.MOUSE_MOVE, this._OnPointerMove, this)
            .Watch(ui.POINTER.MOUSE_UP, this._OnPointerUp, this);
    }

    _OnPointerMove(p_evt) {
        
        this._movement.Update(ui.POINTER.position.y, ui.POINTER.position.y);
        
        if (this._orientation.currentFlag === ui.FLAGS.VERTICAL_AND_HORIZONTAL) {
            // movement is multi-directional
            // use both x & y

        }else{
            // movement is uni-directional
            // use a single coord
            let offset = 0;

            if (this._orientation.currentFlag === ui.FLAGS.VERTICAL) {
                // movement is left-right

            } else if (this._orientation.currentFlag === ui.FLAGS.HORIZONTAL) {
                // movement is top-down
                
            }
        }

    }

    _OnPointerUp(p_evt) {
        ui.POINTER
            .Unwatch(ui.POINTER.MOUSE_MOVE, this._OnPointerMove, this)
            .Unwatch(ui.POINTER.MOUSE_UP, this._OnPointerUp, this);
    }

    _Style() {
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
        }, super._Style());
    }

}

module.exports = MovableHandle;
ui.Register(`nkmjs-edge-resize-handle`, MovableHandle)