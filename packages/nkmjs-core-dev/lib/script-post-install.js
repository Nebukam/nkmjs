const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const NKMJSPackageConfig = require('./helpers/nkmjs-package-config');
const FSUTILS = require('./helpers/fsutils');

class TaskPostInstall extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`nkmjs-post-install`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        try{
            let p = path.resolve(process.env.INIT_CWD, `package.json`),
            pkgJson = JSON.parse(fs.readFileSync(p, 'utf8')),
            scripts = pkgJson.scripts;
            
            if(!scripts){ 
                scripts = {};
                pkgJson.scripts = scripts;
            }

            scripts.nkmjs = `nkmjs`;
            fs.writeFileSync(JSON.stringify(p, null, 4));
        }catch(e){
            console.log(e);
        }
        
        this.End();

    }

}

new TaskPostInstall();