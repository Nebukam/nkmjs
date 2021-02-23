'use strict'; 

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskBuildReplaceExternals extends ScriptBase {

    constructor() {

        super(`build-for-web`);
        if (this.__hasErrors) { return; }

        this._Bind(this._End);
        
        this.Run(`./task-build-bundle-html-index`);
        this.Run(`./task-build-pwa-service-worker`);
        this.Run(`./task-build-bundle`);

        // Copy relevant file in target directories

        //this._End();

    }

    _End(){
        // Cleanup app folder
        let entryPoint = NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT)
        try{ fs.unlinkSync(entryPoint); }catch(e){ }

        //this.Run(`./task-cleanup-build-location`);
    }

}

new TaskBuildReplaceExternals();