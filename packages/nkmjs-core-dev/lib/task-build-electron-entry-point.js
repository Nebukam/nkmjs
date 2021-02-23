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

class TaskBuildElectronEntryPoint extends ScriptBase {

    constructor() {

        super(`build-electron-entry-point`);
        if (this.__hasErrors) { return; }

        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
            replacer = new ReplaceVars({
                htmlIndex: NKMjs.ELECTRON_HTML_INDEX,
                js_main:`./js/main`,
                config: ``
            }, NKMjs.projectConfigCompiled.__packagejson),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/js/entry-electron.js`), 'utf8'));

        fs.writeFileSync(electronEntry, templateContent);
        console.log(chalk.gray(`${this.Ind()}`) + `· ` + chalk.green(`+ `) + chalk.gray(`${NKMjs.Shorten(electronEntry)}`));


    }

}

new TaskBuildElectronEntryPoint();