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

class TaskBuildPWAServiceWorker extends ScriptBase {

    constructor() {

        super(`build-pwa-service-worker`);
        if (this.__hasErrors) { return; }

        this.Run(`./task-build-pwa-cache-map`);

        let pwaSWJS = NKMjs.InBuilds(NKMjs.PWA_SERVICE_WORKER),
            replacer = new ReplaceVars({
                cacheURLs: `[\n    "`+NKMjs.Get(`cache-map`, []).join(`",\n    "`)+`"]`
            }, NKMjs.projectConfigCompiled.__packagejson),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/js/pwa-service-worker.js`), 'utf8'));

        // Transform & replace

        fs.writeFileSync(pwaSWJS, templateContent);
        console.log(chalk.gray(`${this.Ind()}`) + `· ` + chalk.green(`+ `) + chalk.gray(`${NKMjs.Shorten(pwaSWJS)}`));

    }

}

new TaskBuildPWAServiceWorker();