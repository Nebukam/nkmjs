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
        this.Explore(p_module_dir, p_callback);
    }

    Explore(p_module_dir, p_callback){

        try {

            let dirContent = fs.readdirSync(p_module_dir);
            for (let i = 0, n = dirContent.length; i < n; i++) {
                let item = dirContent[i];
                if (item[0] === `.`) { continue; }
                let itemDir = path.resolve(p_module_dir, item);
                
                if (item[0] === `@`) {

                    let namespaceContent = fs.readdirSync(itemDir);
                    for (let s = 0, ns = namespaceContent.length; s < ns; s++) {
                        let pkg = new NKMJSPackageConfig(path.resolve(itemDir, namespaceContent[s]));
                        if (pkg.__isNKMFriendly) { p_callback(pkg); }

                        let itemModuleDir = path.resolve(itemDir, namespaceContent[s], `node_modules`);
                        this.Explore(itemModuleDir, p_callback);
                    }

                } else {
                    let pkg = new NKMJSPackageConfig(itemDir);
                    if (!pkg.__isNKMFriendly) { p_callback(pkg); }

                    let itemModuleDir = path.resolve(itemDir, `node_modules`);
                    this.Explore(itemModuleDir, p_callback);
                }

            }

        } catch (e) {
            //console.log(e);
        }

    }

}

module.exports = ForEachModule;