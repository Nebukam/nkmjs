const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const FSUTILS = require(`./helpers/fsutils`);
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBootstrapProject extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`bootstrap-nkmjs`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._log(`Will bootstrap an NKMjs Project in the following location : ${NKMjs.InProject()}`);

        let conf = NKMjs.projectConfig,
            replacer = new ReplaceVars(conf);

        // Go through all folders that needs to be created, as well as files etc

        // Basic directories

        // + Build folder
        FSUTILS.ensuredir(NKMjs.InProject(conf.dirs.builds));
        // + Asset folder
        FSUTILS.ensuredir(NKMjs.InProject(conf.dirs.assets));
        // + Icon folder
        FSUTILS.ensuredir(NKMjs.InProject(conf.dirs.icons));
        // + source style location
        FSUTILS.ensuredir(NKMjs.InProject(conf.dirs.styleSource));

        // + JS folders in under
        let srcDir = FSUTILS.ensuredir(NKMjs.InApp(conf.dirs[`src`])), // for app
            srcElectronDir = FSUTILS.ensuredir(NKMjs.InApp(conf.dirs[`src-electron`])), // for electron
            srcNodeDir = FSUTILS.ensuredir(NKMjs.InApp(conf.dirs[`src-node`])); // for server-side node

        // + JS app main.js, ONLY IF THEY DON'T ALREADY EXIST
        // src/main.js
        FSUTILS.ensurefile(
            path.resolve(srcDir, NKMjs.JS_MAIN),
            NKMjs.InCore(`configs`,`js`,`main-js.js`),
            replacer.Replace);

        // src-electron/main.js
        FSUTILS.ensurefile(
            path.resolve(srcElectronDir, NKMjs.JS_MAIN),
            NKMjs.InCore(`configs`,`js`,`main-js-process.js`),
            replacer.Replace);

        // src-node/main.js
        FSUTILS.ensurefile(
            path.resolve(srcNodeDir, NKMjs.JS_MAIN),
            NKMjs.InCore(`configs`,`js`,`main-js-node.js`),
            replacer.Replace);

        // Fetch styles
        NKMjs.shortargs.replace = false; // DON'T REPLACE EXISTING FILES
        NKMjs.shortargs.append = true;
        this.Run(`./task-styles-fetch`, this._Bind(this._OnStylesFetched));

    }

    _OnStylesFetched() {

        // TODO : Create gitignore if does not exists, and if it does, append the build location to it.
        let gitIgnoreContent = ``,
            output = NKMjs.InProject(`.gitignore`);

        try { gitIgnoreContent = fs.readFileSync(output, 'utf8'); }
        catch (e) { gitIgnoreContent = fs.readFileSync(NKMjs.InCore(`configs`, `gitignore.txt`), 'utf8'); }

        if (!gitIgnoreContent.includes(`# NKMjs`)) {
            gitIgnoreContent += `\n`;
            gitIgnoreContent += `# NKMjs\n`;
            gitIgnoreContent += `${NKMjs.projectConfig.dirs.builds}`;
            fs.writeFileSync(output, gitIgnoreContent);
        }

        this.End();

    }

}

module.exports = TaskBootstrapProject;