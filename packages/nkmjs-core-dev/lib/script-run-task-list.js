const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const NKMjs = require(`./nkm.js`);

const NKMJSPackageConfig = require("./helpers/nkmjs-package-config");
const ScriptBase = require("./script-base");

class ScriptRunTaskList extends ScriptBase {
    constructor() {

        super(`run-task-list`, [], [`task`]);
        if (this.__hasErrors) { return; }

        let scriptList = NKMjs.projectConfig.tasks[NKMjs.shortargs.task];

        let cos = chalk.gray(`${this.Ind()}`);
        console.log(cos + chalk.gray(`task list (${scriptList.length}) : ${scriptList}\n`));

        this.rootArgs = NKMjs.shortargs;

        for (let i = 0, n = scriptList.length; i < n; i++) {

            let scriptInfos = scriptList[i];

            if (Array.isArray(scriptInfos)) {
                NKMjs.shortargs = scriptInfos[1];
                scriptInfos = scriptInfos[0];
            } else {
                NKMjs.shortargs = this.rootArgs;
            }

            this.Run(`./${scriptInfos}`);

        }

        // CHECK : https://stackoverflow.com/questions/38032047/how-to-execute-npm-run-command-programmatically

    }
}

new ScriptRunTaskList();