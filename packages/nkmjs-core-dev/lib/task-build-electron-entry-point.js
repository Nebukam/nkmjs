const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildElectronEntryPoint extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron-entry-point`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
            replacer = new ReplaceVars({
                htmlIndex: NKMjs.ELECTRON_HTML_INDEX,
                js_main: `./js/main`,
                config: ``
            }, NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/js/entry-electron.js`), 'utf8'));

        NKMjs.WriteTempSync(electronEntry, templateContent);
        this._logFwd(NKMjs.Shorten(electronEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildElectronEntryPoint;