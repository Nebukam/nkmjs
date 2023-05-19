'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const ContentManipulator = require(`./manipulator-content`);

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ContentManipulator
 * @memberof ui.core.manipulators
 */
class ContentURLManipulator extends ContentManipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    /**
     * @access private
     * @param {*} p_element 
     * @param {*} p_value string or BlobResource
     */
    _Apply(p_element, p_value, p_direct = false) {

        if (u.isVoid(p_value)) {
            this._ApplyPath(p_element, false);
            return false;
        } else {

            let path = u.isString(p_value) ? p_value : p_value[IDS.PATH] || p_value[IDS.ICON] || p_value[IDS.IMG] || p_value.objectURL || ``;

            if (path === `` || !u.isString(path)) { return false; }

            path = u.FULL(path);

            this._ApplyPath(p_element, path, p_direct);

            return true;

        }

    }

    _ApplyPath(p_element, p_path = false, p_direct = false) { }

}

module.exports = ContentURLManipulator;