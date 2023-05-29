/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const col = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const services = require(`@nkmjs/services`);
const actions = require("@nkmjs/actions");
const ui = require("@nkmjs/ui-core");

const REQUEST = require(`./request`);

const _dialogs = [];

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof dialog
 */
class DIALOG extends services.ServiceBase {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._ProcessNext);
        this._inDialog = false;

    }

    _InternalStart() {
        super._InternalStart();
        this._ProcessNext();
    }

    /**
     * @access private
     * @description TODO
     * @param {*} p_options 
     */
    Push(p_options) {

        let dialogOptions = null;

        if (!u.isInstanceOf(p_options, ui.overlays.OverlayOptions)) {
            dialogOptions = ui.overlays.OverlayOptions.Create(p_options);
        } else {
            dialogOptions = p_options;
        }

        if (dialogOptions.origin) {
            //TODO : Allow to push additional popup if they are emitted from the current one
            //and when closed, retrieve the "previous" one.
            //i.e store a LIFO stack of dialogs [A <-> B <-> C]
        }

        if (!_dialogs.AddNew(dialogOptions)) {
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

        let next = _dialogs.shift();

        if (!next) {
            this._inDialog = false;
            return null;
        }

        this._inDialog = true;
        next.Watch(com.SIGNAL.CONSUMED, this._OnDialogConsumed, this);

        actions.Emit(REQUEST.DIALOG,
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

    _OnDialogConsumed(p_dialogOptions) {
        _dialogs.Remove(p_dialogOptions);
        this._inDialog = false;
        this._ProcessNext();
    }



}

module.exports = new DIALOG();