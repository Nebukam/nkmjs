'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskBuildForWeb extends ScriptBase {

    constructor() {

        super(`build-for-web`);
        if (this.__hasErrors) { return; }

        this._Bind(this._End);

        //this.Run(`./task-build-core-bundle`);

        // Check which dependencies should be externalized as per config' request
        let externals = ["@nkmjs/core"];

        if (`externals` in NKMjs.coreConfigCompiled) {
            let exs = NKMjs.coreConfigCompiled.externals;
            for (let i = 0, n = exs.length; i < n; i++) { externals.push(exs[i]); }
        }

        if (`externals` in NKMjs.projectConfigCompiled) {
            let exs = NKMjs.projectConfigCompiled.externals;
            for (let i = 0, n = exs.length; i < n; i++) { if (!externals.includes(exs[i])) { externals.push(exs[i]) }; }
        }

        NKMjs.Set(`externals`, externals);

        this.Run(`./task-build-bundle-html-index`);
        this.Run(`./task-build-pwa-service-worker`);
        this.Run(`./task-build-bundle`);

        // Copy relevant file in target directories

        //this._End();

    }

    _End() {
        // Cleanup app folder
        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT)
        try { fs.unlinkSync(entryPoint); } catch (e) { }

        this.Run(`./task-build-cleanup`);
    }

}

new TaskBuildForWeb();