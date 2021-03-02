const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');

class TaskBundleMainPWA extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-main-pwa`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-bundle-externals`,
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_PWA),
            replacer = new ReplaceVars({
                js_main: `./js/main`,
                config: ``
            }, NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs/js/entry-bundle.js`), 'utf8'));

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        new Bundler(`${NKMjs.projectConfigCompiled.name} (pwa)`,
            entryPoint,
            NKMjs.InPWABuildRsc(`${NKMjs.projectConfigCompiled.name}.js`),
            this.End,
            this
        );

    }

}

module.exports = TaskBundleMainPWA;