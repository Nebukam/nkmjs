const { exec } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const readline = require("readline");
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirCopy = require(`./helpers/dir-copy`);
const ForEachModule = require(`./helpers/foreach-module`);
const NKMJSPackageConfig = require(`./helpers/nkmjs-package-config`);
const DirRead = require(`./helpers/dir-read`);
const UserInput = require(`./helpers/user-input`);
const FSUTILS = require(`./helpers/fsutils`);
const ReplaceVars = require(`./helpers/replace-vars`);

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBootstrapProject extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bootstrap-nkmjs`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        this._log(`Will initialize an NKMjs Project in the following location : ${NKMjs.InProject()}`);

        // Init config, skip it if found (note that this will still fill missing config arguments)
        NKMjs.args.skipConfigIfFound = true;
        this.Run(`./task-nkmjs-init-config`);

        let initConfig = new NKMJSPackageConfig(NKMjs.InProject(), true),
            replacer = new ReplaceVars(initConfig);

        // Go through all folders that needs to be created, as well as files etc

        // + Build folder
        FSUTILS.ensuredir(NKMjs.InProject(initConfig.buildLocation));

        // + Asset folder
        FSUTILS.ensuredir(NKMjs.InProject(initConfig.assetsLocation));

        // + Icon folder
        FSUTILS.ensuredir(NKMjs.InProject(initConfig.iconsLocation));
        // TODO : Copy default iconsLocation ONLY IF THEY DON'T ALREADY EXIST

        // + style folder
        FSUTILS.ensuredir(NKMjs.InProject(initConfig.styleLocation));

        // + compiled style location
        FSUTILS.ensuredir(NKMjs.InProject(initConfig.compiledStyleLocation));

        // + JS folders in app
        FSUTILS.ensuredir(NKMjs.InApp(`js`)); // for webapp
        FSUTILS.ensuredir(NKMjs.InApp(`js-process`)); // for electron

        // + JS app main.js, ONLY IF THEY DON'T ALREADY EXIST
        // js/main.js
        FSUTILS.ensurefile(NKMjs.InApp(`js/${NKMjs.JS_MAIN}`), NKMjs.InCore(`configs/js/main-js.js`), replacer.Replace);
        // js-process/main.js
        FSUTILS.ensurefile(NKMjs.InApp(`js-process/${NKMjs.JS_MAIN}`), NKMjs.InCore(`configs/js/main-js-process.js`), replacer.Replace);

        // Fetch styles
        NKMjs.shortargs.replace = true;
        NKMjs.shortargs.append = true;
        this.Run(`./task-fetch-styles`);

        this.End();

    }

}

module.exports = TaskBootstrapProject;