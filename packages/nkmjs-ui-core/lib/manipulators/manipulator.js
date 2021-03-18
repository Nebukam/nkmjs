'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const FlagEnum = require("../helpers/flag-enum");
const UI = require("../ui");

/**
 * @description An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 * @class
 * @memberof ui.core.manipulators
 */
class Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     */
    constructor(p_element = null) {
        this._element = p_element;
    }

    /**
     * @description TODO
     * @type {Element}
     */
    get element() { return this._element; }
    set element(p_value) {
        if (this._element === p_value) { return; }
        let oldElement = this._element;
        this._element = p_value;
        this._OnElementChanged(oldElement);
    }

    _OnElementChanged(p_oldElement){

    }

    /**
     * @description TODO
     * @type {number}
     */
    get order() { return this._element.style.order; }
    set order(p_value) { this._element.style.order = p_value; }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_value) {
        return this._Apply(this._element, p_value);
    }

    _Apply(p_element, p_value) {
        return true;
    }

}

module.exports = Manipulator;