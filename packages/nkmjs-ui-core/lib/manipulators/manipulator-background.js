'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const Manipulator = require(`./manipulator`);

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.BaseManipulator
 * @memberof ui.core.manipulators
 */
class BackgroundManipulator extends Manipulator {

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

    /**
     * @access private
     * @param {*} p_element 
     * @param {*} p_value string or BlobResource
     */
    _Update(p_element, p_value) {

        if (u.isVoid(p_value)) {
            this._ApplyPath(p_element, false);
            return false;
        } else {

            let path = ``;

            if (u.isString(p_value)) { path = p_value; }
            else if (IDS.ICON in p_value) { path = p_value[IDS.ICON]; }
            else if (IDS.PATH in p_value) { path = p_value[IDS.PATH]; }
            else if (`img` in p_value) { path = p_value.img; }
            else if (`objectURL` in p_value) { path = p_value.objectURL; }

            if (path === `` || !u.isString(path)) { return false; }

            path = u.PATH.FULL(path);

            this._ApplyPath(p_element, path);

            return true;

        }

    }

    _ApplyPath(p_element, p_path = false) {
        if (!p_path) {
            p_element.style.removeProperty(`backgroundImage`);
        } else {
            p_element.style.backgroundImage = `url(${p_path})`;
        }
    }

}

module.exports = BackgroundManipulator;