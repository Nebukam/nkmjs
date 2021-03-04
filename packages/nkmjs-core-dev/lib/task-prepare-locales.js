const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const NKMJSPackageConfig = require('./helpers/nkmjs-package-config');
const FSUTILS = require('./helpers/fsutils');
const DirCopy = require('./helpers/dir-copy');

class TaskPrepareLocales extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-locales`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-audit-locales`, this._Bind(this._OnAuditComplete));

    }

    _OnAuditComplete() {

        let locales = [],
            localesList = [];
        try {
            let localeDir = NKMjs.InApp(NKMjs.projectConfig.dirs.locales),
                localesDest = NKMjs.InApp(NKMjs.LOCALES_DIR),
                localesContent = fs.readdirSync(localeDir);
            for (let i = 0, n = localesContent.length; i < n; i++) {
                let locale = localesContent[i],
                    lPath = path.resolve(localeDir, locale),
                    stat = fs.statSync(lPath);
                if (stat.isDirectory()) {
                    locales.push({
                        name: locale,
                        path: lPath
                    });
                    localesList.push(locale);
                }
            }

            if (NKMjs.projectConfig.dirs.locales !== NKMjs.LOCALES_DIR) {
                // Only create the 'right' dir if no existing already
                FSUTILS.ensuredir(localesDest);
                NKMjs.RegisterTemp(localesDest);
                new DirCopy(localeDir, localesDest, {
                    'any': (p_src, p_dest, p_isDir) => { return p_dest; }
                });
            }

        } catch (e) {
            console.log(e);
        }

        NKMjs.Set(`locales`, locales);
        NKMjs.Set(`locales-list`, localesList);

        this.End();
    }

}

module.exports = TaskPrepareLocales;