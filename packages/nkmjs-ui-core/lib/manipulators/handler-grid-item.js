'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const FlagEnum = require("../helpers/flag-enum");
const UI = require("../ui");

const Manipulator = require(`./manipulator`);

/**
 * @description An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 * @class
 * @augments ui.core.manipulators.Manipulator
 * @memberof ui.core.manipulators
 */
class GridItemHandler extends Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     */
    constructor(p_element = null) {
        super(p_element);
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;

        // TODO : Add placement shortcuts etc
    }

    _OnElementChanged(p_oldElement) {
        if (p_oldElement) {

        }
        if (this._element) { this._Apply(this._element); }
    }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_x = 1, p_y = 1, p_width = 0, p_height = 0) {

        this._x = p_x;
        this._y = p_y;
        this._width = p_width;
        this._height = p_height;

        return this._Apply(this._element);

    }

    _Apply(p_element) {

        p_element.style.setProperty(`grid-column-start`, this._x);
        if (this._width > 0) { p_element.style.setProperty(`grid-column-end`, this._x + this._width); }
        else { p_element.style.removeProperty(`grid-column-end`,); }

        p_element.style.setProperty(`grid-row-start`, this._y);
        if (this._height > 0) { p_element.style.setProperty(`grid-row-end`, this._y + this._height); }
        else { p_element.style.removeProperty(`grid-row-end`); }

        return true;

    }

}

module.exports = GridItemHandler;