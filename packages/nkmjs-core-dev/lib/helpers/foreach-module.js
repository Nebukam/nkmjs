'use strict';

const { UV_FS_O_FILEMAP } = require("constants");
const fs = require(`fs`);
const path = require(`path`);
const NKMJSPackageConfig = require("./nkmjs-package-config");

class ForEachModule {


    /**
     * 
     * @param {*} p_module_dir 
     * @param {*} p_callback ( NKMJSPackageConfig )
     */
    constructor(p_module_dir, p_callback) {
        this._moduleRoot = p_module_dir;
        this._seen = [];
        this.Explore(p_module_dir, p_callback);
        //console.log(this._seen);
    }

    Explore(p_module_dir, p_callback) {

        try {

            let contents = fs.readdirSync(p_module_dir);
            for (let i = 0, n = contents.length; i < n; i++) {

                let item = contents[i],
                    itemDir = path.resolve(p_module_dir, item);

                if (item[0] === `.`) { continue; }
                if (item[0] === `@`) {

                    let namespace = fs.readdirSync(itemDir);

                    for (var s = 0, ns = namespace.length; s < ns; s++) {

                        let nItem = namespace[s],
                            moduleName = `${item}/${nItem}`;

                        if (!this._seen.includes(moduleName)) {
                            this._seen.push(moduleName);

                            let dirPath = path.resolve(itemDir, nItem),
                                pkg = new NKMJSPackageConfig(dirPath);

                            if (pkg.__hasNKMConfig) { p_callback(pkg, moduleName); }

                            this.Explore(path.resolve(dirPath, `node_modules`), p_callback);
                        }
                    }

                } else if (!this._seen.includes(item)) {
                    this._seen.push(item);

                    let pkg = new NKMJSPackageConfig(itemDir);
                    if (!pkg.__hasNKMConfig) { p_callback(pkg, item); }

                    this.Explore(path.resolve(itemDir, `node_modules`), p_callback);

                }

            }

        } catch (e) { }

    }

}

module.exports = ForEachModule;