'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const documents = require(`@nkmjs/documents`);

class UserPreferences extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._document = null;
        this._waitForThen = false;

        this._initFn = null;
        this._thenFn = null;

        this._Bind(this._OnDocumentLoadSuccess);
        this._Bind(this._OnDocumentLoadError);
        this._Bind(this._OnDocumentSaveSuccess);
        this._Bind(this._OnDocumentSaveError);

        this._delayedSave = new com.time.DelayedCall(this._Bind(this.Save));

    }

    /**
     * 
     * @param {string} p_name 
     * @param {function} p_initFn 
     * @param {function} p_thenFn 
     */
    Load(p_name, p_defaults, p_initFn, p_thenFn) {

        this._initFn = p_initFn;
        this._thenFn = p_thenFn;
        this._defaults = p_defaults;

        this._waitForThen = true;

        this._document = documents.DOCUMENTS.Get({
            path: `${u.PATH.USER_DATA}/${p_name}.json`,
            data: data.Metadata
        });

        this._document.Watch(data.SIGNAL.DIRTY, this._OnDocumentDirty, this);

        this._document.Load({
            success: this._OnDocumentLoadSuccess,
            error: this._OnDocumentLoadError
        });

    }

    _OnDocumentLoadSuccess() {
        // Force an initialization of parameters, so if any has been added
        // to the app, they will be present.
        this.Init();
        this._Then();
    }

    _OnDocumentLoadError(e) {
        this.Init();
    }

    Init() {
        if (this._defaults) { u.tils.SetMissing(this._document.currentData._data, this._defaults); }
        this._initFn(this._document.currentData);
        this._document.Dirty();
    }

    Save() {
        this._document.Save({
            success: this._OnDocumentSaveSuccess,
            error: this._OnDocumentSaveError
        });
    }

    _OnDocumentSaveSuccess() {
        this._Then();
    }

    // Definitely something wrong going on.
    _OnDocumentSaveError(p_err) { throw p_err; }

    _Then() {
        if (this._waitForThen) { this._thenFn(this._document.currentData); }
        this._waitForThen = false;
    }

    _OnDocumentDirty() {
        this._delayedSave.Schedule();
    }

}

module.exports = UserPreferences;