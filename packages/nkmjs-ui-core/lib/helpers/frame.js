'use strict';

const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const manipulators = require("../manipulators");
const DisplayObject = require("../display-object");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObject
 * @memberof ui.core.helpers
 */
class Frame extends DisplayObject {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._imgManipulator = null;
    }

    // ----> DOM

    _Style() {
        return {
            ':host': {
                position: `relative`,
                'min-width': 0,
                '@': ['cover']
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

    _Render() {
        this._imgManipulator = new manipulators.Image(this, false);
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