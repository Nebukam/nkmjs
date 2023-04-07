'use strict';

const ContentURLManipulator = require(`./manipulator-content-url`);
/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ContentURLManipulator
 * @memberof ui.core.manipulators
 */
class EmbedHandler extends ContentURLManipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    get content() { return this._element ? this._element.data : null; }

    _ApplyPath(p_element, p_path = false, p_direct = false) {
        if (p_element.data == p_path) { return; }
        p_element.data = p_path ? p_path : ``;
    }

}

module.exports = EmbedHandler;