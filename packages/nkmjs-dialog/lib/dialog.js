/**
 * This is the core facade for all system and apps.
 */
'use strict';

const { U } = require(`@nkmjs/utils`);
const { List, Dictionary } = require(`@nkmjs/collections`);
const { POOL } = require(`@nkmjs/common`);
const { ServiceBase } = require(`@nkmjs/services`);
const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);

const DialogInfos = require(`./dialog-infos`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof dialog
 */
class DIALOG extends ServiceBase {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._dialogs = new List();
        this._ownedDialogData = new Dictionary();

        this._Bind(this._ProcessNext);
        this._inDialog = false;

    }

    _Start() {
        if (!super.Start()) { return false; }
        //Some dialog push can occur prior to the service being started
        this._ProcessNext();
        return true;
    }

    /**
     * @description TODO
     * @param {object} p_options 
     */
    static Push(p_options) {
        this.instance._Push(p_options);
    }

    /**
     * @access private
     * @description TODO
     * @param {*} p_options 
     */
    _Push(p_options) {

        let dialogInfos = null;

        if (!U.isInstanceOf(p_options, DialogInfos)) {
            dialogInfos = POOL.Rent(DialogInfos);
            dialogInfos.options = p_options;
            this._ownedDialogData.Set(dialogInfos, true);
        } else {
            dialogInfos = p_options;
        }

        if (dialogInfos.origin) {
            //TODO : Allow to push additional popup if they are emitted from the current one
            //and when closed, retrieve the "previous" one.
            //i.e store a LIFO stack of dialogs [A <-> B <-> C]
        }

        if (!this._dialogs.Add(dialogInfos)) {
            throw Error(`DialogInfos already exists in stack. Are you trying to push the same dialogInfo multiple times ?`);
        }

        if (this._started) {
            //Only process dialog requests once the service is started
            this._ProcessNext();
        }

        return dialogInfos;
    }

    /**
     * @access protected
     * @description TODO
     */
    _ProcessNext() {

        if (this._inDialog) { return null; }

        let next = this._dialogs.Shift();

        if (!next) {
            this._inDialog = false;
            return null;
        }

        this._inDialog = true;
        next.Watch(DialogInfos.CONSUMED, this._OnDialogConsumed, this);

        Request.Emit(ACTION_REQUEST.DIALOG,
            { data: next },
            this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        let dialog = p_request.options.infos;
        throw new Error(`Unhandled dialog : ${dialog}`);
    }

    _OnRequestSuccess(p_request) {
        //this._Success();
    }

    _OnDialogConsumed(p_dialog) {

        let dialogInfos = p_dialog.data;

        this._dialogs.Remove(p_dialog);
        p_dialog.Release();

        if (this._ownedDialogData.Get(dialogInfos)) {
            this._ownedDialogData.Remove(dialogInfos);
            dialogInfos.Release();
        }

        this._inDialog = false;
        this._ProcessNext();
    }



}

module.exports = DIALOG;