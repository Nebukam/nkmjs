const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBuildPWACacheMap extends ScriptBase {

    constructor() {

        super(`build-pwa-cache-map`);
        if (this.__hasErrors) { return; }

        let map = [`./`],
            externals = NKMjs.Get(`externals`, []),
            cacheFolders = NKMjs.projectConfigCompiled.cache_folders;

        for (let i = 0, n = externals.length; i < n; i++) {
            map.push(`./${NKMjs.Sanitize(externals[i])}-min.js`);
        }

        map.push(`./${NKMjs.projectConfigCompiled.name}-min.js`);

        for (let i = 0, n = cacheFolders.length; i < n; i++) {
            let cachePath = NKMjs.InApp(cacheFolders[i]), stat;
            try { stat = fs.statSync(cachePath); } catch (e) { continue; }
            if (stat.isDirectory) {
                new DirRead(cachePath, ``, {
                    'any': (p_src, p_dest, p_isDir) => {
                        map.push(NKMjs.Short(p_src + (p_isDir ? `/` : ``), NKMjs.InApp(), `.`, true));
                    }
                });
            } else {
                map.push(NKMjs.Short(cachePath, NKMjs.InApp(), `.`, true));
            }
        }

        NKMjs.Set(`cache-map`, map);

        //console.log(map);

    }

}

new TaskBuildPWACacheMap();