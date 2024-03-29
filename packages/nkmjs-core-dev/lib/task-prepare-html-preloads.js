const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const DirRead = require(`./helpers/dir-read`);
const MIME = require("@nkmjs/utils").MIME;

class TaskPrepareHTMLMeta extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-preloads`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let externals = NKMjs.Get(`externals`, []);
        let externalsRemap = NKMjs.Get(`externalsRemap`, {});

        let preloads = ``,
            electron_preloads = ``,
            map = [],
            candidates = [],
            caches = [...NKMjs.projectConfig.dirs.offline],
            dirStyle = NKMjs.projectConfig.dirs.style;

        if (!caches.includes(dirStyle)) { caches.push(dirStyle); }

        for (let i = 0, n = caches.length; i < n; i++) {
            let cachePath = NKMjs.InApp(caches[i]), stat;
            try { stat = fs.statSync(cachePath); } catch (e) { continue; }
            if (stat.isDirectory()) {
                new DirRead(cachePath, ``, {
                    'anyFile': (p_src) => {
                        let mime = MIME.Get(path.extname(p_src)),
                            shortURL = NKMjs.Short(p_src, NKMjs.InApp(), `.`, true);;
                        if (mime && mime.as !== `fetch`) {
                            if (mime.as === `style`) { map.push(shortURL); }
                            else if (mime.as === `script`) { map.push(shortURL); }
                            else { candidates.push(p_src); }
                        }
                    }
                });
            } else {
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }

        // Preload externals


        // TODO: Include custom import here

        console.log(externalsRemap);

        for (let i = 0, n = externals.length; i < n; i++) {
            if (externals[i] in externalsRemap) { continue; }
            map.push(`${NKMjs.ExternalName(externals[i])}.js`);
        }

        map.push(`${NKMjs.projectConfig.name}.js`);

        // Parse style files for recognizable URL candidates

        // load each css
        /*
        for(){
            let cachePath
            //`url("` /// `")"`
            //if url match or is contained by any of the candidates, validate that candidate
            if(ok){
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }
        */

        // Write preload tags

        preloads += `<!-- PRELOADS -->\n`;
        electron_preloads += `<!-- PRELOADS -->\n`;
        for (let i = 0, n = map.length; i < n; i++) {
            let item = map[i],
                mime = MIME.Get(path.extname(item));

            if (item.startsWith(`./`)) {
                //item = item.substr(2);
            }

            if (mime) {
                if (mime.as === `style`) {
                    //electron_preloads += `<link rel="preload" href="${item}">\n`;
                    //preloads += `<link rel="preload" href="${item}">\n`;

                    electron_preloads += `<link rel="stylesheet" href="${item}">\n`;
                    preloads += `<link rel="stylesheet" href="${item}">\n`;
                } else {
                    preloads += `<link rel="preload" href="${item}" as="${mime.as}" type="${mime.type}">\n`;
                }
            }
            else { preloads += `<link rel="preload" href="${item}">\n`; }

        }

        NKMjs.Set(`html-preloads`, preloads);
        NKMjs.Set(`html-electron-preloads`, electron_preloads);

        this.End();
    }

}

module.exports = TaskPrepareHTMLMeta;