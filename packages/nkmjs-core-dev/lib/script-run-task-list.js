const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const NKMjs = require(`./nkm.js`);

const NKMJSPackageConfig = require("./helpers/nkmjs-package-config");
const ScriptBase = require("./script-base");

class ScriptRunTaskList extends ScriptBase {
    constructor(p_onComplete = null) {

        super(`run-task-list`, [], [`task`], p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        this._Bind(this.RunNext);

        this.scriptList = NKMjs.projectConfig.tasks[NKMjs.shortargs.task];

        this._log(`task list (${this.scriptList.length}) : ${this.scriptList}\n`);

        this.rootArgs = NKMjs.shortargs;
        this.RunNext();

    }

    RunNext() {

        let scriptInfos = this.scriptList.shift();

        if (!scriptInfos) {
            this.End();
            return;
        }

        if (Array.isArray(scriptInfos)) {
            NKMjs.shortargs = scriptInfos[1];
            scriptInfos = scriptInfos[0];
        } else {
            NKMjs.shortargs = this.rootArgs;
        }

        this.Run(`./${scriptInfos}`, this.RunNext);

    }

}

module.exports = ScriptRunTaskList;