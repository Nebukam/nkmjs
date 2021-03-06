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

class TaskBuildExt extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-ext`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.Entry);
        this._Bind(this.BroadEntry);

        let manifestVersion = (NKMjs.shortargs.manifestVersion || 2);

        this.manifestPreper = `./task-prepare-ext-v${manifestVersion}`;
        this.manifestBuilder = `./task-build-ext-manifest-v${manifestVersion}`;

        try { fs.statSync(NKMjs.InCore(`lib`, `${this.manifestBuilder}.js`)); }
        catch (e) {
            this._logError(`No extension manifest builder found for 'v${this.manifestVersion}', using 'v2' instead.`);
            manifestVersion = 2;
            this.manifestBuilder = `./task-build-ext-manifest-v2`;
            this.manifestPreper = `./task-prepare-ext-v2`;
        }

        NKMjs.Set(`manifestVersion`, manifestVersion);

        this.Run(this.manifestPreper, this._Bind(this._OnConfigReady));

    }

    _OnConfigReady() {

        this.configs = NKMjs.Get(`web-ext-configs`, null);

        if (!this.configs || this.configs.length == 0) {
            this.End();
            return;
        }

        this.Run([
            `./task-prepare-icons`,
            `./task-build-shared-resources`,
            `./task-bundle-main-ext`,
            `./task-build-ext-html`,
            `./task-audit-visible-urls`, // Extensions requires specific permissions in manifest
            this.manifestBuilder,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let output = NKMjs.InVersionedBuilds(`extensions`);

        try { FSUTILS.rmdir(output); } catch (e) { }
        FSUTILS.ensuredir(output);

        for (let i = 0, n = this.configs.length; i < n; i++) {

            let conf = this.configs[i],
                platform = conf.platform,
                extDir = path.resolve(output, platform, `unpacked`);

            FSUTILS.ensuredir(extDir);

            new DirCopy(NKMjs.InSharedWebBuildRsc(), extDir, { 'any': this.Entry });
            new DirCopy(NKMjs.InExtBuildRsc(), extDir, { 'any': this.BroadEntry });
            new DirCopy(NKMjs.InExtBuildRsc(`.${platform}`), extDir, { 'any': this.Entry });
            new DirCopy(NKMjs.InBuildRsc(`icons`), path.resolve(extDir, `icons`), { 'any': this.Entry });

        }

        NKMjs.Set(`extensions-dir`, output);

        this.Run(`./task-package-extensions`, this.End);

    }

    BroadEntry(p_src, p_dest, p_isDir) {
        if (p_isDir && (path.basename(p_src) !== `.ext.rsc` && path.basename(p_src)[0] === `.`)) { return false; }
        return p_dest;
    }

    Entry(p_src, p_dest, p_isDir) {
        return p_dest;
    }

}

module.exports = TaskBuildExt;