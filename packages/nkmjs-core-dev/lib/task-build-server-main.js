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


        let
            ignoreKeys = ["platform", "config"],
            buildConfig = NKMjs.Get(`active-buildconf-server`, null),
            jsConfig = buildConfig ? buildConfig.config : null;

        let serverEntry = NKMjs.InVersionedBuilds(`server`, NKMjs.SERVER_ENTRY_POINT),
            replacer = new ReplaceVars(
                NKMjs.projectConfig.__keys,
                {
                    js_main: `./${NKMjs.projectConfig.dirs[`src-server`]}/main`,
                    config: (new ConfigBuilder(ConfigBuilder.SERVER, jsConfig)).toString()
                }),
            templateContent = replacer.Replace(
                fs.readFileSync(NKMjs.InCore(`configs`, `js`, `entry-server.js`), 'utf8')),
            packageJson = JSON.parse(fs.readFileSync(NKMjs.InProject(`package.json`), 'utf8')),
            serverPackageJson = {};

        fs.writeFileSync(serverEntry, templateContent);
        this._logFwd(NKMjs.Shorten(serverEntry), `+`);

        serverPackageJson.name = `${packageJson.name}-server`;
        serverPackageJson.version = packageJson.version;
        serverPackageJson.description = packageJson.description;
        serverPackageJson.main = NKMjs.SERVER_ENTRY_POINT;
        serverPackageJson.dependencies = packageJson.dependencies;
        serverPackageJson.scripts = {
            start: `node ${NKMjs.SERVER_ENTRY_POINT}`
        };
        serverPackageJson.engines = {
            node: process.versions.node // might not be the best approach
        };

        if (buildConfig) {
            for (var key in buildConfig) {
                if (ignoreKeys.includes(key)) { continue; }
                serverPackageJson[key] = buildConfig[key];
            }
        }
        

        fs.writeFileSync(NKMjs.InVersionedBuilds(`server`, `package.json`), 
        JSON.stringify(serverPackageJson, null, '    '));

        this.End();

    }

}

module.exports = TaskBuildServerMain;