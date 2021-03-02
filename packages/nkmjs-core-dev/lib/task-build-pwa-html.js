const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildPWAHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-html-metas.js`, // Metas, OpenGraph, Twitter
            `./task-prepare-html-scripts.js`, // Scripts
            `./task-build-pwa-webmanifest.js` // Webmanifest + legacy support tags
        ], this._Bind(this.OnPreparationComplete));


    }

    OnPreparationComplete() {

        let htmlEntry = NKMjs.InPWABuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfigCompiled.__raw,
                {
                    [`html-metadata`]: NKMjs.Get(`html-metadata`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-webmanifest`]: NKMjs.Get(`html-webmanifest`, ``)
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildPWAHTML;