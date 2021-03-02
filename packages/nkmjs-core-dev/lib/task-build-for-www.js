'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require("./helpers/fsutils");
const DirCopy = require(`./helpers/dir-copy`);

class TaskBuildForWeb extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-for-www`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

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

        this.Run([
            `./task-build-styles`,
            `./task-build-bundle-html-index`,
            `./task-build-pwa-service-worker`,
            `./task-build-webmanifest`,
            `./task-build-bundle`,
            `./task-prepare-www-packing`,
            `./task-package-www`
        ], this._Bind(this._OnBundleComplete));

    }

    _OnBundleComplete() {
        this.End();
    }

}

module.exports = TaskBuildForWeb;