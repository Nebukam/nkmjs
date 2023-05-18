const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const u = require("@nkmjs/utils");

class TaskPrepareHTMLScripts extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-scripts`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let mime = u.MIME.Get(`.js`),
            scripts = ``, externals = NKMjs.Get(`externals`, []), externalsRemap = NKMjs.Get(`externalsRemap`, {}),
            scriptData = `defer="defer" type="${mime.type}"`; // crossorigin="anonymous" prevent local testing

        scripts += `<!-- SCRIPTS -->\n`;
        scripts += `<!-- externals -->\n`;
        for (let i = 0, n = externals.length; i < n; i++) {
            if (externals[i] in externalsRemap) { continue; }
            let extModule = externals[i];
            scripts += `<script ${scriptData} src="${NKMjs.ExternalName(extModule)}.js"></script>\n`;
        }

        scripts += `<!-- main -->\n`;
        scripts += `<script ${scriptData} src="${NKMjs.projectConfig.name}.js"></script>\n`;

        NKMjs.Set(`html-scripts`, scripts);

        let replacer = new ReplaceVars(NKMjs.projectConfig.__keys),
            noscript = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`, `html`, `noscript.html`), 'utf8'));

        NKMjs.Set(`html-noscript`, noscript);

        this.End();

    }

}

module.exports = TaskPrepareHTMLScripts;