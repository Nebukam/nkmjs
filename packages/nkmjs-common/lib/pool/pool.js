'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const Singleton = require(`../helpers/singleton`);
const DisposableObject = require(`./disposable-object`);

/**
 * Pool singleton object for all non-ui objects in NKMjs.
 * @class
 * @hideconstructor
 * @memberof common.pool
 */
class POOL extends Singleton {
    constructor() { super(); }

    /**
     * @access private
     */
    _Init() {
        super._Init();

        this._globalTypes = new collections.Dictionary();
        this._globalPool = new collections.DictionaryList();

        this._Bind(this._Return);
    }

    /**
     * Registers a class to the pool.  
     * Note that there is only very rare use cases where you may need to manually `Register` a class;
     * as soon as you attempt to `Rent` an object instance, it will be automatically registered
     * if it wasn't already.
     * 
     * The main use case for manual `Register` is to make sure a class instance is accessible 
     * through its string identifier, making it available in contexts that purposefully do no import @nkmjs modules.
     * @param {class} p_class 
     * @group Utils
     */
    static Register(p_class) { this.instance._Register(p_class); }

    /**
     * @access private
     * Register custom class
     * @param {DisposableObject} p_class 
     */
    _Register(p_class) {

        if (!u.isFunc(p_class)) { throw new Error(`Register used with invalid constructor : ${p_class}`); }
        this._globalTypes.Set(p_class.name, p_class);
        //#LOG console.log(`%c+ ${p_class.name}`, 'color: #ff8a00');
    }

    /**
     * Retrieves a class constructor associated with a given ID.  
     * In order for a constructor to be retrievable using `GetClass`, it needs to have been
     * manually registered using `Register` before; or registered automatically
     * through `Rent` before.
     * <div class="tip infos" data-title="Note">If you need to reliably retrieve a constructor 
     * using <code>GetClass</code>, make sure to <code>Register</code> that class before.</div>
     * <div class="tip warning" data-title="Attention">If you find yourself the need to manually 
     * register a class using a string ID, have a look at `{@link common.BINDINGS.SetClass}`, as it is very
     * likely it has been designed for what you need to accomplish</div>
     * @param {string} p_id String ID of the `constructor` to retrieve
     * @returns {Constructor} found `constructor` if any, otherwise `null`.
     * @group Utils
     */
    static GetClass(p_id) { return this.instance._GetClass(p_id); }

    /**
     * @access private
     * @param {*} p_id 
     */
    _GetClass(p_id) {
        return this._globalTypes.Get(p_id);
    }

    /// POOLING ///

    /**
     * @access protected
     * Return a DisposableObject to the pool, in order to be re-used later.
     * @param {DisposableObject} p_obj 
     */
    _Return(p_obj) {

        if (!u.isObject(p_obj)
            || !u.isInstanceOf(p_obj, DisposableObject)) { throw new Error("Return used with invalid object : " + p_obj); }

        let keyName = p_obj.constructor.name;

        if (!this._globalTypes.Contains(keyName)) { throw new Error("Return used with a never-registered object type : " + keyName); }

        this._globalPool.Set(keyName, p_obj);

    }

    /**
     * 
     * @param {constructor|String} p_class Either a class constructor, or its associated string ID.
     * @group Renting
     */
    static Rent(p_class) {
        return this.instance._Rent(p_class);
    }

    /**
     * @access private
     * @description TODO
     * @param {class} p_class 
     * @returns {*} An object of the provided type
     */
    _Rent(p_class) {

        let keyName = null;

        if (u.isString(p_class)) {
            keyName = p_class;
        } else if (typeof p_class === `function`) {
            keyName = p_class.name;
        } else { throw new Error("Rent requires either a string or a constructor."); }

        if (!this._globalTypes.Contains(keyName)) {
            if (typeof p_class === `function`
                && u.isInstanceOf(p_class.prototype, DisposableObject)) {
                this._Register(p_class);
            } else { throw new Error(`Could not find any constructor association for : ${keyName}`); }
        }

        p_class = this._globalTypes.Get(keyName);
        let obj = this._globalPool.Pop(keyName);

        if (!obj) {
            obj = new p_class();
            obj._returnFn = this._Return;
        }

        if ('Wake' in obj) { obj.Wake(); }
        return obj;

    }

    /**
     * 
     * @param {constructor|String} p_class Either a class constructor, or its associated string ID.
     * @group Renting
     */
    static Preload(p_class) {
        return this.instance._Preload(p_class);
    }

    _Preload(p_class, p_num) {
        for (var i = 0; i < p_num; i++) {
            this._Rent(p_class).Release();
        }
    }


}

module.exports = POOL;
