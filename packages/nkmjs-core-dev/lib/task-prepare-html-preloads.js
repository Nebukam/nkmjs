const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const MIME = require(`@nkmjs/utils`).MIME;

class TaskPrepareHTMLMeta extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-preloads`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let preloads = ``,
            map = [],
            candidates = [],
            caches = [...NKMjs.projectConfigCompiled.cacheDirectories];

        caches.push(NKMjs.projectConfigCompiled.compiledStyleLocation);

        for (let i = 0, n = caches.length; i < n; i++) {
            let cachePath = NKMjs.InApp(caches[i]), stat;
            try { stat = fs.statSync(cachePath); } catch (e) { continue; }
            if (stat.isDirectory()) {
                new DirRead(cachePath, ``, {
                    'anyFile': (p_src) => {
                        let mime = MIME.Get(path.extname(p_src));
                        if (mime && mime.as !== `fetch`) {
                            if (mime.as === `style`) { map.push(NKMjs.Short(p_src, NKMjs.InApp(), `.`, true)); }
                            else { candidates.push(p_src); }
                        }
                    }
                });
            } else {
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }

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
        for (let i = 0, n = map.length; i < n; i++) {
            let item = map[i],
                mime = MIME.Get(path.extname(item));

            if (mime) { preloads += `<link rel="preload" href="${item}" as="${mime.as}" type="${mime.type}">\n`; }
            else { preloads += `<link rel="preload" href="${item}">\n`; }

        }

        NKMjs.Set(`html-preloads`, preloads);

        this.End();
    }

}

module.exports = TaskPrepareHTMLMeta;