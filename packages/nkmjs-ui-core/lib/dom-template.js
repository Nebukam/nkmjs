'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const manipulators = require(`./manipulators`);

const IDS = require(`./ids`);

const __h = Object.freeze(`autoHide`);

/**
 * // Important note : when setting a custom owner, property are prefixed with an underscore. 
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class DOMTemplate {

    constructor() { }

    // ----> Static processors

    static AsIcon(node, opts, customOpts) {
        node = new manipulators.Icon(node, __h in opts ? opts[__h] : true);
        node.Set(customOpts);
        return node;
    }

    static AsIconStatic(node, opts, customOpts) {
        node = new manipulators.Icon(node, __h in opts ? opts[__h] : false);
        node.Set(customOpts);
        return node;
    }

    static AsText(node, opts, customOpts) {
        node = new manipulators.Text(node, __h in opts ? opts[__h] : true);
        node.Set(customOpts);
        return node;
    }

    static AsTextStatic(node, opts, customOpts) {
        node = new manipulators.Text(node, __h in opts ? opts[__h] : false);
        node.Set(customOpts);
        return node;
    }

    static AsBackground(node, opts, customOpts) {
        node = new manipulators.Background(node, __h in opts ? opts[__h] : true);
        node.Set(customOpts);
        return node;
    }

    static AsBackgroundStatic(node, opts, customOpts) {
        node = new manipulators.Background(node, __h in opts ? opts[__h] : false);
        node.Set(customOpts);
        return node;
    }

    static AsImage(node, opts, customOpts) {
        node = new manipulators.Image(node, __h in opts ? opts[__h] : true);
        node.Set(customOpts);
        return node;
    }

    static AsImageStatic(node, opts, customOpts) {
        node = new manipulators.Image(node, __h in opts ? opts[__h] : false);
        node.Set(customOpts);
        return node;
    }

    // ----> Template

    /**
     * @access protected
     * @description TODO
     * @type {Array}
     */
    static __fragment = null;
    static __HTMLtemplate = null;
    static __shelf = {};
    static __shelfIDs = {};

    /**
     * @access protected
     * @description Create a node template to be cloned by _RenderTemplate to speed up initialization.
     */
    static _CreateTemplate() { }

    /**
     * @access protected
     * @description TODO
     * @param {Element} p_element 
     * @param {string} [p_id] 
     * @param {string} [p_parentId] 
     */
    static _Add(p_element, p_options = null) {
        let node = { node: p_element, ...p_options };
        if (IDS.UID in p_options) { node._id = `_${p_options[IDS.UID]}`; }
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
     * @param {object} p_options Object to create properties onto
     */
    Render(p_host, p_options = null) {

        if (p_host._wrapper) { p_host = p_host._wrapper; }

        let owner = p_options ? p_options[com.IDS.OWNER] || this : this,
            shelf = this.constructor.__shelf,
            ids = this.constructor.__shelfIDs;

        if (!owner) { owner = this; }

        let tpl = this.constructor.__HTMLtemplate,
            internal = owner === this;

        if (!tpl) {
            this.constructor.__HTMLtemplate = [];
            this.constructor._CreateTemplate();
            tpl = this.constructor.__HTMLtemplate;
        }

        for (let i = 0, n = tpl.length; i < n; i++) {

            let nodeInfos = tpl[i],
                nodeID = nodeInfos[IDS.UID],
                node = nodeInfos.node.cloneNode(true),
                customInfos = p_options ? p_options[nodeID] : null,
                writeNode = u.isBool(customInfos?.write) ? customInfos.write : u.isBool(nodeInfos.write) ? nodeInfos.write : true;

            shelf[nodeID] = node;

            if (nodeInfos.parent) { shelf[nodeInfos.parent].appendChild(node); }
            else { p_host.appendChild(node); }

            if (customInfos) {
                // Add custom class
                let customClass = customInfos[IDS.CSS_CL];

                // Use return value of custom function as assigned value
                if (customClass) { node.classList.add(customClass); }
                if (writeNode) {
                    // Write using custom ID, or default one
                    let customID = customInfos[IDS.UID],
                        propId = customID ? customID : internal ? nodeID : nodeInfos._id,
                        processFn = nodeInfos.fn;

                    if (processFn) { node = processFn(node, nodeInfos, customInfos); };

                    owner[propId] = node;
                    if (nodeID) { ids[nodeID] = propId; }
                }
            } else {
                if (writeNode && nodeID) {
                    // Write using default ID
                    // Note we add a '_' in front of the default ID.
                    let processFn = nodeInfos.fn;
                    if (processFn) { node = processFn(node, nodeInfos, customInfos); };

                    let propId = internal ? nodeID : nodeInfos._id;
                    ids[nodeID] = propId;
                    owner[propId] = node;
                }
            }

        }

        return owner;

    }

}

module.exports = DOMTemplate;