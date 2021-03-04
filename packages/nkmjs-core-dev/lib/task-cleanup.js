'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const FSUTILS = require("./helpers/fsutils");

class TaskBuildCleanup extends ScriptBase {

    static runOnce = false;

    constructor(p_onComplete = null) {

        super(`cleanup`, p_onComplete, { skipKey:`no-cleanup` });
        if (this.__hasErrors  || this.__shouldSkip) { return this.End(); }

        while (NKMjs.tempFiles.length != 0) {
            let path = NKMjs.tempFiles.pop();
            try {
                let stats = fs.statSync(path);
                if(stats.isDirectory()){ FSUTILS.rmdir(path); }
                else{ fs.unlinkSync(path); }
            } catch (e) {
                this._logError(e);
            }
        }

        FSUTILS.rmdir(NKMjs.InBuildRsc());
        FSUTILS.rmdir(NKMjs.InApp(NKMjs.projectConfig.dirs.style))

        this.End();

    }

}

module.exports = TaskBuildCleanup;