'use strict';

const actions = require("@nkmjs/actions");
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
        ipcRenderer.on(`dialog-response`, this._dialogResponse.bind(RELAY));
    }

    _ipcOn(p_evt, p_fn) {
        ipcRenderer.on(p_evt, p_fn);
    }

    _ipcSend(p_evt, ...args) {
        ipcRenderer.send(p_evt, ...args);
    }

    _remoteShowOpenDialog(p_options){
        ipcRenderer.send(`open-dialog`, p_options);
    }

    _dialogResponse(p_evt, p_response){
        this.__openDialogCallback(p_response);
    }

}

module.exports = IPCElectron;