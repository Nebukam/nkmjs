const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWebmanifest extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-webmanifest`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-prepare-icons`, this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let iconList = NKMjs.Get(`icon-list`, []),
            iconsArray = [],
            htmlHeader = ``;

        htmlHeader += `<!-- Webmanifest -->\n`;
        htmlHeader += `<link rel="manifest" href="manifest.webmanifest">\n`;

        htmlHeader += `<!-- Fallback application metadata for legacy browsers -->\n`;
        htmlHeader += `<meta name="application-name" content="${NKMjs.projectConfigCompiled.shortName}">\n`;

        for (let i = 0, n = iconList.length; i < n; i++) {
            let icon = iconList[i],
                s = `${icon.size}x${icon.size}`;

            htmlHeader += `<link rel="icon" sizes="${s}" href="icons/${s}.png"></link>\n`;

            iconsArray.push({
                src: `icons/${s}.png`,
                sizes: `${s}`,
                type: `image/png`
            });
        }

        let replacer = new ReplaceVars(
            NKMjs.projectConfigCompiled.__raw,
            NKMjs.__data,
            { [`icon-list`]: JSON.stringify(iconsArray) }),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs/templates/webmanifest.json`), 'utf8')),
            webmanifest = JSON.parse(templateContent);

        NKMjs.WriteTempSync(NKMjs.InWebBuildRsc(`manifest.webmanifest`), JSON.stringify(webmanifest, null, 4));
        NKMjs.Set(`html-webmanifest`, htmlHeader);

        this.End();
    }

}

module.exports = TaskBuildWebmanifest;