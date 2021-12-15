const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildPWAHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-html-loading`, // Loading
            `./task-prepare-html-metas`, // Metas
            `./task-prepare-html-socials`, // OpenGraph, Twitter, etc
            `./task-prepare-html-scripts`, // Scripts
            `./task-prepare-html-preloads`, // Preloads
            `./task-prepare-html-metrics`, // Metrics
            `./task-build-pwa-webmanifest` // Webmanifest + legacy support tags
        ], this._Bind(this.OnPreparationComplete));


    }

    OnPreparationComplete() {

        let htmlEntry = NKMjs.InPWABuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    [`html-loading`]: NKMjs.Get(`html-loading`, ``),
                    [`html-metas`]: NKMjs.Get(`html-metas`, ``),
                    [`html-socials`]: NKMjs.Get(`html-socials`, ``),
                    [`html-preloads`]: NKMjs.Get(`html-preloads`, ``),
                    [`html-metrics`]: NKMjs.Get(`html-metrics`, ``),
                    [`html-webmanifest`]: NKMjs.Get(`html-webmanifest`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-noscript`]: NKMjs.Get(`html-noscript`, ``),
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`,`html`,`index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildPWAHTML;