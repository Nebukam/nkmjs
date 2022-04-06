'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require(`@nkmjs/actions`);

const CMD_TYPE = require(`../commands/cmd-type`);

class AutosaveHandler {
    constructor(p_manager) {

        this._MANAGER = p_manager;

        this._OnSaveSuccess = this._OnSaveSuccess.bind(this);
        this._OnSaveFail = this._OnSaveError.bind(this);
        this.Advance = this.Advance.bind(this);
        this.AutoSave = this.AutoSave.bind(this);

        this._delayedAdvance = com.DelayedCall(this.Advance);
        this._delayedAutosave = new com.time.DelayedCall(this.AutoSave, 1000 * 600);

        this._isEnabled = false;

    }

    Enable(p_delay = null) {
        if (p_delay != null) { this._delayedAutosave.delay = p_delay; }
        if (!this._isEnabled) { this._delayedAutosave.Schedule(); }
        this._isEnabled = true;
    }

    Disable() {
        this._isEnabled = false;
        this._delayedAutosave.Cancel();
    }

    AutoSave() {
        if (this._running) { return; }
        this._running = true;
        this.Advance();
    }

    Advance() {

        let dirtyDoc = this._MANAGER._dirtyDocuments.last;

        if (!dirtyDoc) {
            this._running = false;
            this._delayedAutosave.Schedule();
            return;
        }

        try {

            dirtyDoc.Save({
                success: this._OnSaveSuccess,
                error: this._OnSaveError
            });


        } catch (e) {

            //Try to save using default command
            let cmd = this._MANAGER._TryGetDefaultCommand(CMD_TYPE.SAVE, dirtyDoc);

            if (!cmd) {
                this._delayedAdvance.Schedule();
            } else {
                cmd.WatchOnce(actions.COMMAND_SIGNAL.END, this._OnCmdEnd, this);
                cmd.Execute(dirtyDoc);
            }

        }



    }

    _OnSaveSuccess() { this.Advance(); }

    _OnSaveError() { this.Advance(); }

    _OnCmdEnd(p_cmd) {
        //p_cmd.Unwatch(actions.COMMAND_SIGNAL.END, this._OnCmdEnd, this);
        this._delayedAdvance.Schedule();
    }

}

module.exports = AutosaveHandler;