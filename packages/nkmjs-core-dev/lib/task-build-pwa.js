const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const FSUTILS = require('./helpers/fsutils');
const DirCopy = require('./helpers/dir-copy');

class TaskBuildPWA extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.Entry);

        this.Run([
            `./task-prepare-icons`,
            `./task-build-shared-resources`,
            `./task-bundle-main-pwa`,
            `./task-build-pwa-html`,
            `./task-build-pwa-service-worker`,
            `./task-build-pwa-webmanifest`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let output = NKMjs.InVersionedBuilds(`pwa`);

        try { FSUTILS.rmdir(output); } catch (e) { }
        FSUTILS.ensuredir(output);

        new DirCopy(NKMjs.InSharedWebBuildRsc(), output, { 'any': this.Entry });
        new DirCopy(NKMjs.InPWABuildRsc(), output, { 'any': this.Entry });
        new DirCopy(NKMjs.InBuildRsc(`icons`), path.resolve(output, `icons`), { 'any': this.Entry });

        this.End();
    }

    Entry(p_src, p_dest, p_isDir) {
        return p_dest;
    }

}

module.exports = TaskBuildPWA;