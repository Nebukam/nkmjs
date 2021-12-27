
'use strict';

const u = require(`@nkmjs/utils`);

/**
 * UTILS_DOM is a wrapper class that contains a bunch of utilitary static methods to manipulate the DOM.
 * Since the NKMjs library isn't heavy on DOM manipulation, these are mostly shortcut to common operations such
 * as additions & deletions
 * @class
 * @hideconstructor
 * @memberof utils
 */
class UTILS_DOM {

    constructor() { }

    /**
     * @description Create a DOM Node of a given type with a given set of attributes.
     * @param {string} p_element 
     * @param {object} [p_attributes] inlined attributes & values
     * @param {Node} [p_container] Parent node to append the new node into
     * @example let newNode = this.New(`div`, { class:`foo`, ['data-title']:`bar` });
     * //<div class="foo" data-title:"bar"></div> //dom element
     */
    static El(p_element, p_attributes = null, p_container = null) {

        let element = document.createElement(p_element);

        if (!u.isVoid(p_attributes)) {
            for (let att in p_attributes) { element.setAttribute(att, p_attributes[att]); }
        }

        if (!u.isVoid(p_container)) { this.Attach(element, p_container); }

        return element;
    }

    /**
     * @description Create a clone of an existing DOM element.
     * @param {Node} p_element Node to clone
     * @param {Node} [p_container] Parent node to append the new node into
     */
    static ElClone(p_element, p_container = null) {
        let element = p_element.cloneNode(true);
        if (!u.isVoid(p_container)) { this.Attach(element, p_container); }
        return element;
    }

    /**
     * @description Appends a dom element into another one
     * @param {Node} p_element The element to be appended
     * @param {Node} p_parent Parent node to append the element into
     */
    static Attach(p_element, p_parent) {
        if (`_wrapper` in p_parent) { p_parent._wrapper.appendChild(p_element); }
        else { p_parent.appendChild(p_element); }
    }

    /**
     * @description Appends or move an element at the beginning of the display list of another dom element. 
     * Note that if the element provided is not a child of the target parent, it will be removed from its previous parent.
     * @param {Node} p_element The element to be appended or moved
     * @param {Node} p_parent Parent node to append or move the element into
     * @param {boolean} [p_firstChild] If true, attach before the firstChild, otherwise attach before the firstElementChild
     */
    static AttachFirst(p_element, p_parent, p_firstChild = true) {

        if (p_firstChild && p_parent.firstChild) {
            p_parent.insertBefore(p_element, p_parent.firstChild);
        } else if (!p_firstChild && p_parent.firstElementChild) {
            p_parent.insertBefore(p_element, p_parent.firstElementChild);
        } else {
            p_parent.appendChild(p_element);
        }
    }

    /**
     * Remove a node from its parent, if any
     * @param {Node} p_element 
     */
    static Detach(p_element) {
        if (!u.isVoid(p_element.parentNode)) {
            p_element.parentNode.removeChild(p_element);
        }
    }


    /**
     * @description Move a node at the end (front) of the child list
     * @param {Node} p_node 
     * @param {boolean} [p_frontOfNode] If true, move the node at the front of the last child. Otherwise last childElement.
     */
    static ToFront(p_node, p_frontOfNode = false) {
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
    }

    /**
     * @description Move a node at the beginning (back) of the child list
     * @param {Node} p_node 
     * @param {boolean} [p_backOfNode] If true, move the node at the back of the first child. Otherwise first childElement.
     */
    static ToBack(p_node, p_backOfNode = false) {
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
    }

    // ----> Rect utils

    /**
     * @description Returns the bouding client rect of a given element, and if provided, relative to another dom element.
     * @customtag slow
     * @param {Node} p_element 
     * @param {Node} [p_relative] 
     */
    static Rect(p_element, p_relative = null) {

        let domRect = p_element.getBoundingClientRect();
        if (!p_relative) { return domRect; }

        let relDom = p_relative.getBoundingClientRect();
        return DOMRectReadOnly.fromRect({
            x: domRect.x - relDom.x,
            y: domRect.y - relDom.y,
            width: domRect.width,
            height: domRect.height
        });

    }

    /**
     * Set a group or unique attribute value to element
     * @param {HTMLElement} p_element 
     * @param {string|object} p_att 
     * @param {*} p_value 
     */
    static SAtt(p_element, p_att, p_value) {
        if(u.isObject(p_att)){
            for (let att in p_attributes) { 
                p_element.setAttribute(att, p_attributes[att]); 
            }
        }else{
            p_element.setAttribute(p_att, p_value);
        }
    }

    /**
     * Remove a group or unique attribute from element
     * @param {HTMLElement} p_element 
     * @param {string|object} p_att 
     */
    static RAtt(p_element, p_att) {
        if(u.isObject(p_att)){
            for (let att in p_attributes) { 
                p_element.removeAttribute(att); 
            }
        }else{
            p_element.removeAttribute(p_att);
        }
    }


    // ----> Scrolling

    /**
     * @description TODO
     * @param {Node} p_element 
     * @returns {boolean} True if the element currently overflows over the X axis, otherwise false
     */
    static OverflowsY(p_element) {
        return p_element.scrollHeight > p_element.clientHeight;
    }

    /**
     * @description TODO
     * @param {Node} p_element 
     * @returns {boolean} True if the element currently overflows over the Y axis, otherwise false
     */
    static OverflowsX(p_element) {
        return p_element.scrollWidth > p_element.clientWidth;
    }


    //#region  Cookies

    static SetCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    
    static GetCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    static EraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    //#endregion

}

module.exports = UTILS_DOM;