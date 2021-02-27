const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBuildBundleHTMLIndex extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-bundle-html-index`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        let externals = NKMjs.Get(`externals`, []),
            tagList = ``;

        for (let i = 0, n = externals.length; i < n; i++) {
            let extModule = externals[i];
            tagList += `<script type = "text/javascript" src = "${NKMjs.Sanitize(extModule)}-min.js" ></script>\n`;
        }

        tagList += `<script type = "text/javascript" src = "${NKMjs.projectConfigCompiled.name}-min.js" ></script>\n`;

        let htmlEntry = NKMjs.InBuilds(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars({
                libraries: tagList
            }, NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();
    }

}

module.exports = TaskBuildBundleHTMLIndex;