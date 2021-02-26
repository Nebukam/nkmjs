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

        super(`task-fetch-styles`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        // Fetch node_modules dir contents
        this._Bind(this._ProcessModuleContent);

        this._appendArray = NKMjs.shortargs.append ? [] : null;

        this.rootOutput = this.Resolve(NKMjs.projectConfigCompiled.styleLocation);
        console.log(`output to : ${this.rootOutput}`);
        this._report = {};
        new ForEachModule(this.Resolve(`node_modules`), this._ProcessModuleContent);
        console.log(`${this.__localId} copied the following files :`);
        console.log(this._report);
        console.log(`---`);
        
        this.End();

    }

    _ProcessModuleContent(p_nkmConfig) {

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
                this._report[p_nkmConfig.__moduleID] = local;
            }
        }

    }

}

module.exports = TaskFetchStyles;