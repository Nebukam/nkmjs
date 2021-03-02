const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);

class TaskPrepareHTMLScripts extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-scripts`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let scripts = ``, externals = NKMjs.Get(`externals`, []);

        scripts += `<!-- SCRIPTS -->\n`;
        scripts += `<!-- externals -->\n`;
        for (let i = 0, n = externals.length; i < n; i++) {
            let extModule = externals[i];
            scripts += `<script type = "text/javascript" src = "${NKMjs.Sanitize(extModule)}.js" ></script>\n`;
        }

        
        scripts += `<!-- main -->\n`;
        scripts += `<script type = "text/javascript" src = "${NKMjs.projectConfigCompiled.name}.js" ></script>\n`;

        NKMjs.Set(`html-scripts`, scripts);

        this.End();

    }

}

module.exports = TaskPrepareHTMLScripts;