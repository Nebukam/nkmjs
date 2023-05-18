'use strict';

const collections = require(`@nkmjs/collections`);
const u = require("@nkmjs/utils");

const NFOS = require(`../nfos`);
const Observable = require(`../observable`);
const BINDINGS = require(`../bindings`);

/**
 * @typedef BindingKVP
 * @property {*} key i.e 'Ustensil'
 * @property {*} binding i.e 'Fork'
 */

/**
 * @typedef BindingDefinition
 * @property {*} context i.e 'Kitchen'
 * @property {array} kvps An array of {@link BindingKVP}
 */

/**
 * A binding kit is a simple helper class that handle boilerplate code
 * for class registration & global bindings.
 * <pre class="prettyprint" data-title="Example from @nkmjs/data-core bindings"><code>_Init(){ super._Init();
 *
 *     this.AddClasses(
 *         Metadata,
 *         DataBlock
 *     );
 *
 *     this.Add(
 *     {
 *         ctx:s11n.CTX.SERIALIZER,
 *         kvps:[
 *              { key:s11n.CTX.JSON, binding:JSONSerializer },
 *              { key:s11n.CTX.TEXT, binding:TEXTSerializer }
 *          ]
 *     },
 *     {
 *         ctx:s11n.CTX.JSON,
 *         kvps:[
 *             { key:Metadata, binding:MetadataJSONSerializer },
 *             { key:DataBlock, binding:DataBlockJSONSerializer }
 *         ]
 *     });
 *
 *  }
 * </code></pre>
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof common.helpers
 * 
 */
class BindingKit extends Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._deployed = false;
        this._KVPS = [];
        this._CLASSES = [];
        this._classDict = new collections.Dictionary();

        /* KVP Example

        this.AddClass(
            SomeClass
        );

        this.Add({
            ctx:EDITOR,
            kvps:[
                { key:DATA_CLASS, binding:UI_EDITOR_CLASS }
            ]
        },
        {
            ctx:s11n.CTX.SERIALIZER,
            kvps:[
                { key:SKEY.JSON, binding:JSONSerializer }
            ]
        },
        {
            ctx:SKEY.JSON,
            kvps:[
                { key:DATA_CLASS, binding:ThatDataClassSerializer }
            ]
        },
        {
            ctx:DataBlock,
            kvps:[
                { key:'a.meta.property.path', binding:UIControlClass }
            ]
        });

        */

    }

    /**
     * @description Add any number of bindings to this kit.
     * @param  {...BindingDefinition} args 
     * @example this.Add(
     *     { ctx:Kitchen, kvps:[ { key:Ustensil, binding:Fork } ] },
     *     { ctx:DefaultEditor, kvps:[ { key:FooData, binding:FooDataEditor } ] },
     *     { ctx:DefaultInspector, kvps:[ { key:Bar, binding:BarInspector } ] }
     * );
     */
    Add(...args) {
        if (this._deployed) { throw new Error(`Cannot add binding to kit while it is deployed.`); }
        for (let i = 0, n = args.length; i < n; i++) { this._KVPS.push(args[i]); }
    }

    /**
     * @description Add any number of classes to this kit.  
     * Identifier will be fetched from the class' NFO `uid` when the `BindingKit` is deployed.
     * If no NFO is found for a given class, **an error will be thrown**.
     * @param  {...constructor} args 
     * @example this.AddClasses(Foo, Bar);
     */
    AddClasses(...args) {
        if (this._deployed) { throw new Error(`Cannot add binding to kit while it is deployed.`); }
        for (let i = 0, n = args.length; i < n; i++) { this._CLASSES.push(args[i]); }
    }

    /**
     * @description Register this kit's data & associations to `{@link common.BINDINGS}`
     */
    Deploy() {

        if (this._deployed) { return; }

        for (let i = 0, n = this._KVPS.length; i < n; i++) {

            let assoc = this._KVPS[i],
                context = assoc.ctx,
                kvps = assoc.kvps;

            for (const kvp of kvps) { this.constructor._InternalSetBinding(context, kvp); };

        }

        for (const cl of this._CLASSES) { this.constructor._InternalSetClass(cl, this); };

        this._deployed = true;
    }

    static _InternalSetBinding(p_context, p_kvp) {

        if (p_kvp.key) { BINDINGS.Set(p_context, p_kvp.key, p_kvp.binding); }
        if (p_kvp.keys) { BINDINGS.SetTemplate(p_context, p_kvp.keys, p_kvp.binding); }

        if (true) {
            // TODO : REMOVE, FOR DEV ONLY
            let cName = u.isFunc(p_context) ? p_context.name : p_context,
                kName = u.isFunc(p_kvp.key) ? p_kvp.key.name : p_kvp.key,
                vName = u.isFunc(p_kvp.binding) ? p_kvp.binding.name : p_kvp.binding;
            //u.LOG._(`┅ ${cName} ⟼ ${kName} ⤞ ${vName}`, `#7f7f7f`);
        }

    }

    static _InternalSetClass(p_class, p_wrapper = null) {
        let uid = BINDINGS.RegisterFromNFO(p_class);
        if (p_wrapper) { p_wrapper._classDict.Set(p_class, uid); }
    }

    /**
     * @description Un-register this kit's data & associations from `{@link common.BINDINGS}`
     */
    Conceal() {

        if (!this._deployed) { return; }

        for (let i = 0, n = this._KVPS.length; i < n; i++) {

            let assoc = this._KVPS[i],
                context = assoc.ctx,
                kvps = assoc.kvps;

            for (let k = 0, n = kvps.length; k < n; k++) {
                let kvp = kvps[k];
                BINDINGS._Remove(context, kvp.key, kvp.binding);
            }
        }

        let kvps = this._classDict.keys;
        for (let i = 0, n = kvps.length; i < n; i++) {
            BINDINGS._RemoveClass(this._classDict.Get(kvps[i]));
        }

        this._deployed = false;
    }

    _CleanUp() {
        this.Conceal();
        super._CleanUp();
    }

}

module.exports = BindingKit;