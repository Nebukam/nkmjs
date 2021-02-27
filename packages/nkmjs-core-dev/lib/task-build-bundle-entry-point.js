const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildBundleEntryPoint extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-bundle-entry-point`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT);

        NKMjs.WriteTempSync(entryPoint, `'use strict'; const test = require('./js/main.js');`);

        let bundleEntry = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT),
            replacer = new ReplaceVars({
                js_main: `./js/main`,
                config: ``
            }, NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/js/entry-bundle.js`), 'utf8'));

        NKMjs.WriteTempSync(bundleEntry, templateContent);
        this._logFwd(NKMjs.Shorten(bundleEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildBundleEntryPoint;