const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');

class TaskBundleMainExt extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-main-ext`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.BundleNext);

        this.Run([
            `./task-build-styles`,
            `./task-bundle-externals`,
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        this.configs = [...NKMjs.Get(`web-ext-configs`, [])];
        if(!this.configs || this.configs.length == 0 ){
            this.End();
        }else{
            this.BundleNext();
        }

    }

    BundleNext(){

        let conf = this.configs.pop();
        if(!conf){
            this.End();
            return;
        }

        let confContent = ``;
        confContent += ``;

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_EXT),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./js/main`,
                    config: confContent
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs/js/entry-bundle.js`), 'utf8'));

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        new Bundler(`${NKMjs.projectConfig.name} (ext)`,
            entryPoint,
            NKMjs.InExtBuildRsc(`.${conf.platform}`, `${NKMjs.projectConfig.name}.js`),
            this.End,
            this
        );

    }

}

module.exports = TaskBundleMainExt;