const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const ConfigBuilder = require(`./helpers/config-builder`);

class TaskBuildElectronMain extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron-main`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    htmlIndex: NKMjs.ELECTRON_HTML_INDEX,
                    js_main: `./${NKMjs.projectConfig.dirs.src}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.ELECTRON)).toString()
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`,`js`,`entry-electron.js`), 'utf8'));

        // TODO : Need to do locales discovery at runtime too
        // since an electron build offers the opportunity to support additional locales on the fly.

        NKMjs.WriteTempSync(electronEntry, templateContent);
        this._logFwd(NKMjs.Shorten(electronEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildElectronMain;