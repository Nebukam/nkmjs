const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBuildBundleEntryPoint extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-bundle-entry-point`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT);

        fs.writeFileSync(entryPoint, `'use strict'; const test = require('./js/main.js');`);

        let bundleEntry = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT),
            replacer = new ReplaceVars({
                js_main: `./js/main`,
                config: ``
            }, NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/js/entry-bundle.js`), 'utf8'));

        fs.writeFileSync(bundleEntry, templateContent);
        this._logFwd(NKMjs.Shorten(bundleEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildBundleEntryPoint;