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

class TaskBuildWWW extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-ext`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.Entry);

        let manifestVersion = (NKMjs.shortargs.manifestVersion || 2),
            manifestBuilder = `./task-build-ext-manifest-v${manifestVersion}`;

        try { fs.statSync(NKMjs.InCore(`lib`, `${manifestBuilder}.js`)); }
        catch (e) {
            this._logError(`No extension manifest builder found for 'v${manifestVersion}', using 'v2' instead.`);
            manifestBuilder = `./task-build-ext-manifest-v2`;
        }

        this.Run([
            `./task-prepare-icons`,
            `./task-build-shared-resources`,
            `./task-bundle-main-ext`,
            `./task-build-ext-html`,
            `./task-audit-visible-urls`, // Extensions requires specific permissions in manifest
            manifestBuilder,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let output = NKMjs.InVersionedBuilds(`extensions`),
            list = [`chrome`, `firefox`, `edge`];

        try { FSUTILS.rmdir(output); } catch (e) { }
        FSUTILS.ensuredir(output);

        for (let i = 0, n = list.length; i < n; i++) {

            let platform = list[i],
                extDir = path.resolve(output, platform, `unpacked`);

            FSUTILS.ensuredir(extDir);

            new DirCopy(NKMjs.InSharedWebBuildRsc(), extDir, { 'any': this.Entry });
            new DirCopy(NKMjs.InExtBuildRsc(), extDir, { 'any': this.Entry });
            new DirCopy(NKMjs.InBuildRsc(`icons`), path.resolve(extDir, `icons`), { 'any': this.Entry });

        }

        NKMjs.Set(`extensions-dir`, output);

        this.Run(`./task-package-extensions`, this.End);
        
    }

    Entry(p_src, p_dest, p_isDir) {
        return p_dest;
    }

}

module.exports = TaskBuildWWW;