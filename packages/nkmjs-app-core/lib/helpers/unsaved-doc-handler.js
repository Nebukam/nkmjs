'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
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

    }

    CanClose() {
        return documents.DOCUMENTS.lastDirtyDoc ? false : true;
    }

    Advance() {
        let dirtyDoc = documents.DOCUMENTS.lastDirtyDoc;
        if (dirtyDoc) {
            //TODO : Popup to ask if changes should be saved

            let docName = ``;
            if (dirtyDoc.currentData) {
                docName = `${dirtyDoc.currentData}`;
                if (dirtyDoc.currentData.id) { docName = dirtyDoc.currentData.id.name; }
                if (docName == ``) { docName = `${dirtyDoc.currentData}`; }
            }

            dialog.Push({
                title: `Unsaved changes`,
                message: `There are unsaved changes in <span style="color:var(--col-warning-contrast);">${docName}</span>.\nSave before closing?`,
                actions: [
                    { label: `Ignore & Quit`, icon: `clear`, flavor: com.FLAGS.WARNING, trigger: { fn: this._IgnoreAndClose } }, //variant: nkm.ui.FLAGS.FRAME
                    { label: `Save`, icon: `save`, flavor: ui.FLAGS.CTA, trigger: { fn: this._SaveBeforeClosing } }, //variant: nkm.ui.FLAGS.FRAME
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

            } else {
                cmd.Watch(actions.COMMAND_SIGNAL.END, this._OnCmdEnd, this);
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
        p_cmd.Unwatch(actions.COMMAND_SIGNAL.END, this._OnCmdEnd, this);
        this._ClearLastAndAdvance(true);
    }

    _IgnoreAndClose() {
        this._ClearLastAndAdvance(true);
    }

    _ClearLastAndAdvance(p_advance = true) {
        let dirtyDoc = documents.DOCUMENTS.lastDirtyDoc;
        if (dirtyDoc) { dirtyDoc.Release(); }
        if (p_advance) { this.Advance(); }
    }

}

module.exports = UnsavedDocHandler;