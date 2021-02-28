'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);

class TaskBuildCleanup extends ScriptBase {

    static runOnce = false;

    constructor(p_onComplete = null) {

        super(`task-cleanup`, p_onComplete, { skipKey:`no-cleanup` });
        if (this.__hasErrors  || this.__shouldSkip) { return this.End(); }

        while (NKMjs.tempFiles.length != 0) {
            let path = NKMjs.tempFiles.pop();
            try {
                fs.unlinkSync(path);
            } catch (e) {
                this._logError(e);
            }
        }

        this.End();

    }

}

module.exports = TaskBuildCleanup;