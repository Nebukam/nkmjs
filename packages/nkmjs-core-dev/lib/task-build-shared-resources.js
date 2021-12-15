'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const DirCopy = require(`./helpers/dir-copy`);

class TaskBuildSharedResources extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-shared-resources`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-styles-build`,
            `./task-prepare-locales`,
            `./task-bundle-externals`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {


        let appRsc = NKMjs.InSharedWebBuildRsc(),
            caches = [...NKMjs.projectConfig.dirs.offline],
            dirStyle = NKMjs.projectConfig.dirs.style,
            dirLocales = NKMjs.projectConfig.dirs.locales;

        if (!caches.includes(dirStyle)) { caches.push(dirStyle); }

        try {
            fs.statSync(NKMjs.InApp(NKMjs.LOCALES_DIR));
            if (!caches.includes(NKMjs.LOCALES_DIR)) { caches.push(NKMjs.LOCALES_DIR); }
        } catch (e) { }

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