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
            `./task-prepare-all-icons`, // Icons
            `./task-prepare-html-loading`, // Loading
            `./task-prepare-html-metas`, // Metas
            `./task-prepare-html-scripts`, // Scripts
            `./task-prepare-html-preloads`, // Preloads
            `./task-prepare-html-metrics`, // Metrics
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {


        let extConf = NKMjs.projectConfig.extension,
            extIndex = (!extConf || extConf.display === 'popup') ? NKMjs.EXT_POPUP_HTML_INDEX : NKMjs.EXT_STANDALONE_HTML_INDEX,
            htmlEntry = NKMjs.InExtBuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    [`html-loading`]: NKMjs.Get(`html-loading`, ``),
                    [`html-metas`]: NKMjs.Get(`html-metas`, ``),
                    [`html-preloads`]: NKMjs.Get(`html-preloads`, ``),
                    [`html-metrics`]: NKMjs.Get(`html-metrics`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-noscript`]: NKMjs.Get(`html-noscript`, ``),
                    [`html-webmanifest`]: NKMjs.Get(`html-icons`, ``), // Icons only
                    [`html-socials`]: ``
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`,`html`,`${extIndex}`), 'utf8'), true);

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildExtHTML;