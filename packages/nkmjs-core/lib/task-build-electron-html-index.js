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

    constructor() {

        super(`build-electron-html-index`);
        if (this.__hasErrors) { return; }

        let electronHtml = NKMjs.InApp(NKMjs.ELECTRON_HTML_INDEX),
            replacer = new ReplaceVars(NKMjs.projectConfigCompiled.__packagejson),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index-electron.html`), 'utf8'));

        // Transform & replace

        fs.writeFileSync(electronHtml, templateContent);
        console.log(chalk.gray(`${this.Ind()}`) + `· ` + chalk.green(`+ `) + chalk.gray(`${NKMjs.Shorten(electronHtml)}`));

    }

}

new TaskBuildElectronHTMLIndex();