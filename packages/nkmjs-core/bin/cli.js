#!/usr/bin/env node

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const NKMjs = require(`../lib/nkm`);

const ScriptBase = require("../lib/script-base");

class NKMCLI extends ScriptBase {
    constructor() {

        super(`nkmjs-task`, null, null, false);
        if (this.__hasErrors) { return; }

        if (process.argv.length === 0) {
            this._PrintHelp();
            return;
        }

        let scriptList = null,
            taskId = process.argv[0];

        if (`tasks` in NKMjs.projectConfig && taskId in NKMjs.projectConfig.tasks) {
            scriptList = NKMjs.projectConfig.tasks[taskId];
        } else if (taskId in NKMjs.coreConfig.tasks) {
            scriptList = NKMjs.coreConfig.tasks[taskId];
        } else {
            try {
                this.Run(`./${taskId}`);
            } catch (e) {
                console.log(chalk.redBright(`⚠`) + ` '${chalk.bgRed.whiteBright(taskId)}' is not a valid task name.`);
            }
            return;
        }

        let cos = chalk.gray(`${this.Ind()}`);
        console.log(cos + chalk.gray(`task list (${scriptList.length}) : ${scriptList}\n`));

        let originalArgs = NKMjs.shortargs;

        for (let i = 0, n = scriptList.length; i < n; i++) {

            let scriptInfos = scriptList[i];

            if (Array.isArray(scriptInfos)) {
                NKMjs.shortargs = scriptInfos[1];
                scriptInfos = scriptInfos[0];
            } else {
                NKMjs.shortargs = originalArgs;
            }

            this.Run(`./${scriptInfos}`);

        }

        NKMjs.shortargs = originalArgs;
    }

    _PrintHelp() {

        let tasks = null;

        if (`tasks` in NKMjs.projectConfig) {
            console.log(`Local tasks :`);
            tasks = NKMjs.projectConfig.tasks;
            for (var key in tasks) {
                console.log(key);
            }

        } else {
            console.log(`No local tasks available.`);
        }

        console.log(`Global tasks ` + chalk.italic(`@nkmjs <task-id>'`));

        tasks = NKMjs.coreConfig.tasks;
        for (var key in tasks) {
            console.log(key);
        }

    }

}

new NKMCLI();