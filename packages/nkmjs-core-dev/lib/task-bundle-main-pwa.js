const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const ConfigBuilder = require('./helpers/config-builder');

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

        let 
            buildConfig = NKMjs.Get(`active-buildconf-pwa`, null),
            jsConfig = buildConfig ? buildConfig.config : null,
            entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT_PWA),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./${NKMjs.projectConfig.dirs.src}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.PWA, jsConfig)).toString()
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`,`js`,`entry-bundle.js`), 'utf8')),
            define = {
                [NKMjs.DEFINE_BUILD] : `PWA`
            };

        NKMjs.WriteTempSync(entryPoint, templateContent);
        this._logFwd(NKMjs.Shorten(entryPoint), `+`);

        
        new Bundler({
            id:`${NKMjs.projectConfig.name} (pwa)`,
            input:entryPoint,
            output:NKMjs.InPWABuildRsc(`${NKMjs.projectConfig.name}.js`),
            script:this,
            done:this.End,
            define:define
        });

    }

}

module.exports = TaskBundleMainPWA;