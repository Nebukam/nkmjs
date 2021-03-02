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

class TaskPrepareLocales extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-locales`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // TODO : Check if a folder exists in app, named `_locales`
        let locales = [];
        try {
            let localeDir = NKMjs.InApp(NKMjs.LOCALES_DIR),
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
                }
            }
        }catch(e){}

        NKMjs.Set(`locales`, locales);

        this.End();
    }

}

module.exports = TaskPrepareLocales;