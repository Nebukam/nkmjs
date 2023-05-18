'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const collections = nkm.collections;
const u = nkm.u;
const com = nkm.com;

const SIGNAL = require(`../signal`);
const UnresolvedReference = require(`./unresolved-reference`);

class UnresolvedReferenceManager extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._unresolvedURI = {};
        this._waitingOnResolve = new collections.DictionaryList();
    }

    ContainsURI(p_uri) { return this._unresolvedURI.hasOwnProperty(p_uri); }

    Contains(p_data) { return this._waitingOnResolve.Contains(p_data); }

    Get(p_data) { return this._waitingOnResolve.Get(p_data); }

    /**
     * Notify the manager that a new reference has been resolved and
     * can be used to resolve further dependencies, if any.
     * @param {*} p_data 
     * @param {string} p_uri 
     */
    Resolve(p_data, p_uri) {
        let unresolvedRef = this._unresolvedURI[p_uri] || null;
        if (!unresolvedRef) { return; } // No unresolved dependency registered
        unresolvedRef.Resolve(p_data);
    }

    /**
     * @description Registers a missing dependency for a given data.
     * @param {*} p_data 
     * @param {object} p_infos 
     * @param {string} p_infos.uri Unresolved dependency path
     * @param {string} [p_infos.set] Setter
     * @param {Function} [p_infos.fn] Function
     * @param {*} [p_infos.thisArg] thisArg to be used with p_infos.fn
     */
    Add(p_data, p_infos) {

        let uri = p_infos.uri,
            unresolvedRef;

        if (uri in this._unresolvedURI) {
            unresolvedRef = com.Rent(UnresolvedReference);
            unresolvedRef.WatchOnce(SIGNAL.REFERENCE_SOLVED, this._OnReferenceSolved, this);
            this._unresolvedURI[uri] = unresolvedRef;
        } else {
            unresolvedRef = this._unresolvedURI[uri];
        }

        unresolvedRef.Add(p_data, p_infos);
        this._waitingOnResolve.Set(p_data, unresolvedRef);

    }

    /**
     * @access protected
     * @description
     * @param {ecosystem.helpers.UnresolvedReference} p_reference 
     * @param {array} p_dependencies 
     */
    _OnReferenceSolved(p_reference, p_dependencies) {

        delete this._unresolvedURI[p_reference.uri];

        for (let i = 0, n = p_dependencies.length; i < n; i++) {
            let data = p_dependencies[i];
            this._waitingOnResolve.Remove(data, p_reference);
            if (!this._waitingOnResolve.Contains(data)) {
                // Data has no unresolved dependencies at this point
                this.Broadcast(SIGNAL.DATA_REFERENCES_SOLVED, data);
            }
        }
    }

}

module.exports = UnresolvedReferenceManager;