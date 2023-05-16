'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const Disposable = require(`./disposable-htmlelement`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments common.Observable
 * @memberof ui.core
 */
class UI extends com.Observable { // PORT_TO_MODULE
    constructor() { super(); }

    _Init() {

        super._Init();

        this._uiPool = new collections.DictionaryList();
        this._uiTypes = new collections.Dictionary();
        this._definedSet = new Set();
        this._typeMap = {};

        this._dirtyElements = new collections.List(0);

        this._Bind(this._Return);
        this._delayedUpdate = com.DelayedCall(this._Bind(this._UpdateDirty));

    }

    /**
     * @description TODO
     * @param {string} p_id 
     * @param {function} p_class 
     * @param {string} [p_extends] 
     * @group Pooling
     */
    Register(p_id, p_class) {

        if (!u.isFunc(p_class)) { throw new Error(`Register used with invalid constructor : ${p_class}`); }
        //console.log(p_id);
        this._uiTypes.Set(p_class, p_id);
        //this.Define(p_id, p_class);
        this._typeMap[p_id] = p_class;

        //#LOG console.log(`%c+ ${p_class.name} %c<${p_id}>`, 'color: #9000ff', 'color: #b4b4b4');

    }

    Define(p_id, p_class) {

        if (p_class.__extendsNode) {
            customElements.define(p_id, p_class, { extends: p_class.__extendsNode });
        } else {
            customElements.define(p_id, p_class);//, { extends: p_extends });    
        }

        this._definedSet.add(p_class);

    }

    GetClass(p_id) { return this._typeMap[p_id]; }

    /**
     * @description TODO
     * @param {object} p_group 
     * @group Pooling
     */
    RegisterGroup(p_group) {
        for (let member in p_group) {
            this.Register(member, p_group[member]);
        }
    }

    // ----> Pooling

    /**
     * @access protected
     * @description Return a deprecated Disposable to be re-used later.
     * @param {Disposable} p_displayObject 
     * @group Pooling
     */
    _Return(p_displayObject) {

        if (!u.isObject(p_displayObject)
            || !u.isInstanceOf(p_displayObject, Disposable)) {
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
    Rent(p_class, p_parent = null) {

        if (u.isString(p_class)) { p_class = this._typeMap[p_class]; }

        if (!this._definedSet.has(p_class)) {
            let id = u.tils.ToCustomElementID(p_class.name, true);
            this.Define(id, p_class);
            this.Register(id, p_class);
        }

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
    AddDirty(p_element) {
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

    Preload(p_class, p_count) {
        for (var i = 0; i < p_count; i++) {
            this._Rent(p_class).Release();
        }
    }

    FindFirstParentOfType(p_obj, p_type) {
        if (u.isString(p_type)) { p_type = this.GetClass(p_type); }
        if (!p_type) { return null; }
        p_obj = p_obj.parent;
        while (p_obj != null) {
            if (u.isInstanceOf(p_obj, p_type)) { return p_obj; }
            p_obj = p_obj.parent;
        }
        return p_obj;
    }

}

module.exports = new UI();
