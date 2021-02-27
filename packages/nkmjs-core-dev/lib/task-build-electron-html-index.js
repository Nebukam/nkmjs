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

class TaskBuildElectronHTMLIndex extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron-html-index`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        let electronHtml = NKMjs.InApp(NKMjs.ELECTRON_HTML_INDEX),
            replacer = new ReplaceVars(NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index-electron.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(electronHtml, templateContent);
        this._logFwd(NKMjs.Shorten(electronHtml), `+`);

        this.End();
        
    }

}

module.exports = TaskBuildElectronHTMLIndex;