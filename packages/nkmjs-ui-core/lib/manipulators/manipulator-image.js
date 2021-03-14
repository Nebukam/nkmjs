'use strict';

const BackgroundManipulator = require(`./manipulator-background`);

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ImageManipulator
 * @memberof ui.core.manipulators
 */
class ImageManipulator extends BackgroundManipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) { 
        super(p_element, p_autoHide, p_sizeControl); }

    get content() {
        return this._element ? this._element.src : null;
    }

    _ApplyPath(p_element, p_path = false){
        p_element.src = `style/default/icons/icon.svg`;
        return;
        if(!p_path){
            p_element.src = ``;
        }else{
            p_element.src = p_path;
        }
    }

}

module.exports = ImageManipulator;