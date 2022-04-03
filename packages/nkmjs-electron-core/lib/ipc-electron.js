'use strict';

const { ipcRenderer } = require('electron');
//const remote = require('@electron/remote/main');
//const { dialog } = require('electron').remote;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof electron.core
 */
class IPCElectron {

    constructor() { }

    Deploy() {
        let RELAY = nkm.actions.RELAY.instance;
        RELAY._ipcOn = this._ipcOn.bind(RELAY);
        RELAY._ipcSend = this._ipcSend.bind(RELAY);
        RELAY._ShowOpenDialog = this._remoteShowOpenDialog.bind(RELAY);
        ipcRenderer.on(nkm.app.APP_MESSAGES.DIALOG_RESPONSE, this._dialogResponse.bind(RELAY));
        ipcRenderer.on(nkm.app.APP_MESSAGES.EXT_CLOSE_WINDOW, this._externalCloseRequest.bind(this));
        ipcRenderer.on(nkm.app.APP_MESSAGES.OPEN_FILE, this._externalOpenFile.bind(this));
    }

    _ipcOn(p_evt, p_fn) {
        ipcRenderer.on(p_evt, p_fn);
    }

    _ipcSend(p_evt, ...args) {
        ipcRenderer.send(p_evt, ...args);
    }

    _remoteShowOpenDialog(p_options) {
        ipcRenderer.send(nkm.app.APP_MESSAGES.OPEN_DIALOG, p_options);
    }

    _dialogResponse(p_evt, p_response) {
        this.__openDialogCallback(p_response);
    }

    _externalCloseRequest(p_evt) {
        nkm.env.APP._OnExternalCloseRequest();
    }

    _externalOpenFile(p_evt, p_data) {
        if (!p_data) { return; }
        if (!p_data.path) { return; }
        nkm.env.APP._OnOpenPathRequest(p_data.path);
    }

}

module.exports = IPCElectron;