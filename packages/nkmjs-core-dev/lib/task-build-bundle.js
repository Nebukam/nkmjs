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

class TaskBuildBundle extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-bundle`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this._OnExternalBundleComplete);
        this._Bind(this._OnBundleComplete);

        this.Run(`./task-build-bundle-entry-point`);

        this.externals = [...NKMjs.Get(`externals`)];
        this.eIndex = 0;

        if (this.externals.length != 0) {
            this.templateContent = fs.readFileSync(NKMjs.InCore(`configs/js/entry-external.js`), 'utf8');
            this.BundleNext();
        } else {
            this._OnExternalBundleComplete();
        }

    }

    BundleNext() {

        let extModule = this.externals.shift(),
            fName = NKMjs.Sanitize(extModule),
            rvar = new ReplaceVars({
                module_index: `${this.eIndex++}`,
                module_require_path: extModule
            }),
            entryPoint = NKMjs.InApp(`${fName}.js`);

        NKMjs.WriteTempSync(entryPoint, rvar.Replace(this.templateContent));

        new Bundler(extModule,
            entryPoint,
            NKMjs.InWebBuildRsc(`${fName}.js`),
            NKMjs.InWebBuildRsc(`${fName}-min.js`),
            this._OnExternalBundleComplete,
            this
        );

    }

    _OnExternalBundleComplete(p_bundler) {

        if (this.externals.length != 0) {
            this.BundleNext();
            return;
        }

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT);
        
        new Bundler(NKMjs.projectConfigCompiled.name,
            entryPoint,
            NKMjs.InWebBuildRsc(`${NKMjs.projectConfigCompiled.name}.js`),
            NKMjs.InWebBuildRsc(`${NKMjs.projectConfigCompiled.name}-min.js`),
            this._OnBundleComplete,
            this
        );

    }

    _OnBundleComplete(p_bundler) {
        this.End();
    }

}

module.exports = TaskBuildBundle;