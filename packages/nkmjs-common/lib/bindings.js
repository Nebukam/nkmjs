'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const NFOS = require(`./nfos`);
const IDS = require(`./ids`);

////
// Had to make these const instead of embedded static for reason unknown :(
const _classLookup = new collections.Dictionary();
const _classReverseLookup = new collections.Dictionary();

const _squashedAssocs = new collections.KDictionary();//Array of squashed associations (as kits get loaded and all)

const _contextMap = new collections.KDictionary();
const _contextKeyLists = new collections.DictionaryList();

const _contextTemplateMap = new collections.KDictionary();
const _contextTemplateKeysLists = new collections.DictionaryList();

const _distanceMap = new collections.KDictionary();
const _tempSet = new Set();
////

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
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof common
 */
class BINDINGS {
    constructor() { }

    /**
     * @description TODO
     * @param {common.helpers.BindingKit} p_bindings
     * @example //This is what you'll do most of the time in your module's index.js
     * BINDINGS.Expand(require(`./my-module-bindings`));
     */
    static Expand(p_bindings) {
        if (u.isFunc(p_bindings)) { p_bindings = new p_bindings(); }
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
    static SetClass(p_key, p_class) {
        _classLookup.Set(p_key, p_class);
        _classReverseLookup.Set(p_class, p_key);
    }

    /**
     * Retrieve the class constructor associated with a given string identifier
     * @param {string} p_key 
     * @returns {function}
     * @group Class repertoire
     */
    static GetClass(p_key) { return _classLookup.Get(p_key); }

    /**
     * Retrieve the string identifier associated with a given class constructor, if any.
     * If no identifier could be found, but a UID is present in the class provided,
     * the class will be registered using that UID and its value returned by `GetClassKey`.
     * @param {function} p_constructor constructor
     * @returns {string} identifier if found, otherwise null
     * @group Class repertoire
     */
    static GetConstructorKey(p_constructor) {

        if (u.isObject(p_constructor)) { p_constructor = p_constructor.constructor; }
        if (!p_constructor) { throw new Error(`Could not find valid constructor ref in ${p_constructor}`); }

        let uid = _classReverseLookup.Get(p_constructor);

        if (!uid) {
            uid = u.tils.Get(NFOS.Get(p_constructor), IDS.UID, null);
            if (!uid) { throw new Error(`No valid NFO found for ${p_constructor.name}`); }
            this.SetClass(uid, p_constructor);
        }

        return uid;

    }

    static GetSerializerVersion(p_serializer) {
        let nfos = NFOS.Get(p_serializer),
            ver = u.tils.Get(nfos, IDS.VER, -1);

        if (Number.isNaN(ver)) { ver = -1; }

        return ver;
    }

    /**
     * @description Removes the class mapped to a given key
     * @param {string} p_key 
     * @returns {function}
     * @group Class repertoire
     */
    static RemoveClass(p_key) { _classLookup.Remove(p_key); }

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
        //TODO : Check if a value is being squashed, and store it to restore it on kit concealing
        _contextMap.Set(p_context, p_key, p_binding);
        _contextKeyLists.Set(p_context, p_key);
    }

    static SetTemplate(p_context, p_keys, p_binding) {
        _contextTemplateMap.Set(p_context, p_keys, p_binding);
        _contextTemplateKeysLists.Set(p_context, p_keys);
    }

    /**
     * Retrieve the value associated to a given key, within a given context.
     * @param {function} p_context 
     * @param {Function|Object} p_key 
     * @param {*} [p_fallback] fallback value in case no existing binding is found
     * @param {boolean} p_broad Whether or not to look for alternative matches
     * @group Global binding
     * @example // What's the Ustensil in the Kitchen ?
     * BINDINGS.Get(Kitchen, Ustensil) == Fork
     */
    static Get(p_context, p_key, p_fallback = null, p_broad = true) {

        if (!p_context) { throw new Error(`p_context cannot be null.`); }

        if (u.isObject(p_key)) {
            if (p_key.constructor == Object) { return this.GetTemplate(p_context, p_key, p_fallback); }
            p_key = p_key.constructor;
        }

        if (!u.isFunc(p_key)) { throw new Error(`p_key must be a constructor or have an accessible constructor.`); }

        p_context = u.isFunc(p_context) ? p_context : p_context.constructor;
        let binding = _contextMap.Get(p_context, p_key);

        if (!binding && p_broad) {

            //p_broad === true, look for other associations in this context that would fit
            //Ensure we're looking at a constructor context first
            let keyList = _contextKeyLists.Get(p_context);

            if (!keyList) {
                //console.warn(`No association found for key:${p_key.name}, context:${p_context.name ? p_context.name : p_context}`);
                return p_fallback;
            }

            let currentDist = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i <= keyList.length; i++) {

                let
                    key = keyList[i],
                    dist = NFOS.GetSignedDistance(p_key, key);

                if (dist == null) { continue; }

                if (dist > 0 && (dist < currentDist || !binding)) {
                    binding = _contextMap.Get(p_context, key);
                    currentDist = dist;
                }

            }


        }

        return binding ? binding : p_fallback;

    }

    /**
     * 
     * @param {*} p_context 
     * @param {object} p_keys 
     * @param {*} p_fallback 
     */
    static GetTemplate(p_context, p_keys, p_fallback = null) {

        if (!p_context) { throw new Error(`p_context cannot be null.`); }

        let bindings = _contextTemplateKeysLists.Get(p_context);

        if (!bindings) { return p_fallback; }

        outerloop: for (let i = 0; i < bindings.length; i++) {
            let tpl = bindings[i];

            for (var p in tpl) {
                if (!(p in p_keys)) { 
                    continue outerloop; }
            }

            return _contextTemplateMap.Get(p_context, tpl) || p_fallback;
        }

        return p_fallback;

    }

    /**
     * 
     * @param {*} p_key 
     * @param {*} p_binding 
     * @param {*} p_context 
     * @group Global binding
     */
    static Remove(p_context, p_key, p_binding) {
        _contextMap.Remove(p_context, p_key, p_binding);
        _contextKeyLists.Remove(p_context, p_key);
        //TODO : Restore any squashed associations
    }

}

module.exports = BINDINGS;
