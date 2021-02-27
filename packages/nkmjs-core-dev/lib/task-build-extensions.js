'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require("./helpers/fsutils");

class TaskBuildExtensions extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-extensions`, p_onComplete);
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
            `./task-build-bundle-html-index`,
            `./task-build-pwa-service-worker`,
            `./task-build-bundle`
        ], this._Bind(this._OnBundleComplete));

    }

    _OnBundleComplete() {

        // Copy relevant file in target directories
        // www-0.0.1
        // extension/chrome-0.0.1/
        // extension/mozilla-0.0.1/
        // extension/edge-0.0.1/
        // etc

        let name = (NKMjs.projectConfigCompiled.name || `unamed-app`),
            version = (NKMjs.projectConfigCompiled.__packagejson.version || `0.0.1`),
            dirWWW = NKMjs.InVersionedBuilds(`${name}-www-${version}`),
            dirExtensionChrome = NKMjs.InVersionedBuilds(`extension`, `chrome`),
            dirExtensionEdge = NKMjs.InVersionedBuilds(`extension`, `edge`),
            dirExtensionFirefox = NKMjs.InVersionedBuilds(`extension`, `firefox`),
            dirUnpacked = `unpacked`;

        // zip should be versionned, tho.

        FSUTILS.ensuredir([
            dirWWW,
            dirExtensionChrome,
            `${dirExtensionChrome}${path.sep}${dirUnpacked}`,
            dirExtensionEdge,
            `${dirExtensionEdge}${path.sep}${dirUnpacked}`,
            dirExtensionFirefox,
            `${dirExtensionFirefox}${path.sep}${dirUnpacked}`
        ]);

        NKMjs.Set(`extensions-dir`, NKMjs.InVersionedBuilds(`extension`));

        this.Run(`./task-package-extensions`, this.End);
        
    }

}

module.exports = TaskBuildExtensions;