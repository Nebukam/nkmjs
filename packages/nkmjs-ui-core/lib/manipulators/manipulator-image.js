'use strict';

const { U, PATH } = require(`@nkmjs/utils`);

const UI_ID = require(`../ui-id`);
const BaseManipulator = require(`./manipulator-base`);

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.BaseManipulator
 * @memberof ui.core.manipulators
 */
class ImageManipulator extends BaseManipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) { 
        super(p_element, p_autoHide, p_sizeControl); }

    get content() {
        return this._element ? this._element.style.backgroundImage : null;
    }

    /**
     * @access private
     * @param {*} p_element 
     * @param {*} p_value string or BlobResource
     */
    _Update(p_element, p_value) {

        if (U.isVoid(p_value)) {
            p_element.style.removeProperty(`backgroundImage`);
            return false;
        } else {

            let path = ``;

            if (U.isString(p_value)) { path = p_value; }
            else if (UI_ID.ICON in p_value) { path = p_value[UI_ID.ICON]; }
            else if (UI_ID.PATH in p_value) { path = p_value[UI_ID.PATH]; }
            else if (`img` in p_value) { path = p_value.img; }
            else if (`objectURL` in p_value) { path = p_value.objectURL; }

            if (path === `` || !U.isString(path)) { return false; }

            path = PATH.FULL(path);

            p_element.style.backgroundImage = `url(${path})`;

            return true;

        }

    }

}

module.exports = ImageManipulator;