'use strict';

const ui = require(`@nkmjs/ui-core`);
const { DialogBox } = require(`@nkmjs/dialog`);

const APP_MESSAGES = require(`../app-messages.js`);

// Auto update dialog

class AutoUpdateDialogBox extends DialogBox {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);
        let d = this._data;

        RELAY.ipcOn(APP_MESSAGES.AU_ERROR, this._Bind(this._OnAUError));
        RELAY.ipcOn(APP_MESSAGES.AU_CHECKING_FOR_UPDATE, this._Bind(this._OnAUCheckingForUpdate));
        RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_AVAILABLE, this._Bind(this._OnAUUpdateAvailable));
        RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_NOT_AVAILABLE, this._Bind(this._OnAUUpdateNotAvailable));
        RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_DOWNLOADED, this._Bind(this._OnAUUpdateDownloaded));

        RELAY.ipcOn(APP_MESSAGES.AU_CHECK_REQUEST_HANDLED, this._Bind(this._OnAURequestHandled));

        RELAY.ipcSend(APP_MESSAGES.AU_CHECK_REQUEST);

    }

    // ----> Event handling

    _OnAURequestHandled(p_evt, p_arg, p_err) {
        if (p_arg === APP_MESSAGES.AU_NO_SERVER) {
            this._Close();
            return;
        }
    }

    //Error !
    _OnAUError(p_evt, p_arg) {
        this._title.text = `Oops !`;
        this._bodyContent.text = `Encountered a bumper while auto-updating : ${p_arg}`;
        this._ClearHandles();
        this.CreateHandle({ text: `Well then.`, trigger: { fn: this._Close } });
    }

    //Emitted when checking if an update has started.
    _OnAUCheckingForUpdate(p_evt, p_arg) {
        this._title.text = `Checking for update`;
        this._bodyContent.text = `Stand still.`;
    }

    //Emitted when there is an available update. 
    //The update is downloaded automatically.
    _OnAUUpdateAvailable(p_evt, p_arg) {
        this._title.text = `Great !`;
        this._bodyContent.text = `An update was found, it is already downloading in the background.\nYou can either wait for the download to finish or carry on.`;
        this.CreateHandle({ text: `Install now !`, trigger: { fn: this._Close } });
        this.CreateHandle({ text: `Continue working.`, trigger: { fn: this._Close } });
    }

    //Emitted when there is no available update.
    _OnAUUpdateNotAvailable(p_evt, p_arg) {
        //Just close the popup
        this._title.text = `You're all set !`;
        this._bodyContent.text = `No need for update.`;
        this._ClearHandles();
        this.CreateHandle({ text: `Well then.`, trigger: { fn: this._Close } });
    }

    //Emitted when an update has been downloaded.
    _OnAUUpdateDownloaded(p_evt, p_arg) {
        //Change handles to "install now" / "later"
        this._title.text = `Ray-day`;
        this._bodyContent.text = `Update has been downloaded and is ready to be installed.`;
        this._ClearHandles();
        this.CreateHandle({ text: `Install now !`, trigger: { fn: this._Close } });
        this.CreateHandle({ text: `Later.`, trigger: { fn: this._Close } });
    }

    // ---->

    _Clear() {
        super._Clear();
    }

    _CleanUp() {
        super._CleanUp();
    }
}

module.exports = AutoUpdateDialogBox;
ui.Register('nkmjs-auto-update-dialog-box', AutoUpdateDialogBox);