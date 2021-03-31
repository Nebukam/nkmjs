'use strict';

const collections = require(`@nkmjs/collections`);
const u = require("@nkmjs/utils");

const NFOS = require(`../nfos`);
const DisposableObjectEx = require(`../pool/disposable-object-ex`);
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
 *         context:serialization.CONTEXT.SERIALIZER,
 *         kvps:[
 *              { key:serialization.CONTEXT.JSON, binding:JSONSerializer },
 *              { key:serialization.CONTEXT.TEXT, binding:TEXTSerializer }
 *          ]
 *     },
 *     {
 *         context:serialization.CONTEXT.JSON,
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
 * @augments common.pool.DisposableObjectEx
 * @memberof common.helpers
 * 
 */
class BindingKit extends DisposableObjectEx {
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
            context:EDITOR,
            kvps:[
                { key:DATA_CLASS, binding:UI_EDITOR_CLASS }
            ]
        },
        {
            context:serialization.CONTEXT.SERIALIZER,
            kvps:[
                { key:SKEY.JSON, binding:JSONSerializer }
            ]
        },
        {
            context:SKEY.JSON,
            kvps:[
                { key:DATA_CLASS, binding:ThatDataClassSerializer }
            ]
        },
        {
            context:DataBlock,
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
     *     { context:Kitchen, kvps:[ { key:Ustensil, binding:Fork } ] },
     *     { context:DefaultEditor, kvps:[ { key:FooData, binding:FooDataEditor } ] },
     *     { context:DefaultInspector, kvps:[ { key:Bar, binding:BarInspector } ] }
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

        let b = BINDINGS.instance;
        for (let i = 0, n = this._KVPS.length; i < n; i++) {

            let assoc = this._KVPS[i],
                context = assoc.context,
                kvps = assoc.kvps;

            for (let k = 0, n = kvps.length; k < n; k++) {
                let kvp = kvps[k];
                b._Set(context, kvp.key, kvp.binding);

                if (true) {
                    // TODO : REMOVE, FOR DEV ONLY
                    let cName = u.isFunc(context) ? context.name : context,
                        kName = u.isFunc(kvp.key) ? kvp.key.name : kvp.key,
                        vName = u.isFunc(kvp.binding) ? kvp.binding.name : kvp.binding;
                        u.LOG._(`┅ ${cName} ⟼ ${kName} ⤞ ${vName}`, `#7f7f7f`);
                }

            }
        }

        for (let i = 0, n = this._CLASSES.length; i < n; i++) {

            let cl = this._CLASSES[i],
                uid = u.tils.Get(NFOS.Get(cl), `uid`, null);

            if (!uid) { throw new Error(`No valid NFO found for ${this._CLASSES[i]}`); }
            this._classDict.Set(cl, uid);
            b._SetClass(uid, cl);
            u.LOG._(`⧉ ${uid} ⤞ ${cl.name}`, `#7f7f7f`);
        }

        this._deployed = true;
    }

    /**
     * @description Un-register this kit's data & associations from `{@link common.BINDINGS}`
     */
    Conceal() {

        if (!this._deployed) { return; }

        let b = BINDINGS.instance;
        for (let i = 0, n = this._KVPS.length; i < n; i++) {

            let assoc = this._KVPS[i],
                context = assoc.context,
                kvps = assoc.kvps;

            for (let k = 0, n = kvps.length; k < n; k++) {
                let kvp = kvps[k];
                b._Remove(context, kvp.key, kvp.binding);
            }
        }

        let kvps = this._classDict.keys;
        for (let i = 0, n = kvps.length; i < n; i++) {
            b._RemoveClass(this._classDict.Get(kvps[i]));
        }

        this._deployed = false;
    }

    _CleanUp() {
        this.Conceal();
        super._CleanUp();
    }

}

module.exports = BindingKit;