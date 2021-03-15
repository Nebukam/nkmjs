'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class DOMTemplate {

    constructor() { }

    // ----> Template

    /**
     * @access protected
     * @description TODO
     * @type {array}
     */
    static __HTMLtemplate = null;

    /**
     * @access protected
     * @description Create a node template to be cloned by _RenderTemplate to speed up initialization.
     */
    static _CreateTemplate() {
        if (this.__HTMLtemplate) {
            throw new Error(`HTMLTemplate (${this.name}) initialized more than once.`);
        }
        this.__HTMLtemplate = new Array(0);
    }

    /**
     * @access protected
     * @description TODO
     * @param {Element} p_element 
     * @param {string} [p_id] 
     * @param {string} [p_parentId] 
     */
    static _Add(p_element, p_id = null, p_parentId = null) {
        let node = { node: p_element };
        if (p_id) { node.id = p_id; }
        if (p_parentId) { node.parent = p_parentId; }
        this.__HTMLtemplate.push(node);
    }

    /**
     * @description TODO
     * @param {ui.core.DOMTemplate} p_tpl 
     * @param {Element} p_host 
     * @param {object} p_options 
     */
    static Render(p_tpl, p_host, p_options) {
        let tpl = new p_tpl();
        tpl.Render(p_host, p_options);
        return tpl;
    }

    /**
     * @description Render the DOM template into an host.
     * @param {Element} p_host Object to create element into
     * @param {object} p_propertyHolder Object to create properties onto
     */
    Render(p_host, p_options = null) {

        if (`_wrapper` in p_host) { p_host = p_host._wrapper; }

        let owner = u.tils.Get(p_options, com.IDS.OWNER, this);
        if (!owner) { owner = this; }

        let tpl = this.constructor.__HTMLtemplate;

        if (!tpl) {
            this.constructor._CreateTemplate();
            tpl = this.constructor.__HTMLtemplate;
        }

        for (let i = 0, n = tpl.length; i < n; i++) {
            let nodeInfos = tpl[i],
                node = nodeInfos.node.cloneNode(true);

            if (nodeInfos.parent) { owner[nodeInfos.parent].appendChild(node); }
            else { p_host.appendChild(node); }

            if (nodeInfos.id) { owner[nodeInfos.id] = node; }
        }

        return owner;

    }

}

module.exports = DOMTemplate;