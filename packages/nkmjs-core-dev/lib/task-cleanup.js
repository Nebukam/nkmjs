'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);

class TaskBuildCleanup extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`task-cleanup`, null, null, p_onComplete);
        if (this.__hasErrors || NKMjs.shortargs.nocleanup) { return this.End(); }

        while(NKMjs.tempFiles.length != 0){
            let path = NKMjs.tempFiles.pop();
            try{
                fs.unlinkSync(path);
            }catch(e){
                this._logError(e);
            }
        }

        this.End();

    }

}

module.exports = TaskBuildCleanup;