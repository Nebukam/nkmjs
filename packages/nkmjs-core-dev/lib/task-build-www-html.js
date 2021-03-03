const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWWWHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-www-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-html-metas`, // Metas
            `./task-prepare-html-socials`, // OpenGraph, Twitter, etc
            `./task-prepare-html-scripts`, // Scripts
            `./task-prepare-html-preloads`, // Preloads
        ], this._Bind(this.OnPreparationComplete));


    }

    OnPreparationComplete() {

        let htmlEntry = NKMjs.InWWWBuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    [`html-metas`]: NKMjs.Get(`html-metas`, ``),
                    [`html-socials`]: NKMjs.Get(`html-socials`, ``),
                    [`html-preloads`]: NKMjs.Get(`html-preloads`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-webmanifest`]: ``,
                }
                ),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildWWWHTML;