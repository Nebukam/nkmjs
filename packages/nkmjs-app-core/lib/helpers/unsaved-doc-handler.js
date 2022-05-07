'use strict';

const com = require("@nkmjs/common");
const documents = require(`@nkmjs/documents`);
const ui = require(`@nkmjs/ui-core`);
const dialog = require(`@nkmjs/dialog`);
const actions = require(`@nkmjs/actions`);

class UnsavedDocHandler {
    constructor(p_app) {

        this._app = p_app;

        this._SaveBeforeClosing = this._SaveBeforeClosing.bind(this);
        this._IgnoreAndClose = this._IgnoreAndClose.bind(this);
        this._OnSaveSuccess = this._OnSaveSuccess.bind(this);
        this._OnSaveFail = this._OnSaveError.bind(this);
        this._ClearLastAndAdvance = this._ClearLastAndAdvance.bind(this);

        this._delayedClearAdvance = com.DelayedCall(this._ClearLastAndAdvance );

    }

    CanClose() {
        return documents.DOCUMENTS.lastDirtyDoc ? false : true;
    }

    Advance() {
        let dirtyDoc = documents.DOCUMENTS.lastDirtyDoc;
        if (dirtyDoc) {

            let docName = dirtyDoc.title;

            dialog.Push({
                title: `Unsaved changes`,
                message: `There are unsaved changes in <span style="color:var(--col-warning-contrast);">${docName}</span>.\nSave before closing?`,
                actions: [
                    { label: `Don't save and Quit`, icon: `clear`, flavor: com.FLAGS.WARNING, trigger: { fn: this._IgnoreAndClose } }, //variant: nkm.ui.FLAGS.FRAME
                    { label: `Save and Quit`, icon: `save`, flavor: ui.FLAGS.CTA, trigger: { fn: this._SaveBeforeClosing } }, //variant: nkm.ui.FLAGS.FRAME
                    { label: `Cancel` }
                ],
                icon: `warning`,
                flavor: com.FLAGS.WARNING,
                origin: this,
            });
        } else {
            this._app._OnExternalCloseRequest();
        }
    }

    _SaveBeforeClosing() {
        let dirtyDoc = documents.DOCUMENTS.lastDirtyDoc;

        try {

            dirtyDoc.Save({
                success: this._OnSaveSuccess,
                error: this._OnSaveError
            });

        } catch (e) {

            //Try to save using default command
            let cmd = documents.DOCUMENTS.instance._TryGetDefaultCommand(
                documents.commands.CMD_TYPE.SAVE, dirtyDoc);

            if (!cmd) {
                this._OnSaveError();
            } else {
                cmd.WatchOnce(actions.COMMAND_SIGNAL.END, this._OnCmdEnd, this);
                cmd.Execute(dirtyDoc);
            }

        }
    }

    _OnSaveSuccess() {
        console.log(`Save success.`);
        this._ClearLastAndAdvance(true);
    }

    _OnSaveError() {
        console.error(`Save error.`);
        this._ClearLastAndAdvance(true);
    }

    _OnCmdEnd(p_cmd) {
        console.log(`Save CMD end.`);
        this._ClearLastAndAdvance(true);
    }

    _IgnoreAndClose() {
        this._ClearLastAndAdvance(true);
    }

    _ClearLastAndAdvance(p_advance = true) {
        let dirtyDoc = documents.DOCUMENTS.lastDirtyDoc;
        console.log(`_ClearLastAndAdvance`, documents.DOCUMENTS.instance._dirtyDocuments);
        if (dirtyDoc) { dirtyDoc.Release(); }
        if (p_advance) { this.Advance(); }
    }

}

module.exports = UnsavedDocHandler;