const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);
const ConfigBuilder = require(`./helpers/config-builder`);

class TaskBuildServerMain extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-server-main`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-locales`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        // Build entry file

        let serverEntry = NKMjs.InVersionedBuilds(`server`, NKMjs.SERVER_ENTRY_POINT),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./${NKMjs.projectConfig.dirs[`src-server`]}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.SERVER)).toString()
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`,`js`,`entry-server.js`), 'utf8')),
                packageJson = JSON.parse(fs.readFileSync(NKMjs.InProject(`package.json`), 'utf8')),
                skimmedPackageJson = {};

        fs.writeFileSync(serverEntry, templateContent);
        this._logFwd(NKMjs.Shorten(serverEntry), `+`);

        // TODO : Build a package.json file fit for deployement
        // - only keep the bare minimum 
        //skimmedPackageJson.xxx = packageJson.xxx;
        
        fs.writeFileSync(NKMjs.InVersionedBuilds(`server`, `package.json`), JSON.stringify(skimmedPackageJson));


        this.End();

    }

}

module.exports = TaskBuildServerMain;