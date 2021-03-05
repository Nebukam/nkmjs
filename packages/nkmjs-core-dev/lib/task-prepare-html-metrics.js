const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const { U } = require(`@nkmjs/utils`);

class TaskPrepareHTMLMetrics extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-metrics`, p_onComplete, { requiredConfigs: [`metrics`] });
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let scripts = ``,
            config = NKMjs.projectConfig.metrics,
            replacer = new ReplaceVars(NKMjs.projectConfig.__keys);
        scriptFile = NKMjs.InCore(`configs`, `html`, `g-tag.html`);

        if (metrics.script) {
            try {
                let filePath = NKMjs.InProject(metrics.script);
                fs.statSync(filePath);
                scriptFile = filePath;
            } catch (e) {
                this._logError(`specified metrics.script (${metrics.script}) could not be found, using default instead.`);
            }
        }

        scripts += `<!-- METRICS -->\n`;
        scripts += replacer.Replace(fs.readFileSync(scriptFile, 'utf8'));

        NKMjs.Set(`html-metrics`, scripts);

        this.End();

    }

}

module.exports = TaskPrepareHTMLMetrics;