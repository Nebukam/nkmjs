const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildExtHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-ext-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-html-metas`, // Metas
            `./task-prepare-html-scripts`,
            `./task-prepare-html-preloads`, // Preloads
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let htmlEntry = NKMjs.InExtBuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfigCompiled.__raw,
                {
                    [`html-metas`]: NKMjs.Get(`html-metas`, ``),
                    [`html-preloads`]: NKMjs.Get(`html-preloads`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-webmanifest`]: ``,
                    [`html-socials`]: ``,
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildExtHTML;