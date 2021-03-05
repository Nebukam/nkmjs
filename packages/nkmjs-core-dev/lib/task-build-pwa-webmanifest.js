const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWebmanifest extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa-webmanifest`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-prepare-icons`, this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let manifest = {},
            projectInfos = NKMjs.projectConfig,
            iconList = NKMjs.Get(`icon-list`, []),
            iconsArray = [],
            htmlHeader = ``,
            lastSize = `512x512`;

        htmlHeader += `<!-- Webmanifest -->\n`;
        htmlHeader += `<link rel="manifest" href="manifest.webmanifest">\n`;

        htmlHeader += `<!-- Fallback application metadata for legacy browsers -->\n`;
        htmlHeader += `<meta name="application-name" content="${projectInfos.shortName}">\n`;

        for (let i = 0, n = iconList.length; i < n; i++) {
            let icon = iconList[i],
                s = `${icon.size}x${icon.size}`;

            htmlHeader += `<link rel="icon" sizes="${s}" href="icons/${s}.png"></link>\n`;

            iconsArray.push({
                src: `icons/${s}.png`,
                sizes: `${s}`,
                type: `image/png`
            });

            lastSize = s;

        }

        // Apple touch icon should use maskable
        htmlHeader += `<link rel="apple-touch-icon" href="icons/${lastSize}.png">`;

        // TODO : Maskable icons : https://web.dev/maskable-icon-audit/?utm_source=lighthouse&utm_medium=devtools

        manifest.name = projectInfos.longName;
        manifest.short_name = projectInfos.shortName;
        manifest.description = projectInfos.description;
        manifest.icons = iconsArray;
        manifest.start_url = `./`;
        manifest.display = projectInfos.app.display;
        manifest.orientation = projectInfos.app.orientation;
        manifest.theme_color = projectInfos.app.colorTheme;
        manifest.background_color = projectInfos.app.colorTheme;
        manifest.lang = projectInfos.lang;




        NKMjs.WriteTempSync(NKMjs.InPWABuildRsc(`manifest.webmanifest`), JSON.stringify(manifest, null, 4));
        NKMjs.Set(`html-webmanifest`, htmlHeader);

        this.End();
    }

}

module.exports = TaskBuildWebmanifest;