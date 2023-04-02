'use strict';

const ContentURLManipulator = require(`./manipulator-content-url`);
const dom = require(`../utils-dom`);

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

    set objectFit(p_value) { dom.CSS(this._element, 'object-fit', p_value); }

    _ApplyPath(p_element, p_path = false, p_direct = false) {
        dom.CSS(this._element, 'backgroundImage', p_path ? p_direct ? p_path : `url(${p_path})` : null);
    }

}

module.exports = BackgroundHandler;