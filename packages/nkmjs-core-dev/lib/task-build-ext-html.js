const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildExtHTML extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-ext-html`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-prepare-html-scripts.js`, this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let projectInfos = NKMjs.projectConfigCompiled,
            metas = ``;

        metas += `<!-- META -->\n`;
        metas += `<meta charset="utf-8" />\n`;
        metas += `<meta http-equiv="X-UA-Compatible" content="IE=edge">\n`;
        metas += `<title>${projectInfos.longName}</title>\n`;
        metas += `<meta name="description" content="${projectInfos.description}">\n`;
        metas += `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n`;
        metas += `<meta name="robots" content="index, follow"></meta>\n`;
        metas += `<link rel="canonical" href="${projectInfos.homepage}" />\n`;

        let htmlEntry = NKMjs.InExtBuildRsc(NKMjs.HTML_INDEX),
            replacer = new ReplaceVars(
                projectInfos.__raw,
                {
                    [`html-metadata`]: metas,
                    [`html-scripts`]: NKMjs.Get(`html-scripts`, ``),
                    [`html-webmanifest`]: ``
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs/html/index.html`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(htmlEntry, templateContent);
        this._logFwd(NKMjs.Shorten(htmlEntry), `+`);

        this.End();

    }

}

module.exports = TaskBuildExtHTML;