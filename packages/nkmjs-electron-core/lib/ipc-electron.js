'use strict';

const actions = require("@nkmjs/actions");
const { ipcRenderer, remote } = require('electron');
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
        actions.RELAY.instance._ipcOn = this._ipcOn.bind(actions.RELAY.instance);
        actions.RELAY.instance._ipcSend = this._ipcSend.bind(actions.RELAY.instance);
        actions.RELAY.instance._ShowOpenDialog = this._remoteShowOpenDialog.bind(actions.RELAY.instance);
    }

    _ipcOn(p_evt, p_fn) {
        ipcRenderer.on(p_evt, p_fn);
    }

    _ipcSend(p_evt, ...args) {
        ipcRenderer.send(p_evt, ...args);
    }

    _remoteShowOpenDialog(p_options){
        return remote.dialog.showOpenDialog(p_options);
    }

}

module.exports = IPCElectron;