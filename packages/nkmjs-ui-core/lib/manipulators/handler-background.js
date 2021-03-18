'use strict';

const ContentURLManipulator = require(`./manipulator-content-url`);

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ContentURLManipulator
 * @memberof ui.core.manipulators
 */
class BackgroundHandler extends ContentURLManipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    get content() {
        return this._element ? this._element.style.backgroundImage : null;
    }

    _ApplyPath(p_element, p_path = false) {
        if (!p_path) { p_element.style.removeProperty(`backgroundImage`); }
        else { p_element.style.backgroundImage = `url(${p_path})`; }
    }

}

module.exports = BackgroundHandler;