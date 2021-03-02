'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const chalk = require('chalk');
const NKMjs = require(`./nkm.js`);

const DirCopy = require("./helpers/dir-copy");
const ForEachModule = require("./helpers/foreach-module");

class TaskFetchStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`task-fetch-styles`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Fetch node_modules dir contents
        this._Bind(this._ProcessModuleContent);

        this._log(`--append : ${chalk.blue(NKMjs.shortargs.append ? true : false)}`, 1);
        this._log(`--replace : ${chalk.blue(NKMjs.shortargs.replace ? true : false)}`, 1);

        this._appendArray = NKMjs.shortargs.append ? [] : null;

        this.rootOutput = NKMjs.InProject(NKMjs.projectConfigCompiled.styleLocation);
        this._log(`output to : ${chalk.italic(this.rootOutput)}`, 1);
        this._report = {};
        new ForEachModule(NKMjs.InProject(`node_modules`), this._ProcessModuleContent);
        this._log(`${this.__localId} copied the following files :`);
        console.log(this._report);

        this.End();

    }

    _ProcessModuleContent(p_nkmConfig, p_moduleName) {

        if (!p_nkmConfig.styleLocation) { return; }

        let count = 0,
            c,
            local;

        for (let i = 0, n = p_nkmConfig.styleLocation.length; i < n; i++) {
            c = count;
            local = new Array(0);
            let dirCopy = new DirCopy(
                path.resolve(p_nkmConfig.__modulePath, p_nkmConfig.styleLocation[i]),
                this.rootOutput, {
                '.scss': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; },
                '.css': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; },
                'else': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; }
            },
                NKMjs.shortargs.replace,
                this._appendArray,
                (p_dest) => { return path.extname(p_dest) === `.scss`; });

            if (local.length != 0) {
                for (let i = 0, n = local.length; i < n; i++) {
                    local[i] = NKMjs.Shorten(local[i]);
                }
                this._report[p_moduleName] = local;
            }
        }

    }

}

module.exports = TaskFetchStyles;