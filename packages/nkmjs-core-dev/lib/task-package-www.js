'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require("./helpers/fsutils");
const DirCopy = require(`./helpers/dir-copy`);

class TaskPackageWWW extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`package-www`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-build-for-www`
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        // Copy files from web build resource folder into www

        try{ FSUTILS.rmdir(NKMjs.InVersionedBuilds(`www`)); }catch(e){}

        let appRsc = NKMjs.InWebBuildRsc(),
            wwwDir = FSUTILS.ensuredir(NKMjs.InVersionedBuilds(`www`));

        new DirCopy(appRsc, wwwDir, {
            'any': (p_src, p_dest, p_isDir) => { return p_dest; }
        });

        this.End();

    }

}

module.exports = TaskPackageWWW;