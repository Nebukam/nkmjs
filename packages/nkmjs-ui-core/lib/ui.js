'use strict';

const u = require("@nkmjs/utils");
const { List, Dictionary, DictionaryList } = require(`@nkmjs/collections`);
const com = require("@nkmjs/common"); 

const UI_SIGNAL = require(`./ui-signal`);
const DisposableHTMLElement = require(`./disposable-htmlelement`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments common.helpers.SingletonEx
 * @memberof ui.core
 */
class UI extends com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._uiPool = new DictionaryList();
        this._uiTypes = new Dictionary();

        this._dirtyElements = new List(0);

        this._Bind(this._Return);
        this._delayedUpdate = new com.time.DelayedCall(this._Bind(this._UpdateDirty));

    }

    /**
     * @description TODO
     * @param {string} p_id 
     * @param {function} p_class 
     * @param {string} [p_extends] 
     * @group Pooling
     */
    static Register(p_id, p_class, p_extends = `div`) {
        this.instance._Register(p_id, p_class, p_extends);
    }

    /**
     * @description Register custom element
     * @param {string} p_id 
     * @param {DisposableHTMLElement} p_class 
     * @group Pooling
     */
    _Register(p_id, p_class, p_extends = `div`) {

        if (!u.tils.isFunc(p_class)) { throw new Error(`Register used with invalid constructor : ${p_class}`); }
        console.log(p_id);
        this._uiTypes.Set(p_class, p_id);
        customElements.define(p_id, p_class);//, { extends: p_extends });
        //#LOG console.log(`%c+ ${p_class.name} %c<${p_id}>`, 'color: #9000ff', 'color: #b4b4b4');

    }

    /**
     * @description TODO
     * @param {object} p_group 
     * @group Pooling
     */
    static RegisterGroup(p_group) {
        for (let member in p_group) {
            this.instance._Register(member, p_group[member]);
        }
    }

    // ----> Pooling

    /**
     * @access protected
     * @description Return a deprecated DisposableHTMLElement to be re-used later.
     * @param {DisposableHTMLElement} p_displayObject 
     * @group Pooling
     */
    _Return(p_displayObject) {

        if (!u.tils.isObject(p_displayObject)
            || !u.tils.isInstanceOf(p_displayObject, DisposableHTMLElement)) {
            throw new Error(`Return used with invalid object : ${p_displayObject}`);
        }

        let key = p_displayObject.constructor;

        if (!this._uiTypes.Contains(key)) {
            throw new Error(`Return used with a never-registered object type : ${key}`);
        }

        this._uiPool.Set(key, p_displayObject);

    }

    /**
     * @description TODO
     * @param {function} p_class 
     * @param {Element} [p_parent] 
     * @group Pooling
     */
    static Rent(p_class, p_parent = null) {
        return this.instance._Rent(p_class, p_parent);
    }

    /**
     * @description TODO
     * @param {function} p_class 
     * @param {Element} [p_parent] 
     * @group Pooling
     */
    _Rent(p_class, p_parent = null) {

        if (!this._uiTypes.Contains(p_class)) { throw new Error(`${p_class} could not be found.`); }

        let obj = this._uiPool.Pop(p_class);

        if (!obj) {
            obj = new p_class();
            obj._returnFn = this._Return;
        }

        obj.Wake();
        if (p_parent) { p_parent.Add(obj); }

        return obj;

    }

    /**
     * @access private
     * @param {ui.core.DisplayObject} p_element 
     * @group Pooling
     */
    static AddDirty(p_element) {
        if (!p_element) { return; }
        this.instance._AddDirty(p_element);
    }

    /**
     * @access private
     * @param {ui.core.DisplayObject} p_element 
     * @group Pooling
     */
    _AddDirty(p_element) {
        if (this._dirtyElements.Add(p_element)) { this._delayedUpdate.Schedule(); }
    }

    /**
     * @access private
     * @param {ui.core.DisplayObject} p_element 
     * @group Pooling
     */
    _UpdateDirty(p_delta) {
        this._dirtyElements.ForEach((p_item, p_index) => { p_item.ApplyTransforms(); });
        this._dirtyElements.Clear();
    }

    // ----> Data drag handling    

    
    static _dragLength = 0;
    static _dragData = null;
    static _dragTarget = null;

    /**
     * @description TODO
     * @type {*}
     * @group Drag and drop
     */
    static get DRAG_DATA() { return this._dragData; }
    static set DRAG_DATA(p_data) { this._dragData = p_data; }

    /**
     * @description TODO
     * @type {*}
     * @group Drag and drop
     */
    static get DRAG_TARGET() { return this._dragTarget; }
    static set DRAG_TARGET(p_target) { this._dragTarget = p_target; }

    /**
     * @description TODO
     * @type {number}
     * @group Drag and drop
     */
    static get dragLength() { return this._dragLength; }
    static set dragLength(p_value) { this._dragLength = p_value; }

    /**
     * @description TODO
     * @param {*} p_data 
     * @param {*} p_target 
     * @group Drag and drop
     */
    static DragStarted(p_data, p_target) {

        let dLength = 0;
        if (p_data) {
            if (Array.isArray(p_data)) {
                dLength = p_data.length;
            }
        }

        this.dragLength = dLength;

        this.DRAG_DATA = p_data;
        this.DRAG_TARGET = p_target;
        this.instance._Broadcast(UI_SIGNAL.DRAG_STARTED, p_data);
    }

    /**
     * @description TODO
     * @group Drag and drop
     */
    static DragEnded() {
        this.instance._Broadcast(UI_SIGNAL.DRAG_ENDED);
        this.DRAG_DATA = null;
        this.DRAG_TARGET = null;
        this.dragLength = 0;
    }

}

module.exports = UI;
