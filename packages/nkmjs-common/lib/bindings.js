'use strict';

const { U } = require(`@nkmjs/utils`);
const { DictionaryList, KDictionary, Dictionary } = require(`@nkmjs/collections`);

const SingletonEx = require(`./helpers/singleton-ex`);
const NFOS = require(`./nfos`);
const COM_ID = require(`./common-id`);

/**
 * <div class="tip infos" data-title="Important note">The BINDINGS Singleton is a critical
 * part of the @nkmjs framework. It is used to register & create associations between 
 * pretty much anything.</div>  
 * 
 * 
 * BINDINGS is is primarily used internally to register global association 
 * between content types (models) and components/editors (views/controllers),
 * as well as content types (models) and custom serializers/encoders.  
 * It also play a key role in allowing custom @nkmjs modules to integrate their content,
 * operations, components & overrides seamlessly into the @nkmjs ecosystem. 
 * (more infos : {@tutorial 02-Extending-NKMjs})
 * 
 * Non-exhaustive context list :  
 * * {@link data.core.}
 * @class
 * @hideconstructor
 * @memberof common
 */
class BINDINGS extends SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._classLookup = new Dictionary();
        this._classReverseLookup = new Dictionary();

        this._squashedAssocs = new KDictionary();//Array of squashed associations (as kits get loaded and all)

        this._contextMap = new KDictionary();
        this._contextKeyLists = new DictionaryList();

        this._distanceMap = new KDictionary();

    }


    /**
     * 
     * @param {common.helpers.BindingKit} p_bindings
     * @example //This is what you'll do most of the time in your module's index.js
     * BINDINGS.Expand(require(`./my-module-bindings`));
     */
    static Expand(p_bindings) {
        if (U.isFunc(p_bindings)) { p_bindings = new p_bindings(); }
        p_bindings.Deploy();
    }

    /**
     * @description Map a string identifier to a class constructor.
     * @param {string} p_key identifier
     * @param {function} p_class constructor
     * @returns {function} constructor
     * @group Class repertoire
     * @groupdescription The Class repertoire is merely a small collection of methods to register classes
     * on a global level and have them accessible through a string identifier.  
     * <div class="tip warning" data-title="About serialization">This is critical during the process of serialization/de-serialization, 
     * as serialized data store its string identifier to be deserialized afterward.</div>
     */
    static SetClass(p_key, p_class) { this.instance._SetClass(p_key, p_class); }
    _SetClass(p_key, p_class) {
        this._classLookup.Set(p_key, p_class);
        this._classReverseLookup.Set(p_class, p_key);
    }

    /**
     * Retrieve the class constructor associated with a given string identifier
     * @param {string} p_key 
     * @returns {function}
     * @group Class repertoire
     */
    static GetClass(p_key) { return this.instance._GetClass(p_key); }
    _GetClass(p_key) { return this._classLookup.Get(p_key); }

    /**
     * Retrieve the string identifier associated with a given class constructor, if any.
     * If no identifier could be found, but a UID is present in the class provided,
     * the class will be registered using that UID and its value returned by `GetClassKey`.
     * @param {function} p_class constructor
     * @returns {string} identifier if found, otherwise null
     * @group Class repertoire
     */
    static GetClassKey(p_class) { return this.instance._GetClassKey(p_class); }
    _GetClassKey(p_class) {

        let uid = this._classReverseLookup.Get(p_class);

        if (!uid) {
            uid = U.Get(NFOS.Get(p_class), COM_ID.uid, null);
            if (!uid) { throw new Error(`No valid NFO found for ${p_class}`); }
            this._SetClass(uid, p_class);
        }

        return uid;
    }

    /**
     * @description Removes the class mapped to a given key
     * @param {string} p_key 
     * @returns {function}
     * @group Class repertoire
     */
    static RemoveClass(p_key) { this.instance._RemoveClass(p_key); }
    _RemoveClass(p_key) { this._classLookup.Remove(p_key); }

    /**
     * @description Registers an key-control pair within a given context.
     * @param {*} p_context Context where the key:binding will be set
     * @param {*} p_key key
     * @param {*} p_binding value to bound to p_key in p_context
     * @group Global binding
     * @grouporder -1
     * @groupdescription Collection of method to manipulate the global bindings
     * @example // Maps Fork to Ustensil, in the Kitchen context
     * BINDINGS.Set(Kitchen, Ustensil, Fork)
     * 
     * // The binding can then be retrieved using `Get` 
     * BINDINGS.Get(Kitchen, Ustensil) == Fork
     */
    static Set(p_context, p_key, p_binding) {
        this.instance._Set(p_context, p_key, p_binding);
    }

    /**
     * @access private
     * @param {*} p_context Context where the key:binding will be set
     * @param {*} p_key key
     * @param {*} p_binding value to bound to p_key in p_context
     */
    _Set(p_context, p_key, p_binding) {
        //TODO : Check if a value is being squashed, and store it to restore it on kit concealing
        //console.log(`Set assoc ${p_context}=>${p_key}=${p_control}`);
        this._contextMap.Set(p_context, p_key, p_binding);
        //console.log(`= ${this._contextMap.Get(p_context, p_key)}`);
        this._contextKeyLists.Set(p_context, p_key);
    }

    /**
     * Retrieve the value associated to a given key, within a given context.
     * @param {function} p_context 
     * @param {Function|Object} p_key 
     * @param {*} p_fallback fallback value in case no existing binding is found
     * @param {boolean} p_broad Whether or not to look for alternative matches
     * @group Global binding
     * @example // What's the Ustensil in the Kitchen ?
     * BINDINGS.Get(Kitchen, Ustensil) == Fork
     */
    static Get(p_context, p_key, p_fallback = null, p_broad = true) {
        p_key = U.isFunc(p_key) ? p_key : p_key.constructor;
        if (!U.isFunc(p_key)) { throw new Error(`p_key must be a constructor or have an accessible constructor.`); }
        let result = this.instance._Get(p_context, p_key, p_broad);
        if (!result) { return p_fallback; }
        return result;
    }

    /**
     * @access private
     * @param {function} p_context 
     * @param {Function|Object} p_key 
     * @param {*} p_broad Whether or not to look for alternative matches
     */
    _Get(p_context, p_key, p_broad = true, p_eval = null) {

        let binding = this._contextMap.Get(p_context, p_key);

        if (!binding) {
            if (p_broad) { //&& typeof p_context === 'function'
                //p_borad === true, look for other associations in this context that would fit
                //Ensure we're looking at a constructor context first
                let keyList = this._contextKeyLists.Get(p_context);

                if (!keyList) {
                    //console.warn(`No association found for key:${p_key.name}, context:${p_context.name ? p_context.name : p_context}`);
                    return null;
                }

                let distance = -1,
                    closestDistance = Number.MAX_SAFE_INTEGER;

                for (let i = 0, n = keyList.length; i < n; i++) {
                    let otherKey = keyList[i];
                    distance = this._distanceMap.Get(p_key, otherKey);
                    if (U.isVoid(distance)) {
                        distance = U.InheritanceDistance(p_key, otherKey);
                        this._distanceMap.Set(p_key, otherKey, distance);
                    }
                    if (distance === -1) { continue; }
                    if (distance < closestDistance) {
                        let tResult = this._contextMap.Get(p_context, otherKey);
                        if (tResult) {
                            closestDistance = distance;
                            binding = tResult;
                        }
                    }
                }

                if (!binding) {
                    //TODO : Lookup for alternative contexts that fits and repeat the process.
                    //TODO : store evaluated p_contexts in p_eval to avoid infinite looping   
                }

            }
        }

        return binding;

    }

    /**
     * 
     * @param {*} p_key 
     * @param {*} p_binding 
     * @param {*} p_context 
     * @group Global binding
     */
    static Remove(p_context, p_key, p_binding) {
        this.instance._Remove(p_context, p_key, p_binding);
    }

    /**
     * @access private
     * @param {*} p_key 
     * @param {*} p_binding 
     * @param {*} p_context 
     */
    _Remove(p_context, p_key, p_binding) {
        this._contextMap.Remove(p_context, p_key, p_binding);
        this._contextKeyLists.Remove(p_context, p_key);
        //TODO : Restore any squashed associations
    }

}

module.exports = BINDINGS;
