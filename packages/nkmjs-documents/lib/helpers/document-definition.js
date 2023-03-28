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
        this._defaultsSaveCmd = commands.DocumentCreate.Rent(p_docInfos, true);
        this._defaultsLoadCmd = commands.DocumentCreate.Rent(p_docInfos, true);
        this._defaultsReleaseCmd = commands.DocumentCreate.Rent(p_docInfos, true);

        let
            fileInfos = p_docInfos.fileInfos,
            ext = `.${fileInfos.extensions[0]}`


        this._createCmd = commands.DocumentCreate.Rent({ name: `New ${ext}`, ...p_docInfos });
        this._saveCmd = commands.DocumentCreate.Rent({ name: `Save ${ext}`, ...p_docInfos });
        this._loadCmd = commands.DocumentCreate.Rent({ name: `Load ${ext}`, ...p_docInfos });
        this._releaseCmd = commands.DocumentCreate.Rent({ ...p_docInfos });

    }

    get docInfos() { return this._docInfos; }

    get CreateCmd() { return this._createCmd; }
    get SaveCmd() { return this._saveCmd; }
    get LoadCmd() { return this._loadCmd; }
    get ReleaseCmd() { return this._releaseCmd; }

}

module.exports = DocumentDefinition;