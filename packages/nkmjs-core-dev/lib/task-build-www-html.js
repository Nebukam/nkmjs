const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWWWHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-www-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-all-icons`, // Icons
            `./task-prepare-html-loading`, // Loading
            `./task-prepare-html-metas`, // Metas
            `./task-prepare-html-socials`, // OpenGraph, Twitter, etc
            `./task-prepare-html-scripts`, // Scripts
            `./task-prepare-html-preloads`, // Preloads
            `./task-prepare-html-metrics`, // Metrics
        ], this._Bind(this.OnPreparationComplete));


    }

    OnPreparationComplete() {

        let htmlIcons = `<link rel="icon" sizes="128x128" href="icons/128x128.png"></link>`;

        let htmlEntry = NKMjs.InWWWBuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    [`html-loading`]: NKMjs.Get(`html-loading`, ``),
                    [`html-metas`]: NKMjs.Get(`html-metas`, ``),
                    [`html-socials`]: NKMjs.Get(`html-socials`, ``),
                    [`html-preloads`]: NKMjs.Get(`html-preloads`, ``),
                    [`html-metrics`]: NKMjs.Get(`html-metrics`, ``),
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-noscript`]: NKMjs.Get(`html-noscript`, ``),
                    [`html-webmanifest`]: NKMjs.Get(`html-icons`, ``), //only icons
                }
            ),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`,`html`,`index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildWWWHTML;