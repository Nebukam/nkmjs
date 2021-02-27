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

        this._Bind(this.RunNext);

        if (process.argv.length === 0) {
            this._PrintHelp();
            return;
        }

        this.scriptList = null;
        let taskId = process.argv[0];

        if (`tasks` in NKMjs.projectConfig && taskId in NKMjs.projectConfig.tasks) {
            this.scriptList = NKMjs.projectConfig.tasks[taskId];
        } else if (taskId in NKMjs.coreConfig.tasks) {
            this.scriptList = NKMjs.coreConfig.tasks[taskId];
        } else {
            try {
                this.Run(`./${taskId}`, this.End);
            } catch (e) {
                this._logError(`'${taskId}' is not a valid task name.`)
                this.End();
            }
            return;
        }

        this._log(`task list (${this.scriptList.length}) : ${this.scriptList}\n`);

        this.originalArgs = NKMjs.shortargs;
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
            NKMjs.shortargs = this.originalArgs;
        }

        this.Run(`./${scriptInfos}`, this.RunNext);

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