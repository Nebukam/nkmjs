'use strict'; 

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskBuildReplaceExternals extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-for-web`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }
        
        this.Run(`./task-build-bundle-html-index`);
        this.Run(`./task-build-pwa-service-worker`);
        this.Run(`./task-build-bundle`, this._OnBundleComplete);

    }

    _OnBundleComplete(){
        // Copy relevant file in target directories
        // uuuh this look like a copy paste
        this.End();
    }

}

module.exports = TaskBuildReplaceExternals;