'use strict';

const { U } = require(`@nkmjs/utils`);
const { COMMON_FLAG } = require(`@nkmjs/common`);
const { STYLE } = require(`@nkmjs/style`);
const { DIALOG } = require(`@nkmjs/dialog`);

const DataManipulationCommand = require(`../../commands/command-data`);
const FieldSettingsProxy = require(`../../fields/field-settings-proxy`);
const Model = require(`../../model.js`)

class ModelApply extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    _Init() {

        super._Init();

        this._derivations = new Array(0);
        this._libs = new Array(0);
        this._toBeDeleted = new Array(0);
        this._toBeAdded = new Array(0);
        this._toBeModified = new Array(0);
        this._toBeUntouched = new Array(0);

        this._Bind(this._OnDialogFail);
        this._Bind(this._OnDialogCancel);
        this._Bind(this._OnDialogConfirm);

    }

    set proxy(p_value) { this._proxy = p_value; }
    get proxy() { return this._proxy; }

    CanExecute(p_context) {
        if (!p_context || !this._proxy) { return false; }
        return super.CanExecute(p_context);
    }

    _InternalExecute() {


        let e = this._context.ecosystem;
        let m = e.models;

        //TODO : Clear open editors action stacks to prevent fuckups with history and updated models

        //TODO :
        // - check if model has entries
        //      - if not, just skip everything and save.
        // - check how many entries will be affected
        // - ask user if he's sure ('XXX entries will be affected and saved in their current state.')
        //      - check if any affected entry is currently dirty
        //      - check if any of these entries is currently edited in an editor
        //      - give details about these, because the action stack will be flushed
        // - update field settings
        // - for each field updated, attempt to salvage existing data.
        // - save model file
        // - re-save any affected model that is now dirty (based on the list of entries extracted earlier)
        // - voila ?

        //!!!Check if there are field deletion that can be handled automatically, thus highlighting new dirty entries/

        // Make sure ID is valid.

        if (!this._ValidateID()) {
            return this._Fail(
                this._ErrorDialog(
                    `Invalid ID`,
                    `Check the model ID. It is either invalid as an identifier, or a model with this name already exists.`
                )
            );
        }

        // Check if base has changed.

        if (this._context.base != this._proxy.base) {
            // Make sure this does not create circular references.
            if (m.CheckCircularReference(this._context, this._proxy.base)) {
                return this._Fail(
                    this._ErrorDialog(
                        `Circular reference`,
                        `The selected base (${this._proxy.base.id.name}) would create a circular reference and engulf all life and hope in an instant.<br/>Can't let you do that.`
                    )
                );
            }
        }


        // Check if fields have changed, or meta only

        let proxyFieldList = this._proxy.localFieldList;

        for (let i = 0; i < proxyFieldList.length; i++) {
            let field = proxyFieldList[i];
            if (U.isInstanceOf(field, FieldSettingsProxy)) {
                if (field.isDeletePlanned) {
                    this._toBeDeleted.push(field); //Field is to be delete
                } else {
                    if (field.isDirty || !field.EqualsReference()) {
                        this._toBeModified.push(field); //Field is to be modified
                    } else {
                        this._toBeUntouched.push(field); //Field untouched
                    }
                }
            } else {
                this._toBeAdded.push(field); //Field added
            }
        }

        // Check how many entries will likely be affected

        let models = m.GetDerivations(this._context, this._derivations),
            libs = e.entries.GetLibraries(models, this._libs),
            eCount = 0;
            
        for (let i = 0; i < libs.length; i++) {
            eCount += libs[i].count;
        }

        if (this._context.isTemp) {
            this._AttemptApply();
            return;
        }

        let conf = { color: COMMON_FLAG.WARNING, strong: true },
            str0 = STYLE.TF(`No way back`, conf),
            str1 = STYLE.TF(`${models.length} models`, conf),
            str2 = STYLE.TF(`${eCount} entries`, conf),
            str3 = STYLE.TF(`It cannot be undone.`, conf);

        this._ConfirmDialog(
            str0, // T.F
            `Applying these changes will affect ${str1}, and ${str2}.<br/><br/>`
            + `${this._toBeDeleted.length} fields will be deleted,<br/>`
            + `${this._toBeAdded.length} fields will be added,<br/>`
            + `${this._toBeModified.length} fields will be updated,<br/>`
            + `${this._toBeUntouched.length} fields are left untouched.<br/><br/>`
            + `Are you sure you want to move forward with this ? ${str3}`
        )

    }

    _End() {

        //Clean garbage
        //Do this before calling super in case the Command is reused immediately
        this._derivations.length = 0;
        this._libs.length = 0;

        this._toBeAdded.length = 0;
        this._toBeDeleted.length = 0;
        this._toBeModified.length = 0;
        this._toBeUntouched.length = 0;

        //Call super
        super._End();

    }

    _Apply() {

        let original = this._context,
            proxy = this._proxy,
            ofsList = original.localFieldList,
            pfsList = proxy.localFieldList;

        // 1 - Create new fields
        for (let i = 0, n = this._toBeAdded.length; i < n; i++) {
            let pfs = this._toBeAdded[i],
                ofs = Model.CreateField(original, pfs.fieldClass, pfs.id.name,
                    { settings: U.Clone(pfs.settings), metadata: pfs.metadata });
            pfs.referenceField = ofs;
            ofsList.pop(); //New field added at the end of the list
            ofsList.splice(pfs.fieldIndex, 0, ofs);
        }

        // 2 - Update field order in target model
        // indexes should match proxy since no deletion happened yet
        let fIndex = -1;
        for (let i = 0, n = pfsList.length; i < n; i++) {
            let pfs = pfsList[i];
            U.Move(ofsList, ofsList.indexOf(pfs.referenceField), pfs.fieldIndex);
        }

        // 3 - Remove fields
        for (let i = 0, n = this._toBeDeleted.length; i < n; i++) {
            this._toBeDeleted[i].referenceField.Release();
        }

        // 5 - Apply other modifications
        for (let i = 0, n = this._toBeModified.length; i < n; i++) {
            let pfs = this._toBeModified[i],
                ofs = pfs.referenceField;
            //Update metadata
            if (pfs.metadata.isDirty) {
                ofs.metadata.Clone(pfs.metadata);
            }
            //Update ID
            if (pfs.id.name != ofs.id.name) {
                let tName = pfs.id.name,
                    efs = original.Get(tName, true);
                if (efs && efs != ofs) { efs.id.name = `#`; }
                ofs.id.name = tName;
            }
            //Update type
            if (ofs.fieldClass != pfs.fieldClass) {
                ofs._fieldClass = pfs.fieldClass;
            }
            //Update settings
            //note : it is important to update settings after renaming, as override may have occured
            if (!U.Same(pfs.settings, ofs.settings)) {
                ofs._settings = U.Clone(pfs.settings);
            }
        }

        if (original.isTemp) {
            original.id = null;
            original.ecosystem.models.Register(original, this._proxy.id.name);
        } else {
            original.id.name = this._proxy.id.name;
        }

        original._UpdateLocalFieldIndexes(true);

        return true;

    }

    _ValidateID() {
        let id = this._proxy.id.name;

        if (!U.ValidIdentifier(id)) {
            // Invalid identifier
            return false;
        }

        let existingModel = this._context.ecosystem.models.Get(id);
        if (existingModel) {
            if (existingModel != this._context) {
                // ID Already in use
                return false;
            }
        }

        return true;
    }

    _ErrorDialog(p_title, p_message) {
        DIALOG.Push({
            title: p_title,
            message: p_message,
            [COM_ID.ICON]: `%ICON%/icon_error.svg`,
            actions: [
                { text: `Ok`, trigger: { fn: this._OnDialogFail, arg: p_message }, [COM_ID.ICON]: `%ICON%/icon_close.svg` }
            ]
        });
        return p_message;
    }

    _ConfirmDialog(p_title, p_message) {
        DIALOG.Push({
            title: p_title,
            message: p_message,
            [COM_ID.ICON]: `%ICON%/icon_warning.svg`,
            actions: [
                { text: `Apply.`, trigger: { fn: this._OnDialogConfirm } },
                { text: `Abort !`, trigger: { fn: this._OnDialogCancel }, [COM_ID.ICON]: `%ICON%/icon_close.svg` }
            ]
        });
        return p_message;
    }

    _OnDialogFail(p_msg) {
        //this._Fail(p_msg);
    }

    _OnDialogCancel() {
        this._Cancel();
    }

    _OnDialogConfirm() {
        this._AttemptApply();
    }

    _AttemptApply() {
        if (this._Apply()) {
            this._Success();
        } else {
            this._Fail();
        }
    }
}

module.exports = ModelApply;

