'use strict';

const style = require(`@nkmjs/style`);

const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const manipulators = require("../manipulators");
const DisplayObject = require("../display-object");

const base = DisplayObject;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObject
 * @memberof ui.core.helpers
 */
class Frame extends base {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._imgManipulator = new manipulators.Image(this, false);
    }

    // ----> DOM

    static _Style() {
        return {
            ':host': {
                ...style.rules.zeroMin.width,
                ...style.rules.cover.default,
            },

            ':host(.focused)': {

            },
            ':host(.focused) .toolbar': {

            },
            ':host(.selected)': {

            },
            ':host(.selected.focused)': {

            }
        };
    }

    /**
     * @description TODO
     * @param {*} p_value 
     */
    Set(p_value) { return this._imgManipulator.Set(p_value); }

    // ----> Pooling

    _CleanUp() {
        this._imgManipulator.Set(null);
        super._CleanUp();
    }

}

module.exports = Frame;
UI.Register(`nkmjs-frame`, Frame);