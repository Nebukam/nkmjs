const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const ConfigBuilder = require('./helpers/config-builder');

class TaskBundleMainWWW extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bundle-main-www`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-styles-build`,
            `./task-bundle-externals`,
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let buildConfig = NKMjs.Get(`active-buildconf-www`, null),
            jsConfig = buildConfig ? buildConfig.config : null,
            entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_WWW),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./${NKMjs.projectConfig.dirs.src}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.WWW, jsConfig)).toString()
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`, `js`, `entry-bundle.js`), 'utf8')),
            define = {
                [NKMjs.DEFINE_BUILD] : `WWW`,
                [NKMjs.DEFINE_EXT] : false,
                [NKMjs.DEFINE_PWA] : false,
                [NKMjs.DEFINE_WWW] : true,
                [NKMjs.DEFINE_WEB] : true,
                [NKMjs.DEFINE_NODE] : false
            };

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        new Bundler({
            id:`${NKMjs.projectConfig.name} (www)`,
            input:entryPoint,
            output:NKMjs.InWWWBuildRsc(`${NKMjs.projectConfig.name}.js`),
            script:this,
            done:this.End,
            define:define
        });

    }

}

module.exports = TaskBundleMainWWW;