'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require("./helpers/fsutils");
const DirCopy = require(`./helpers/dir-copy`);

class TaskBuildSharedResources extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-shared-resources`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-build-styles`,
            `./task-bundle-externals`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {


        let appRsc = NKMjs.InSharedWebBuildRsc(),
            caches = [];

        if (NKMjs.projectConfigCompiled.cacheDirectories) {
            caches = [...NKMjs.projectConfigCompiled.cacheDirectories];
        }
        
        caches.push(NKMjs.projectConfigCompiled.compiledStyleLocation);

        for (let i = 0, n = caches.length; i < n; i++) {
            let cacheDir = caches[i];
            new DirCopy(NKMjs.InApp(cacheDir), path.resolve(appRsc, cacheDir), {
                'any': (p_src, p_dest, p_isDir) => { return p_dest; }
            });
        }

        this.End();

    }

}

module.exports = TaskBuildSharedResources;