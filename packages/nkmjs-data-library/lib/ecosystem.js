'use strict';

/**
 * The goal of an ecosystem is to isolate and encapsulate
 * all data-related functionalities in a closed ecosystem such as :
 * - a field manager
 * - a model manager
 * - entries etc
 * These parts are usually singletons but it lack flexbility down the line.
 */
'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const col = nkm.collections;
const u = nkm.u;
const com = nkm.com;
const data = nkm.data;
const actions = nkm.actions;

const helpers = require(`./helpers`);
const parts = require(`./parts`);

const SIGNAL = require(`./signal`);
const IDS = require(`./ids`);

/**
 * @class
 * @augments data.DataBlock
 * @memberof ecosystem
 */
class Ecosystem extends data.DataBlock {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:ecosystem`,
        [com.IDS.ICON]: `ecosystem`
    };

    _Init() {
        super._Init();

        this._unresolvedReferences = new helpers.UnresolvedReferenceManager();
        this._unresolvedReferences.Watch(SIGNAL.DATA_REFERENCES_SOLVED, this._OnDataReferencesSolved, this)

        this._models = new parts.Models();

        this._entries = new parts.Entries();
        this._entries.models = this._models;

    }

    get fields() { return this._fields; }

    get models() { return this._models; }

    get entries() { return this._entries; }

    get catalog() { return this._catalog; }

    //#region References resolution

    HasUnresolvedReferences(p_data) { return this._unresolvedReferences.Contains(p_data); }

    GetUnresolvedReferences(p_data) { return this._unresolvedReferences.Get(p_data); }

    /**
     * @description Registers a missing dependency for a given data.
     * @param {*} p_data 
     * @param {object} p_infos 
     * @param {string} p_infos.uri Unresolved dependency path
     * @param {string} [p_infos.set] Setter
     * @param {Function} [p_infos.fn] Function
     * @param {*} [p_infos.thisArg] thisArg to be used with p_infos.fn
     */
    AddUnresolvedReference(p_data, p_options) {
        this._unresolvedReferences.Add(p_data, p_options);
    }

    // TODO : handle unresolved references
    // - Register unresolved references
    // - listen to an ecosystem parts event
    // - check against unresolved references
    //      - resolve references that be resolved
    //      - if an object has no unresolved references lefts, consider it "fully resolved"
    // - any fully resolved object can then be used to resolve possible unresolved reference to itself

    _OnDataReferencesSolved(p_data) {
        // data is complete & ready !
        this._unresolvedReferences.Resolve(p_data);
    }

    /**
     * Attempts to resolve an ecosystem URI formatted as
     * model/model_id 
     * model/model_id/field_id
     * model/model_id/field_id/id
     * entry/model_id/entry_id
     * entry/model_id/entry_id/field_id
     * @param {*} p_uri 
     */
    Resolve(p_uri) {

        let path = p_uri.split(`/`),
            l = path.length;

        if (l <= 1) { throw new Error(`Malformed URI`); }
        else {

            let cat = path.shift(),
                model = this._models._factory.GetByName(path.shift());

            if (cat === IDS.MODEL) {
                if (path.length != 0) {
                    // URI to model's field
                    let rootField = model.GetFieldByName(path.shift());
                    if (path.length != 0) {
                        // TODO : Recursive function to dive into the model's fields
                        throw new Error(`Not implemented`);
                    } else {
                        return rootField;
                    }
                } else {
                    return model;
                }
            } else if (cat === IDS.ENTRY) {
                let entry = this._entries._libraryMap.Get(model)._factory.GetByName(path.shift());
                if (path.length != 0) {
                    let rootField = model.GetFieldByName(path.shift());
                    if (path.length != 0) {
                        // TODO : Recursive function to dive into the model's fields
                        throw new Error(`Not implemented`);
                    } else {
                        // Use rootField to extract value from entry
                        throw new Error(`Not implemented`);
                    }
                } else {
                    return entry;
                }
            }

        }
    }

    //#endregion

    _CleanUp() {
        ENV.UnregisterEcosystem(this);
        this._models.Clear();
        this._entries.Clear();
        super._CleanUp();
    }

}

module.exports = Ecosystem;