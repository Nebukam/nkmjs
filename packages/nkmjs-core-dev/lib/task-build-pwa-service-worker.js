const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require('./helpers/dir-read');
const MIME = require("@nkmjs/utils").MIME;

class TaskBuildPWAServiceWorker extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-pwa-service-worker`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-prepare-externals`, this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        // - Build cache map

        let map = [`./`, `./index.html`],
            externals = NKMjs.Get(`externals`, []),
            caches = [...NKMjs.projectConfig.dirs.offline],
            dirStyle = NKMjs.projectConfig.dirs.style;;

        if (!caches.includes(dirStyle)) { caches.push(dirStyle); }

        for (let i = 0, n = externals.length; i < n; i++) {
            map.push(`./${NKMjs.ExternalName(externals[i])}.js`);
        }

        for (let i = 0, n = caches.length; i < n; i++) {
            let cachePath = NKMjs.InApp(caches[i]), stat;
            try { stat = fs.statSync(cachePath); } catch (e) { continue; }
            if (stat.isDirectory()) {
                new DirRead(cachePath, ``, { // Only include resources that exist, not pre-computed ones.
                    'anyFile': (p_src) => {
                        let mime = MIME.Get(path.extname(p_src));
                        if (mime && mime.as !== `fetch`) { map.push(NKMjs.Short(p_src, NKMjs.InApp(), `.`, true)); }
                    },
                    //'dir': (p_src) => { map.push(NKMjs.Short(`${p_src}/`, NKMjs.InApp(), `.`, true)); }
                });
            } else {
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }

        // Build & write service worker

        let pwaSWJS = NKMjs.InPWABuildRsc(NKMjs.PWA_SERVICE_WORKER),
            cachedList = `[\n    "` + map.join(`",\n    "`) + `"]`,
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    cacheURLs: cachedList,
                    " cacheURLs ": cachedList,
                    version: NKMjs.projectVersion
                }
            ),
            templateContent = replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`, `js`, `pwa-service-worker.js`), 'utf8'));

        // Transform & replace

        NKMjs.WriteTempSync(pwaSWJS, templateContent);
        this._logFwd(NKMjs.Shorten(pwaSWJS), `+`);

        this.End();

    }

}

module.exports = TaskBuildPWAServiceWorker;