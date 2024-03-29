'use strict';

const u = require("@nkmjs/utils");
const col = require("@nkmjs/collections");

const dom = require(`./utils-dom`);
const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const DisplayObject = require(`./display-object`);

/**
 * @typedef SignalItemAttached
 * @type ui.core.SIGNAL.CHILD_ATTACHED
 * @property {ui.core.DisplayObjectContainer} parent Parent of the display list
 * @property {ui.core.DisplayObject} target The display object that just got added to the display list
 * @property {number} index display object index inside the display list
 */

/**
 * @typedef SignalItemMoved
 * @type ui.core.SIGNAL.CHILD_MOVED
 * @property {ui.core.DisplayObjectContainer} parent Parent of the display list
 * @property {ui.core.DisplayObject} target The display object that just got moved inside the display list
 * @property {number} index New index inside the display list
 * @property {number} oldIndex Old index inside the display list
 */

/**
 * @typedef SignalItemDetached
 * @type ui.core.SIGNAL.CHILD_DETACHED
 * @property {ui.core.DisplayObjectContainer} parent Parent of the display list
 * @property {ui.core.DisplayObject} target The display object that just got removed to the display list
 * @property {number} index Index of the removed object (before removal)
 */

const base = DisplayObject;

/**
 * A DisplayObjectContainer is `{@link ui.code.DisplayObject}` that manages an internal list of DisplayObjects childs.
 * You can `{@link ui.code.DisplayObjectContainer.Attach|Attach}`, `{@link ui.code.DisplayObjectContainer.Move|Move}` & `{@link ui.code.DisplayObjectContainer.Detach|Detach}`
 * child objects using either a string ID pointing to constructor definition in the `{@link ui.code.UI|UI}`, a reference to a constructor, or an instance of the latter.
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObject
 * @memberof ui.core
 * @signal SignalItemAttached Broadcasted right after a chlid was added to the display list
 * @signal SignalItemMoved Broadcasted right after a child was moved inside the display list
 * @signal SignalItemDetached Broadcasted right after a child was removed from the display list
 */
class DisplayObjectContainer extends base {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._displayList = [];
    }

    _PostInit() {
        super._PostInit();
        if (!this._wrapper) { this._wrapper = this._host; }
    }

    // ----> Child Management

    /**
     * @description The number of current child in this DisplayObjectContainer
     * @customtag read-only
     * @type {number}
     * @group Child Management
     */
    get length() { return this._displayList.length; }

    /**
     * @description <div class="tip warning" data-title="Important">This property is exposed for iteration purposes only.
     * If you want to add/remove/move element, do so using `Add`, `Move` and `Remove` methods.</div>
     * 
     * The DisplayObjectContainer' display list.
     * @customtag read-only
     * @type {Array}
     * @group Child Management
     */
    get displayList() { return this._displayList; }

    /**
     * @description Return the display object at the given index.
     * @param {number} p_index 
     * @returns {ui.core.DisplayObject|ui.core.DisplayObject}
     * @group Child Management
     */
    At(p_index) { return this._displayList[p_index]; }

    /**
     * @description TODO
     * @param {ui.core.DisplayObject} p_displayObject 
     * @param {*} [p_container] parent DOM Element
     * @param {string} [p_cssClass] css class to be added to the display object upon addition
     * @param {number} [p_index] Index inside the display list at which the item should be inserted
     * @example //Working with existing objects 
     * 
     * let myDisplayObject = ... ; // Any existing DisplayObject
     * let myContainer = ... ; // Any existing DisplayObjectContainer
     * myContainer.Attach(myDisplayObject);
     * @example //Working with an existing container
     * 
     * let myContainer = ... ; // Any existing DisplayObjectContainer
     * myContainer.Attach(DisplayObjectConstructor, 'css-class1 css-class2');
     * @example //Working with an existing container
     * //and adding the child to a specific DOM element
     * 
     * let myContainer = ... ; // Any existing DisplayObjectContainer
     * let myDomElement = ... ; // Any existing DOM Element
     * myContainer.Attach(DisplayObjectConstructor, 'css-class1 css-class2', myDomElement);
     * @group Child Management
     */
    Attach(p_displayObject, p_cssClass = null, p_container = null, p_index = -1) {

        if (p_index >= this._displayList.length || p_index < 0) { p_index = -1; }

        if (u.isFunc(p_displayObject) && u.isInstanceOf(p_displayObject, HTMLElement)) {
            p_displayObject = UI.Rent(p_displayObject);
        }

        if (!p_displayObject) { throw new Error(`Cannot Add an empty display object (${p_displayObject}).`); }

        if (this._displayList.includes(p_displayObject)) {
            if (p_index === -1) { return p_displayObject; }
            this.Move(p_displayObject, p_index);
            return p_displayObject;
        }

        if (!p_container || p_container === this) {
            p_container = this._wrapper;
        } else if (u.isInstanceOf(p_container, DisplayObjectContainer)) {
            p_container = p_container.wrapper;
        }

        if (p_index === -1) {
            this._displayList.Add(p_displayObject);
            p_index = this._displayList.length - 1;

            try { p_container.appendChild(p_displayObject); } catch (err) {
                console.log(p_displayObject);
                throw err;
            }
        }
        else {
            this._displayList.AddAt(p_displayObject, p_index);
            p_container.insertBefore(p_displayObject, this._displayList[p_index]);
        }

        p_displayObject.parent = this;

        if (p_cssClass) {
            if (p_cssClass.includes(' ')) { p_displayObject.classList.add(...p_cssClass.split(' ')); }
            else { p_displayObject.classList.add(p_cssClass); }
        }

        this._OnChildAttached?.(p_displayObject, p_index);
        this.Broadcast(SIGNAL.CHILD_ATTACHED, this, p_displayObject, p_index);

        return p_displayObject;

    }

    /**
     * @description Move a display object inside the display list.
     * @param {ui.core.DisplayObject} p_displayObject 
     * @param {number} p_index 
     * @group Child Management
     */
    Move(p_displayObject, p_index) {
        if (!this._displayList.includes(p_displayObject)) {
            throw new Error(`Provided display object is not a child of this container.`);
        }
        //TODO : Implement Move
        let p_oldIndex = p_index;
        console.warning("DisplayObject.Move is not implemented.");
        this._OnChildMoved?.(p_displayObject, p_index, p_oldIndex);
        this.Broadcast(SIGNAL.CHILD_MOVED, this, p_displayObject, p_index, p_oldIndex);
    }

    /**
     * @description Remove a display object from the display list.
     * @param {ui.core.DisplayObject} p_displayObject 
     * @group Child Management
     */
    Detach(p_displayObject) {
        let index = this._displayList.indexOf(p_displayObject);
        if (index === -1) { return p_displayObject; }
        return this.DetachAt(index);
    }

    /**
     * @description Remove a display object at a specific index in the display list, and return that element.
     * @param {number} p_index Index to be removed
     * @returns {ui.core.DisplayObject}
     * @group Child Management
     */
    DetachAt(p_index) {

        if (p_index < 0 || p_index >= this._displayList.length) { return null; }

        let removedDisplayObject = this._displayList.RemoveAt(p_index);

        if (removedDisplayObject.parent === this) {
            removedDisplayObject.parent = null;
            dom.Detach(removedDisplayObject);
        }

        this._OnChildDetached?.(removedDisplayObject, p_index);
        this.Broadcast(SIGNAL.CHILD_DETACHED, this, removedDisplayObject, p_index);

        return removedDisplayObject;

    }

    /**
     * @description Releases all children of the displayList
     * @param {number} p_index Index to be removed
     * @returns {ui.core.DisplayObject}
     * @group Child Management
     */
    DetachAll() {
        while (this._displayList.length) { this._displayList.last.Release(); }
    }

}

module.exports = DisplayObjectContainer;
//UI.Register(`nkmjs-display-object-container`, DisplayObjectContainer);