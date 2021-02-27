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


/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBuildBundle extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron-bundle`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        this._Bind(this._OnBundleComplete);

        //TODO : Bundle electron app to avoid pathing issues

        var b = browserify();
        b.add(NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT));
        b.bundle(this._Bind(this._OnBundleComplete));

        /*
                new Bundler(NKMjs.projectConfigCompiled.name,
                    NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
                    NKMjs.InBuilds(`${NKMjs.projectConfigCompiled.name}.js`),
                    NKMjs.InBuilds(`${NKMjs.projectConfigCompiled.name}-min.js`),
                    this._OnBundleComplete,
                    this
                );
                */

    }


    _OnBundleComplete(p_err, p_src) {
        NKMjs.WriteTempSync(NKMjs.InApp(NKMjs.ELECTRON_BUNDLE), p_src.toString());
        this.End();
    }

}

module.exports = TaskBuildBundle;