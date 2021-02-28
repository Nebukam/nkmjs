const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildBundleHTMLIndex extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-bundle-html-index`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-html-metas.js`, // Metas, OpenGraph, Twitter
            `./task-prepare-html-scripts.js` // 
        ]);

        let htmlEntry = NKMjs.InVersionedBuilds(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                NKMjs.projectConfigCompiled.__raw,
                NKMjs.__data),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();
    }

}

module.exports = TaskBuildBundleHTMLIndex;