const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');

class TaskBundleMainWWW extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-main-www`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-build-styles`,
            `./task-bundle-externals`,
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_WWW),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./js/main`,
                    config: ``
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs/js/entry-bundle.js`), 'utf8'));

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        new Bundler(`${NKMjs.projectConfig.name} (www)`,
            entryPoint,
            NKMjs.InWWWBuildRsc(`${NKMjs.projectConfig.name}.js`),
            this.End,
            this
        );

    }

}

module.exports = TaskBundleMainWWW;