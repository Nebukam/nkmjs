
'use strict';

const u = require(`@nkmjs/utils`);
const collections = require(`@nkmjs/collections`);

const __observedElements = [];
const __observedCallbacks = new collections.DictionaryList();
const __rectObserver = new IntersectionObserver(
    (entries, observer) => {

        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time

        let entryList = [];
        let callbackList = [];

        //console.log(entries);
        for (let i = 0, n = entries.length; i < n; i++) {
            let
                entry = entries[i],
                target = entry.target,
                oldRect = target.boundingClientRect,
                newRect = entry.boundingClientRect,
                doUpdate = false;

            if (!oldRect) {
                doUpdate = true;
            } else {
                if (oldRect.x != newRect.x ||
                    oldRect.y != newRect.y ||
                    oldRect.width != newRect.width ||
                    oldRect.height != newRect.height) {
                    doUpdate = true;
                }
            }

            if (doUpdate) {
                target.boundingClientRect = newRect;
                callbackList.push(__observedCallbacks.Get(target));
                entryList.push(entry);
            }

            if (entry.isIntersecting) {

            } else {

            }
        }

        // Callback AFTER updating boudingClientRect
        // to ensure elements are all up-to-date
        for (let i = 0; i < callbackList.length; i++) {
            let
                cbs = callbackList[i],
                entry = entryList[i];
            for (let c = 0, cn = cbs.length; c < cn; c++) {
                let cb = cbs[c];

                if (u.isFunc(cb)) { cb(entry); }
            }
        }

        entryList.length = 0;
        callbackList.length = 0;

        observer.disconnect();

        for (let i = 0, n = __observedElements.length; i < n; i++) {
            observer.observe(__observedElements[i]);
        }

    });

var __urid = 0;

/**
 * UTILS_DOM is a wrapper class that contains a bunch of utilitary methods to manipulate the DOM.
 * Since the NKMjs library isn't heavy on DOM manipulation, these are mostly shortcut to common operations such
 * as additions & deletions
 * @class
 * @hideconstructor
 * @memberof utils
 */
module.exports = {

    get URID() { return __urid++; },

    //#region Observable

    ObserveRect: function (p_element, p_callback) {

        if (!__observedCallbacks.Set(p_element, p_callback)) { return; }

        let index = __observedElements.indexOf(p_element);

        if (index == -1) {
            __observedElements.push(p_element);
            __rectObserver.observe(p_element);
        }

        console.log(`ObserveRect :: ${p_element} / ${p_callback} (${index})`);

    },

    UnobserveRect: function (p_element, p_callback) {

        if (!__observedCallbacks.Remove(p_element, p_callback)) { return; }

        let count = __observedCallbacks.Count(p_element), index = -2;
        if (count == 0) {
            index = __observedElements.indexOf(p_element);
            __observedElements.splice(index, 1);
            __rectObserver.unobserve(p_element);
        }

        console.log(`UnobserveRect :: ${p_element} / ${p_callback} (${index} // ${count})`);
    },

    UpdateObservedRect: function (p_element) {


        let index = __observedElements.indexOf(p_element);
        if (index == -1) { return; }

        __rectObserver.unobserve(p_element);
        __rectObserver.observe(p_element);

    },


    //#endregion

    /**
     * @description Create a DOM Node of a given type with a given set of attributes.
     * @param {string} p_element 
     * @param {object} [p_attributes] inlined attributes & values
     * @param {Node} [p_container] Parent node to append the new node into
     * @example let newNode = this.New(`div`, { class:`foo`, ['data-title']:`bar` });
     * //<div class="foo" data-title:"bar"></div> //dom element
     */
    El: function (p_element, p_attributes = null, p_container = null) {

        let element = document.createElement(p_element);


        if (!u.isVoid(p_attributes)) {
            for (let att in p_attributes) { element.setAttribute(att, p_attributes[att]); }
        }

        if (!u.isVoid(p_container)) { module.exports.Attach(element, p_container); }

        return element;
    },

    /**
     * @description Create a clone of an existing DOM element.
     * @param {Node} p_element Node to clone
     * @param {Node} [p_container] Parent node to append the new node into
     */
    ElClone: function (p_element, p_container = null) {
        let element = p_element.cloneNode(true);
        if (!u.isVoid(p_container)) { module.exports.Attach(element, p_container); }
        return element;
    },

    /**
     * @description Appends a dom element into another one
     * @param {Node} p_element The element to be appended
     * @param {Node} p_parent Parent node to append the element into
     */
    Attach: function (p_element, p_parent) {
        if (p_parent._wrapper) { p_parent._wrapper.appendChild(p_element); }
        else { p_parent.appendChild(p_element); }
    },

    AttachAfter: function (p_element, p_refNode) {
        p_refNode.parentNode.insertBefore(p_element, p_refNode.nextSibling);
    },

    AttachBefore: function (p_element, p_refNode) {
        p_refNode.parentNode.insertBefore(p_element, p_refNode);
    },


    /**
     * @description Appends or move an element at the beginning of the display list of another dom element. 
     * Note that if the element provided is not a child of the target parent, it will be removed from its previous parent.
     * @param {Node} p_element The element to be appended or moved
     * @param {Node} p_parent Parent node to append or move the element into
     * @param {boolean} [p_firstChild] If true, attach before the firstChild, otherwise attach before the firstElementChild
     */
    AttachFirst: function (p_element, p_parent, p_firstChild = true) {

        if (p_firstChild && p_parent.firstChild) {
            p_parent.insertBefore(p_element, p_parent.firstChild);
        } else if (!p_firstChild && p_parent.firstElementChild) {
            p_parent.insertBefore(p_element, p_parent.firstElementChild);
        } else {
            p_parent.appendChild(p_element);
        }
    },

    /**
     * Remove a node from its parent, if any
     * @param {Node} p_element 
     */
    Detach: function (p_element) {
        if (!u.isVoid(p_element.parentNode)) {
            p_element.parentNode.removeChild(p_element);
        } else {
            p_element.remove();
        }
    },


    /**
     * @description Move a node at the end (front) of the child list
     * @param {Node} p_node 
     * @param {boolean} [p_frontOfNode] If true, move the node at the front of the last child. Otherwise last childElement.
     */
    ToFront: function (p_node, p_frontOfNode = false) {
        if (!u.isVoid(p_node.parentNode)) {
            if (p_node.parentNode.lastChild != p_node) {
                p_node.parentNode.appendChild(p_node);
            }
            return;
            if (p_frontOfNode) {
                let nodeList = p_node.parentNode.childNodes,
                    index = nodeList.indexOf(p_frontOfNode);
                if (nodeList) {
                    //Need to insertBefore the node after the specified fronOfNode
                    p_node.parentNode.insertAfter(p_node, p_node.parentNode.lastChild);
                } else {
                    p_node.parentNode.appendChild(p_node);
                }
            } else {
                p_node.parentNode.appendChild(p_node);
            }
        } else {
            throw new Error(`Node has no parent.`);
        }
    },

    /**
     * @description Move a node at the beginning (back) of the child list
     * @param {Node} p_node 
     * @param {boolean} [p_backOfNode] If true, move the node at the back of the first child. Otherwise first childElement.
     */
    ToBack: function (p_node, p_backOfNode = false) {
        if (!u.isVoid(p_node.parentNode)) {
            if (p_backOfNode) {
                if (p_node.parentNode.firstChild) {
                    p_node.parentNode.insertBefore(p_node, p_node.parentNode.firstChild);
                } else {
                    p_node.parentNode.appendChild(p_node);
                }
            } else {
                if (p_node.parentNode.firstElementChild) {
                    p_node.parentNode.insertBefore(p_node, p_node.parentNode.firstElementChild);
                } else if (p_node.parentNode.firstChild) {
                    p_node.parentNode.insertBefore(p_node, p_node.parentNode.firstChild);
                } else {
                    p_node.parentNode.appendChild(p_node);
                }
            }
        } else {
            throw new Error(`Node has no parent.`);
        }
    },

    // ----> Rect utils

    /**
     * @description Returns the bouding client rect of a given element, and if provided, relative to another dom element.
     * @customtag slow
     * @param {Node} p_element 
     * @param {Node} [p_relative] 
     */
    Rect: function (p_element, p_relative = null) {

        let domRect = p_element.getBoundingClientRect();
        if (!p_relative) { return domRect; }

        let relDom = p_relative.getBoundingClientRect();
        return DOMRectReadOnly.fromRect({
            x: domRect.x - relDom.x,
            y: domRect.y - relDom.y,
            width: domRect.width,
            height: domRect.height
        });

    },

    /**
     * Set a group or unique attribute value to element
     * @param {HTMLElement} p_element 
     * @param {string|object} p_att 
     * @param {*} p_value 
     */
    SAtt: function (p_element, p_att, p_value = null, p_removeWhenNull = false) {
        if (u.isObject(p_att)) {
            if (u.isString(p_value)) {
                for (let att in p_att) {
                    let value = p_att[att][p_value];
                    if (p_removeWhenNull && value == null) { module.exports.RAtt(p_element, att); }
                    else { p_element.setAttribute(att, value); }
                }
            } else {
                for (let att in p_att) {
                    let value = p_att[att];
                    p_element.setAttribute(att, p_att[att]);
                }
            }

        } else {
            if (p_removeWhenNull && p_value == null) { module.exports.RAtt(p_element, p_att); }
            else { p_element.setAttribute(p_att, p_value); }
        }
    },

    /**
     * Remove a group or unique attribute from element
     * @param {HTMLElement} p_element 
     * @param {string|object} p_att 
     */
    RAtt: function (p_element, p_att) {
        if (u.isObject(p_att)) {
            for (let att in p_att) {
                p_element.removeAttribute(att);
            }
        } else {
            p_element.removeAttribute(p_att);
        }
    },

    // ----> Scrolling

    /**
     * @description TODO
     * @param {Node} p_element 
     * @returns {boolean} True if the element currently overflows over the X axis, otherwise false
     */
    OverflowsY: function (p_element) {
        return p_element.scrollHeight > p_element.clientHeight;
    },

    /**
     * @description TODO
     * @param {Node} p_element 
     * @returns {boolean} True if the element currently overflows over the Y axis, otherwise false
     */
    OverflowsX: function (p_element) {
        return p_element.scrollWidth > p_element.clientWidth;
    },


    //#region  Cookies

    SetCookie: function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    GetCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    EraseCookie: function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    //#endregion


    get isTextHighlighted() {
        let t = module.exports.highlightedText;
        return !u.isVoid(t) && t != '';
    },

    get highlightedText() {
        let txt = '';
        if (window.getSelection) { txt = window.getSelection(); }
        else if (document.getSelection) { txt = document.getSelection(); }
        else if (document.selection) { txt = document.selection.createRange().text; }
        return txt.toString();
    },

    ClearHighlightedText: function () {
        if (window.getSelection) { window.getSelection().removeAllRanges(); }
        else if (document.getSelection) { document.getSelection().removeAllRanges(); }
    },


    //#region Style helpers

    CSS: function (p_el, p_id, p_value = null) {
        if (u.isObject(p_id)) {
            if (u.isArray(p_el)) {
                for (const el of p_el) {
                    for (let p in p_id) { module.exports._TStyle(el, p, p_id[p]); }
                };
            } else {
                for (let p in p_id) { module.exports._TStyle(p_el, p, p_id[p]); }
            }
        } else {
            if (u.isArray(p_el)) {
                for (const el of p_el) {
                    module.exports._TStyle(el, p_id, p_value);
                };
            } else {
                module.exports._TStyle(p_el, p_id, p_value);
            }
        }
    },

    _TStyle: function (p_el, p_id, p_value = null) {
        if (p_value === null || p_value === undefined || p_value === false) { p_el.style.removeProperty(p_id); }
        else { p_el.style.setProperty(p_id, p_value); }
    },

    CSSClass: function (p_el, p_cl, p_toggle = true) {
        if (u.isObject(p_cl)) {
            if (u.isArray(p_el)) {
                for (const el of p_el) {
                    for (let p in p_cl) { module.exports._TClass(el, p, p_cl[p] ? true : false); }
                };
            } else {
                for (let p in p_cl) { module.exports._TClass(p_el, p, p_cl[p] ? true : false); }
            }
        } else {
            if (u.isArray(p_el)) {
                for (const el of p_el) { module.exports._TClass(el, p_cl, p_toggle); };
            } else {
                module.exports._TClass(p_el, p_cl, p_toggle);
            }
        }
    },

    _TClass: function (p_el, p_id, p_toggle = null) {
        if (p_toggle) { p_el.classList.add(p_id); }
        else { p_el.classList.remove(p_id); }
    },

    //#endregion

}