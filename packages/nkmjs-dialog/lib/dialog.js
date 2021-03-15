/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const { List, Dictionary } = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const { ServiceBase } = require(`@nkmjs/services`);
const actions = require("@nkmjs/actions");
const ui = require("@nkmjs/ui-core");

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

        let dialogOptions = null;

        if (!u.tils.isInstanceOf(p_options, ui.overlays.OverlayOptions)) {
            dialogOptions = ui.overlays.OverlayOptions.Create(p_options);
            this._ownedDialogData.Set(dialogOptions, true);
        } else {
            dialogOptions = p_options;
        }

        if (dialogOptions.origin) {
            //TODO : Allow to push additional popup if they are emitted from the current one
            //and when closed, retrieve the "previous" one.
            //i.e store a LIFO stack of dialogs [A <-> B <-> C]
        }

        if (!this._dialogs.Add(dialogOptions)) {
            throw Error(`OverlayOptions already exists in stack. Are you trying to push the same dialogInfo multiple times ?`);
        }

        if (this._started) {
            //Only process dialog requests once the service is started
            this._ProcessNext();
        }

        return dialogOptions;
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
        next.Watch(com.SIGNAL.CONSUMED, this._OnDialogConsumed, this);

        actions.Request.Emit(actions.ACTION_REQUEST.DIALOG,
            next,
            this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        let dialog = p_request.options;
        throw new Error(`Unhandled dialog : ${dialog}`);
    }

    _OnRequestSuccess(p_request) {
        //this._Success();
    }

    _OnDialogConsumed(p_dialog) {

        let dialogOptions = p_dialog.options;

        this._dialogs.Remove(p_dialog);
        p_dialog.Release();

        if (this._ownedDialogData.Get(dialogOptions)) {
            this._ownedDialogData.Remove(dialogOptions);
            dialogOptions.Release();
        }

        this._inDialog = false;
        this._ProcessNext();
    }



}

module.exports = DIALOG;