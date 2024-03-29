const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const ConfigBuilder = require('./helpers/config-builder');

class TaskBundleMainExt extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-main-ext`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.BundleNext);

        this.Run([
            `./task-styles-build`,
            `./task-bundle-externals`,
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        this.configs = [...NKMjs.Get(`web-ext-configs`, [])];
        if (!this.configs || this.configs.length == 0) {
            this.End();
        } else {
            this.BundleNext();
        }

    }

    BundleNext() {

        let conf = this.configs.pop();
        if (!conf) {
            this.End();
            return;
        }

        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_EXT),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./${NKMjs.projectConfig.dirs.src}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.EXT, conf)).toString()
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`,`js`,`entry-bundle.js`), 'utf8')),
            define = {
                [NKMjs.DEFINE_BUILD] : `EXT`,
                [NKMjs.DEFINE_EXT] : true,
                [NKMjs.DEFINE_PWA] : false,
                [NKMjs.DEFINE_WWW] : false,
                [NKMjs.DEFINE_WEB] : false,
                [NKMjs.DEFINE_NODE] : false
            };

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        new Bundler({
            id:`${NKMjs.projectConfig.name} (ext)`,
            input:entryPoint,
            output:NKMjs.InExtBuildRsc(`.${conf.platform}`, `${NKMjs.projectConfig.name}.js`),
            script:this,
            done:this.BundleNext,
            define:define
        });

    }

}

module.exports = TaskBundleMainExt;