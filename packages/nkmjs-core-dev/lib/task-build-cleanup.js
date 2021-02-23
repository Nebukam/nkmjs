'use strict'; 

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);

class TaskBuildCleanup extends ScriptBase {

    constructor() {

        super(`task-build-cleanup`);
        if (this.__hasErrors) { return; }

        // Cleanup everything in the build folder that isn't a folder

        let dirContent = fs.readdirSync(NKMjs.InBuilds());

        for (let i = 0, n = dirContent.length; i < n; i++) {
            
            let p = NKMjs.InBuilds(dirContent[i]),
                stats = fs.statSync(p);

            if (stats.isDirectory()) { continue; }

            fs.unlinkSync(p);

        }

        

    }

}

new TaskBuildCleanup();