'use strict';

const dom = require(`../utils-dom`);

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
    constructor(p_element = null, p_x = 1, p_y = 1, p_width = 1, p_height = 1) {
        super(p_element, p_x, p_y, p_width, p_height);
    }

    _Init(p_x = 1, p_y = 1, p_width = 1, p_height = 1) {
        this._x = p_x === 0 ? p_x = 1 : p_x === -1 ? 0 : p_x;
        this._y = p_y === 0 ? p_y = 1 : p_y === -1 ? 0 : p_y;
        this._width = p_width === 0 ? p_width = 1 : p_width === -1 ? 0 : p_width;
        this._height = p_height === 0 ? p_height = 1 : p_height === -1 ? 0 : p_height;
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
    Set(p_x = 1, p_y = 1, p_width = 1, p_height = 1) {

        this._x = p_x === 0 ? p_x = 1 : p_x === -1 ? 0 : p_x;
        this._y = p_y === 0 ? p_y = 1 : p_y === -1 ? 0 : p_y;
        this._width = p_width === 0 ? p_width = 1 : p_width === -1 ? 0 : p_width;
        this._height = p_height === 0 ? p_height = 1 : p_height === -1 ? 0 : p_height;

        return this._Apply(this._element);

    }

    _Apply(p_element) {

        dom.CSS(p_element, {
            'grid-column-start':this._x,
            'grid-column-end':this._width > 0 ? this._x + this._width : null,
            'grid-row-start':this._y,
            'grid-row-end':this._height > 0 ? this._y + this._height : null
        });

        return true;

    }

}

module.exports = GridItemHandler;