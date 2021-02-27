'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskBuildReplaceExternals extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-replace-externals`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-build-bundle-html-index`,
            `./task-build-pwa-service-worker`,
            `./task-build-bundle`
        ], this._OnBundleComplete);

    }

    _OnBundleComplete() {
        // Copy relevant file in target directories
        // uuuh this look like a copy paste
        this.End();
    }

}

module.exports = TaskBuildReplaceExternals;