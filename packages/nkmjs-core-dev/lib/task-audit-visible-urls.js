const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskAuditVisibleURLs extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`audit-visible-urls`, p_onComplete, { skipKey: `no-url-audit`, requiredGlobals:[`web-ext-configs`] });
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Check bundle for easy-to-find urls that would likely require to be put under 'permissions'
        // in the extension manifest

        let candidates = NKMjs.tempFiles, urls = [];
        if (candidates.length == 0) {
            this._log(`no candidates.`, 1);
            this.End();
            return;
        }

        for (let i = 0, n = candidates.length; i < n; i++) {
            let path = candidates[i];
            try {
                if (!fs.statSync(path).isDirectory()) {
                    let fileContent = fs.readFileSync(path, 'utf8'),
                        results = this.Audit(fileContent);
                    for (let r = 0, nr = results.length; r < nr; r++) {
                        let URL = results[r];
                        if (!urls.includes(URL)) {
                            urls.push(URL);
                        }
                    }
                }
            } catch (e) {
                this._logWarn(`${NKMjs.Shorten(path)} : ${e}`, 1);
            }
        }

        // Now painful process of cross-checking urls for 'includes'
        // if one include any another, remove it.
        let i = 0, n = urls.length;
        while (i < n) {
            let currentURL = urls[i], j = 0;
            i++;
            while (j < n) {
                let otherURL = urls[j];
                j++;
                if (currentURL != otherURL) {
                    if (otherURL.includes(currentURL)) {
                        urls.splice(j, 1);
                        j--; i--; n--;
                    }
                }
            }
        }

        let knownPermissions = (NKMjs.projectConfig.hostPermissions || []),
            unknownPermissions = [];

        for (i = 0, n = urls.length; i < n; i++) {
            let currentURL = urls[i];
            if (!knownPermissions.includes(currentURL)) {
                unknownPermissions.push(currentURL);
            }
        }

        if (unknownPermissions.length > 0) {

            NKMjs.Set(`unknownPermissions`, unknownPermissions);

            this._logWarn(`found at least ${unknownPermissions.length} domains not listed under extension.hostPermissions :`);
            //this._log(`You can skip this check by using --noURLaudit`);
            for (i = 0, n = unknownPermissions.length; i < n; i++) {
                this._log(chalk.cyan(unknownPermissions[i]), 2);
            }
        }

        this.End();

    }

    Audit(p_content) {
        let results = [],
            urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            matches = urlRegex.exec(p_content);

        if (!matches) { return results; }

        for (let i = 0, n = matches.length; i < n; i++) {
            let match = matches[i];
            if (match.includes(`/`) && !results.includes(match)) {
                results.push(match);
            }
        }

        return results;
    }

}

module.exports = TaskAuditVisibleURLs;