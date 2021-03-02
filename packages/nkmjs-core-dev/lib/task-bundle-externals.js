'use strict';

const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const { minify } = require("terser");
const browserify = require('browserify');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const FSUTILS = require('./helpers/fsutils');

class TaskBundleExternals extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-externals`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.BundleNext);

        this.eIndex = 0;
        this.templateContent = fs.readFileSync(NKMjs.InCore(`configs/js/entry-external.js`), 'utf8');

        this.Run(`./task-prepare-externals`, this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {
        this.modules = [...NKMjs.Get(`externals`, [])];
        this._log(`will split the following modules as externals : ${this.modules.join(`, `)}`)
        this.BundleNext();
    }

    BundleNext() {

        let module = this.modules.shift();

        // Cache previous bundle, if any
        if(this.prevBundleOutput){
            this._log(chalk.blue.italic(`caching ${path.basename(this.prevBundleOutput)}...`), 2);
            FSUTILS.ensuredir(path.dirname(this.prevBundleCachedOutput));
            fs.copyFileSync(this.prevBundleOutput, this.prevBundleCachedOutput);
        }

        if (!module) {
            this.End();
            return;
        }

        let moduleName = `${NKMjs.Sanitize(module)}.js`,
            replacer = new ReplaceVars({
                module_index: `${this.eIndex++}`,
                module_require_path: module
            }),
            entryPoint = NKMjs.InApp(moduleName),
            output = NKMjs.InSharedWebBuildRsc(moduleName),
            cachedOutput = path.resolve(NKMjs.CORE_CACHE_DIR, moduleName);

        // Check cache first
        try {
            fs.statSync(cachedOutput);
            fs.copyFileSync(cachedOutput, output);
            this._log(`${chalk.blue(`using cached version : `)} ${NKMjs.Shorten(cachedOutput)}`, 1);
            this._logFwd(`${NKMjs.Shorten(output)}`, `+`, 2);
            this.prevBundleOutput = null;
            this.BundleNext();
            return;
        } catch (e) { 
            this.prevBundleOutput = output;
            this.prevBundleCachedOutput = cachedOutput;
        }

        NKMjs.WriteTempSync(entryPoint, replacer.Replace(this.templateContent));

        new Bundler(module,
            entryPoint,
            output,
            this.BundleNext,
            this
        );

    }

}

module.exports = TaskBundleExternals;