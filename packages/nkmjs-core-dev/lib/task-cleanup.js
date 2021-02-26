'use strict'; 

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);

class TaskBuildCleanup extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`task-cleanup`, null, null, p_onComplete);
        if (this.__hasErrors || NKMjs.shortargs.nocleanup) { return this.End(); }

        // Cleanup everything in the build directory that isn't a directory

        let dirContent = fs.readdirSync(NKMjs.InBuilds());

        for (let i = 0, n = dirContent.length; i < n; i++) {
            
            let p = NKMjs.InBuilds(dirContent[i]),
                stats = fs.statSync(p);

            if (stats.isDirectory()) { continue; }

            fs.unlinkSync(p);

        }

        // Cleanup generated files in the app src directory

        try { fs.unlinkSync(NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.ELECTRON_HTML_INDEX)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.BUNDLE_ENTRY_POINT)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.PWA_SERVICE_WORKER)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.BUNDLE)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.BUNDLE_MIN)); } catch (e) { }
        try { fs.unlinkSync(NKMjs.InApp(NKMjs.HTML_INDEX)); } catch (e) { }

        this.End();

    }

}

module.exports = TaskBuildCleanup;