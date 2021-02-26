'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskBuildForWeb extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-for-web`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

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
        this.Run(`./task-build-bundle`, this._Bind(this._OnBundleComplete));

    }

    _OnBundleComplete() {

        // Copy relevant file in target directories
        // www-0.0.1
        // extension-chrome-0.0.1
        // extension-mozilla-0.0.1
        // extension-edge-0.0.1
        // etc
        
        this.End();
    }

}

module.exports = TaskBuildForWeb;