'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const Disposable = require(`./disposable`);

const _globalTypes = new collections.Dictionary();
const _globalPool = new collections.DictionaryList();

/**
 * Pool object for all non-ui objects in NKMjs.
 * @class
 * @hideconstructor
 * @memberof common.pool
 */
class POOL {

    /**
     * @access private
     */
    _Init() {
        super._Init();
        this._Bind(this.Return);
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
    Register(p_class) {

        if (!u.isFunc(p_class)) { throw new Error(`Register used with invalid constructor : ${p_class}`); }
        _globalTypes.Set(p_class.name, p_class);
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
    GetClass(p_id) {
        return _globalTypes.Get(p_id);
    }

    /// POOLING ///

    /**
     * @access protected
     * Return a Disposable to the pool, in order to be re-used later.
     * @param {Disposable} p_obj 
     */
    Return(p_obj) {

        if (!u.isObject(p_obj)
            || !u.isInstanceOf(p_obj, Disposable)) { throw new Error("Return used with invalid object : " + p_obj); }

        let keyName = p_obj.constructor.name;

        if (!_globalTypes.Contains(keyName)) { throw new Error("Return used with a never-registered object type : " + keyName); }

        _globalPool.Set(keyName, p_obj);

    }

    /**
     * 
     * @param {constructor|String} p_class Either a class constructor, or its associated string ID.
     * @group Renting
     */
    Rent(p_class) {

        let keyName = null;

        if (u.isString(p_class)) {
            keyName = p_class;
        } else if (typeof p_class === `function`) {
            keyName = p_class.name;
        } else { throw new Error(`Rent requires either a string or a constructor, got: ${p_class}`); }

        if (!_globalTypes.Contains(keyName)) {
            if (typeof p_class === `function`
                && u.isInstanceOf(p_class.prototype, Disposable)) {
                this.Register(p_class);
            } else { throw new Error(`Could not find any constructor association for : ${keyName}`); }
        }

        p_class = _globalTypes.Get(keyName);
        let obj = _globalPool.Pop(keyName);

        if (!obj) {
            obj = new p_class();
            obj._returnFn = this.Return;
        }

        obj._InternalWake?.();
        obj.Wake?.();

        return obj;

    }

    FlushPool(p_class) {

        let keyName = null;

        if (u.isString(p_class)) { keyName = p_class; }
        else if (typeof p_class === `function`) { keyName = p_class.name; }
        else { return; }

        let list = _globalPool.Get(keyName, -1);
        if (list && !list.isEmpty) {
            list.ForEach(item => { item.Dismantle?.(); });
            list.Clear();
        }
    }

    /**
     * 
     * @param {constructor|String} p_class Either a class constructor, or its associated string ID.
     * @group Renting
     */
    Preload(p_class, p_num) {
        for (var i = 0; i < p_num; i++) {
            this.Rent(p_class).Release();
        }
    }

    Stats() {
        let stats = {};
        for (const key in _globalPool.keys()) {
            stats[key] = _globalPool.Count(key);
        }
        console.log(stats);
    }


}

module.exports = new POOL();
