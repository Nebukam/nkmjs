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
        this._defaultsLoadCmd = commands.DocumentLoad.Rent(p_docInfos, true);
        this._defaultsReleaseCmd = commands.DocumentRelease.Rent(p_docInfos, true);

        let
            fileInfos = p_docInfos.fileInfos,
            ext = `.${fileInfos.extensions[0]}`


        this._createCmd = commands.DocumentCreate.Rent({ name: `New ${ext}`, ...p_docInfos });
        this._saveCmd = commands.DocumentSave.Rent({ name: `Save ${ext}`, ...p_docInfos });
        this._loadCmd = commands.DocumentLoad.Rent({ name: `Load ${ext}`, ...p_docInfos });
        this._releaseCmd = commands.DocumentRelease.Rent({ ...p_docInfos });

    }

    get docInfos() { return this._docInfos; }

    get CreateCmd() { return this._createCmd; }
    get SaveCmd() { return this._saveCmd; }
    get LoadCmd() { return this._loadCmd; }
    get ReleaseCmd() { return this._releaseCmd; }

    set defaultSaveLocation(p_value){
        this._saveCmd.defaultSaveLocation = p_value;
        this._defaultsSaveCmd.defaultSaveLocation = p_value;
        this._loadCmd.defaultSaveLocation = p_value;
        this._defaultsLoadCmd.defaultSaveLocation = p_value;
    }

}

module.exports = DocumentDefinition;