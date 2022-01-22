'use strict';

const fs = require(`fs`);
const path = require(`path`);
const NKMJSPackageConfig = require("./nkmjs-package-config");

class ForEachModule {


    /**
     * 
     * @param {*} p_module_dir 
     * @param {*} p_callback ( NKMJSPackageConfig )
     */
    constructor(p_module_dir, p_callback, p_sorting = null) {
        this._moduleRoot = p_module_dir;
        this._seen = [];
        this._list = [];
        this.Explore(p_module_dir, this._list, p_callback);
        
        if(this._list.length == 0){ return; }

        var sortList = p_sorting;

        if(sortList != null){
            this._list.sort((a, b) =>{
                let ia = sortList.indexOf(a.name),
                ib = sortList.indexOf(b.name);
                if(ia == -1){ ia = sortList.length + 1; }
                if(ib == -1){ ib = sortList.length + 1; }

                return ia < ib ? -1 : ia > ib ? 1 : 0;

            });
        }

        for(let i = 0, n = this._list.length; i < n; i++){
            let item = this._list[i];
            p_callback(item.package, item.name);
        }

    }

    Explore(p_module_dir, p_list) {

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

                            if (pkg.__hasNKMConfig) { p_list.push({package:pkg, name:moduleName}); }

                            this.Explore(path.resolve(dirPath, `node_modules`), this._list);
                        }
                    }

                } else if (!this._seen.includes(item)) {
                    this._seen.push(item);

                    let pkg = new NKMJSPackageConfig(itemDir);
                    if (!pkg.__hasNKMConfig) { p_list.push({package:pkg, name:item}); }

                    this.Explore(path.resolve(itemDir, `node_modules`), this._list);

                }

            }

        } catch (e) { }

    }

}

module.exports = ForEachModule;