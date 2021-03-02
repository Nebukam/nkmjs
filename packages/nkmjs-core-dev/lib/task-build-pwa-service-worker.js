const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require('./helpers/dir-read');

class TaskBuildPWAServiceWorker extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa-service-worker`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-prepare-externals`, this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        // - Build cache map

        let map = [`./`],
            externals = NKMjs.Get(`externals`, []),
            cacheDirectories = NKMjs.projectConfigCompiled.cacheDirectories;
        cacheDirectories.push(NKMjs.projectConfigCompiled.compiledStyleLocation);

        for (let i = 0, n = externals.length; i < n; i++) {
            map.push(`./${NKMjs.Sanitize(externals[i])}.js`);
        }

        for (let i = 0, n = cacheDirectories.length; i < n; i++) {
            let cachePath = NKMjs.InApp(cacheDirectories[i]), stat;
            try { stat = fs.statSync(cachePath); } catch (e) { continue; }
            if (stat.isDirectory()) {
                new DirRead(cachePath, ``, {
                    'any': (p_src, p_dest, p_isDir) => {
                        map.push(NKMjs.Short(p_src + (p_isDir ? `/` : ``), NKMjs.InApp(), `.`, true));
                    }
                });
            } else {
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }

        // - Build & write service worker

        let pwaSWJS = NKMjs.InPWABuildRsc(NKMjs.PWA_SERVICE_WORKER),
            replacer = new ReplaceVars({
                cacheURLs: `[\n    "` + map.join(`",\n    "`) + `"]`,
                version: NKMjs.projectVersion
            },
                NKMjs.projectConfigCompiled.__raw),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs/js/pwa-service-worker.js`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(pwaSWJS, templateContent);
        this._logFwd(NKMjs.Shorten(pwaSWJS), `+`);

        this.End();

    }

}

module.exports = TaskBuildPWAServiceWorker;