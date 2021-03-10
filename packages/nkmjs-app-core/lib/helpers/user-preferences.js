'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { DisposableObjectEx, SIGNAL, DelayedCall } = require(`@nkmjs/common`);
const { Metadata, DATA_SIGNAL } = require(`@nkmjs/data-core`);
const { DOCUMENTS } = require(`@nkmjs/documents`);

class UserPreferences extends DisposableObjectEx {

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

        this._delayedSave = new DelayedCall(this._Bind(this.Save));

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

        this._document = DOCUMENTS.Get({
            path: `${PATH.USER_DATA}/${p_name}.json`,
            data: Metadata
        });

        this._document.Watch(DATA_SIGNAL.DIRTY, this._OnDocumentDirty, this);

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
        if (this._defaults) { U.SetMissing(this._document.currentData._data, this._defaults); }
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