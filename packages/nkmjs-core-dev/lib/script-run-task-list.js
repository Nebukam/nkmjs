const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const NKMjs = require(`./nkm.js`);

const NKMJSPackageConfig = require("./helpers/nkmjs-package-config");
const ScriptBase = require("./script-base");
const RunList = require(`./helpers/run-list`);

class ScriptRunTaskList extends ScriptBase {

    static runOnce = false;

    constructor(p_onComplete = null) {

        super(`run-task-list`, p_onComplete, { requiredArgs: [`task`] });
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let scriptList = NKMjs.projectConfig.tasks[NKMjs.shortargs.task];
        this._log(`task list (${this.scriptList.length}) : ${this.scriptList}\n`);

        this.Run(scriptList, this.End);

    }

}

module.exports = ScriptRunTaskList;