'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require("./helpers/fsutils");
const DirCopy = require(`./helpers/dir-copy`);

class TaskPrepareWWWPacking extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-www-packing`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let appRsc = NKMjs.InWebBuildRsc(),
            caches = NKMjs.projectConfigCompiled.cacheDirectories;

        if (NKMjs.projectConfigCompiled.cacheDirectories) {
            for (let i = 0, n = caches.length; i < n; i++) {
                let cacheDir = caches[i];
                new DirCopy(NKMjs.InApp(cacheDir), path.resolve(appRsc, cacheDir), {
                    'any': (p_src, p_dest, p_isDir) => { return p_dest; }
                });
            }
        }

        this.End();

    }

}

module.exports = TaskPrepareWWWPacking;