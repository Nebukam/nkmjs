#!/usr/bin/env node

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const NKMjs = require(`../lib/nkm`);

const ScriptBase = require("../lib/script-base");

class NKMCLI extends ScriptBase {
    constructor() {

        super(`nkmjs`, null, null, false);
        if (this.__hasErrors) { return this.End(); }

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
                this.Run(`./${taskId}`, this.End);
            } catch (e) {
                this._logError(`'${taskId}' is not a valid task name.`)
                this.End();
            }
            return;
        }

        if (scriptList) { 
            for(var i = 0, n = scriptList.length; i < n; i++){
                scriptList[i] = `./${scriptList[i]}`;
            }
            this.Run(scriptList, this.End); 
        }
        else { this.End(); }

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