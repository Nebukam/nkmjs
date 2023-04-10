'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require(`@nkmjs/actions`);
const commands = require(`../commands`);

class DocumentDefinition {
    constructor(p_manager, p_docInfos) {

        this._MANAGER = p_manager;

        this._docInfos = p_docInfos;

        this._defaultsCreateCmd = commands.DocumentCreate.Rent(p_docInfos, true);
        this._defaultsSaveCmd = commands.DocumentSave.Rent(p_docInfos, true);
        this._defaultsSaveAsCmd = commands.DocumentSaveAs.Rent(p_docInfos, true);
        this._defaultsLoadCmd = commands.DocumentLoad.Rent(p_docInfos, true);
        this._defaultsReleaseCmd = commands.DocumentRelease.Rent(p_docInfos, true);

        let
            fileInfos = p_docInfos.fileInfos,
            ext = `.${fileInfos.extensions[0]}`


        this._createCmd = commands.DocumentCreate.Rent({ name: `New ${ext}`, ...p_docInfos });
        this._saveCmd = commands.DocumentSave.Rent({ name: `Save ${ext}`, ...p_docInfos });
        this._saveAsCmd = commands.DocumentSaveAs.Rent({ name: `Save as ${ext}`, ...p_docInfos });
        this._loadCmd = commands.DocumentLoad.Rent({ name: `Load ${ext}`, ...p_docInfos });
        this._releaseCmd = commands.DocumentRelease.Rent({ ...p_docInfos });

    }

    get docInfos() { return this._docInfos; }

    get CreateCmd() { return this._createCmd; }
    get SaveCmd() { return this._saveCmd; }
    get SaveAsCmd() { return this._saveAsCmd; }
    get LoadCmd() { return this._loadCmd; }
    get ReleaseCmd() { return this._releaseCmd; }

    set bumpOnly(p_value) {
        this._loadCmd.bumpOnly = p_value;
        this._defaultsLoadCmd.bumpOnly = p_value;
    }

    set defaultDialogLocation(p_value) {
        this._saveCmd.defaultDialogLocation = p_value;
        this._defaultsSaveCmd.defaultDialogLocation = p_value;
        
        this._saveAsCmd.defaultDialogLocation = p_value;
        this._defaultsSaveAsCmd.defaultDialogLocation = p_value;

        this._loadCmd.defaultDialogLocation = p_value;
        this._defaultsLoadCmd.defaultDialogLocation = p_value;
    }

}

module.exports = DocumentDefinition;