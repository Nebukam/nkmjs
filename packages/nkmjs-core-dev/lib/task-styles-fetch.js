'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const chalk = require('chalk');
const NKMjs = require(`./nkm.js`);
const u = require("@nkmjs/utils");

const DirCopy = require("./helpers/dir-copy");
const ForEachModule = require("./helpers/foreach-module");

class TaskFetchStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`styles-fetch`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Fetch node_modules dir contents
        this._Bind(this._ProcessModuleContent);

        this._log(`--append : ${chalk.blue(NKMjs.shortargs.Has(`append`))}`, 1);
        this._log(`--replace : ${chalk.blue(NKMjs.shortargs.Get(`replace`, false))}`, 1);

        this._appendArray = NKMjs.shortargs.Has(`append`) ? [] : null;

        this.rootOutput = NKMjs.InApp(NKMjs.projectConfig.dirs.styleSource);
        this._log(`output to : ${chalk.italic(this.rootOutput)}`, 1);
        this._report = {};
        new ForEachModule(NKMjs.InProject(`node_modules`), this._ProcessModuleContent, ['@nkmjs/style']);
        this._log(`${this.__localId} copied the following files :`);
        console.log(this._report);

        // TODO : Go over all scss files to find @use directive
        // and hoist them

        this.End();

    }

    _ProcessModuleContent(p_nkmConfig, p_moduleName) {

        if (!p_nkmConfig.sources) { return; }
        if (!p_nkmConfig.sources.styles) { return; }

        let count = 0,
            c,
            local;

        for (let i = 0, n = p_nkmConfig.sources.styles.length; i < n; i++) {
            c = count;
            local = new Array(0);
            let dirCopy = new DirCopy(
                path.resolve(p_nkmConfig.__modulePath, p_nkmConfig.sources.styles[i]),
                this.rootOutput, {
                '.scss': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; },
                '.css': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; },
                'else': (p_src, p_dest, p_isDir) => { local.push(p_dest); return p_dest; }
            },
                NKMjs.shortargs.Get(`replace`, false),
                this._appendArray,
                (p_dest) => {
                    let ext = path.extname(p_dest);
                    if (ext === `.json`) {
                        return (p_dest, p_src) => {
                            return JSON.stringify(
                                u.tils.SetMissing(
                                    JSON.parse(fs.readFileSync(p_src, 'utf8')),
                                    JSON.parse(fs.readFileSync(p_dest, 'utf8')),
                                    1)
                            );
                        }
                    }
                    return ext === `.scss`;
                });

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