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

    constructor() {

        super(`build-bundle`);
        if (this.__hasErrors) { return; }

        this._Bind(this._Done);

        this.Run(`./task-build-bundle-entry-point`);

        let externals = NKMjs.Get(`externals`, []);
        this.depCount = externals.length + 1;

        if (externals.length != 0) {
            let templateContent = fs.readFileSync(NKMjs.InCore(`configs/js/entry-external.js`), 'utf8'), content;
            for (let i = 0, n = externals.length; i < n; i++) {
                let extModule = externals[i],
                    fName = NKMjs.Sanitize(extModule),
                    rvar = new ReplaceVars({
                        module_index: `${i}`,
                        module_require_path: extModule
                    }),
                    depEntryPoint = NKMjs.InApp(`${fName}.js`);
                fs.writeFileSync(depEntryPoint, rvar.Replace(templateContent));
                new Bundler(extModule,
                    depEntryPoint,
                    NKMjs.InBuilds(`${fName}.js`),
                    NKMjs.InBuilds(`${fName}-min.js`),
                    this._Done,
                    chalk.gray(`${this.Ind()}`)
                );
            }
        }

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT);
        new Bundler(NKMjs.projectConfigCompiled.name,
            NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT),
            NKMjs.InBuilds(`${NKMjs.projectConfigCompiled.name}.js`),
            NKMjs.InBuilds(`${NKMjs.projectConfigCompiled.name}-min.js`),
            this._Done,
            chalk.gray(`${this.Ind()}`)
        );


    }

    _Done(p_bundler) {
        this.depCount--;
        if (this.depCount <= 0) { this._End(); }
    }

    _End() {
        //Clean up
        console.log(`End!`);
        //this.Run(`./task-build-cleanup`);
    }

}

new TaskBuildBundle();