'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const FlagEnum = require("../helpers/flag-enum");
const UI = require("../ui");
const dom = require(`../utils-dom`);

const Manipulator = require(`./manipulator`);

/**
 * @description An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 * @class
 * @augments ui.core.manipulators.Manipulator
 * @memberof ui.core.manipulators
 */
class GridHandler extends Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     */
    constructor(p_element = null, p_width = null, p_height = null, p_default = `auto`) {
        super(p_element, p_width, p_height, p_default);
        // TODO : Add placement shortcuts etc
    }

    _Init(p_width = null, p_height = null, p_default = `auto`) {
        this._ProcessValue = this._ProcessValue.bind(this);
        this._default = p_default;
        this._ConvertParams(p_width, p_height);
    }

    _OnElementChanged(p_oldElement) {

        if (p_oldElement) {
            dom.CSS(p_oldElement, {
                'grid-template-columns': null,
                'grid-template-rows': null,
                'justify-items': null,
                'align-items': null,
                'display': null,
            });
        }

        if (this._element) {
            dom.CSS(this._element, {
                'display': `grid`,
                'justify-items': `stretch`,
                'align-items': `stretch`,
            });
            this._Apply(this._element);
        }

    }

    _ConvertParams(p_width = null, p_height = null) {

        this._width = p_width;
        if (p_width) {
            p_width.forEach(this._ProcessValue);
            this._width = p_width.join(` `);
        }

        this._height = p_height;
        if (p_height) {
            p_height.forEach(this._ProcessValue);
            this._height = p_height.join(` `);
        }

    }

    /**
     * @description Set the content of the manipulated element.
     * @param {array} p_width 
     * @param {array} p_height 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_width = null, p_height = null) {

        this._ConvertParams(p_width, p_height);
        return this._Apply(this._element);

    }

    _ProcessValue(p_value, p_index, p_array) {

        if (u.isNumber(p_value)) {
            if (p_value === 0) { p_array[p_index] = this._default; }
            else if (p_value <= 1) { p_array[p_index] = `${p_value * 100}%`; }
            else if (p_value > 1) { p_array[p_index] = `${p_value}px`; }
        } else if (u.isEmpty(p_value)) {
            p_array[p_index] = this._default;
        }

    }

    _Apply(p_element) {

        dom.CSS(p_element, {
            'grid-template-columns': this._width ? this._width : null,
            'grid-template-rows': this._height ? this._height : null,
        });
        return true;

    }

}

module.exports = GridHandler;