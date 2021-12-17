'use strict';

const fs = require(`fs`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const builder = require(`electron-builder`);
const FileBackup = require('./helpers/file-backup');

class TaskBuildElectronApp extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._backups = new FileBackup();

        this.Run(`./task-extract-build-configs`, this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete(){

        this._Bind(this.BuildNext);

        // Fetch target package config in project ( { platform:'windows', arch:'x64' } )
        this.configs = [...NKMjs.Get(`buildconf-electron`, [])];

        if (this.configs.length == 0) {
            this._logWarn(`There are no electron build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            this.End();
            return;
        }

        this._log(`--pack-only : ${chalk.blue(NKMjs.shortargs.Has(`pack-only`) ? true : false)}`, 1);

        this._backups.Backup(NKMjs.InProject(`package.json`));

        // ----> Ignore files
        let files = this.BuildIgnoreList();

        this.sharedConfig = {
            version: NKMjs.projectVersion,
            name: NKMjs.projectConfig.name,
            main: `${NKMjs.projectConfig.dirs.app}/${NKMjs.ELECTRON_ENTRY_POINT}`,
            description: NKMjs.projectConfig.description,
            productName: NKMjs.projectConfig.longName,
            appId: `my.id`,
            appDirectory: NKMjs.InProject(),
            buildResources: NKMjs.InBuildRsc(),
            dependencies: (NKMjs.projectConfig.__packagejson.dependencies || {}),
            files: files
        };

        this.Run([
            `./task-styles-build`,
            `./task-prepare-icons`,
            `./task-build-electron-html`,
            `./task-build-electron-main`,
        ], this.BuildNext);

    }

    BuildIgnoreList() {

        let appDir = NKMjs.projectConfig.dirs.app,
            list = [
                `!package.bak.json`,
                `!${NKMjs.projectConfig.dirs.builds}`,
                `!${appDir}/${NKMjs.projectConfig.dirs.styleSource}`,
                `!${appDir}/${NKMjs.BUNDLE_ENTRY_POINT}`,
                `!${appDir}/${NKMjs.HTML_INDEX}`,
                `!${appDir}/index.ext.js`,
                `!${appDir}/index.pwa.js`,
                `!${appDir}/index.www.js`
            ],
            externals = NKMjs.Get(`externals`, []);

        if(NKMjs.projectConfig.dirs.locales != NKMjs.LOCALES_DIR){
            list.push(`!${appDir}/${NKMjs.projectConfig.dirs.locales}`);
        }            

        // Add externals to the ignore list
        for (let i = 0, n = externals.length; i < n; i++) {
            list.push(`!${appDir}/${NKMjs.ExternalName(externals[i])}.js`);
        }

        // Add all mains + index to the ignore list

        return list;

    }

    BuildNext() {

        let conf = this.configs.shift();

        if (!conf) {
            this._OnBuildsComplete();
            return;
        }

        this._log(`electron-builder » ${conf.platform}@${conf.arch}`);

        conf.platform = (conf.platform || builder.Platform.WINDOWS);
        conf[(conf.arch || builder.Arch.x64)] = true;

        let shared = this.sharedConfig,
            packageConfig = { // Proxy for package.json
                version: shared.version,
                name: shared.name,
                main: shared.main,
                description: shared.description,
                author: { ...NKMjs.author },
                platform: conf.platform,
                [conf.arch]: true,
                build: {
                    productName: shared.productName,
                    appId: shared.appId,
                    asar: !!conf.asar,
                    icon:NKMjs.InBuildRsc(`icon.png`),
                    directories: {
                        output: NKMjs.InVersionedBuilds(`desktop`, `${conf.platform}-${conf.arch}-${shared.version}`),
                        //app: shared.appDirectory,
                        buildResources: shared.buildResources
                    },
                    files: shared.files
                },
                dependencies: shared.dependencies,
                devDependencies: shared.devDependencies
            },
            builderConfig = {};

        if (NKMjs.shortargs.Has(`pack-only`) || conf[`pack-only`]) {
            builderConfig.dir = true;
        }

        fs.writeFileSync(NKMjs.InProject(`package.json`), JSON.stringify(packageConfig));

        try {
            builder.build(builderConfig)
                .catch((e) => { console.log(e); })
                .finally(this.BuildNext);
        } catch (e) {
            console.log(e);
            this._logError(e);
            this.BuildNext();
        }

    }

    _OnBuildsComplete() {
        this._backups.Restore();
        this.End();
    }

}

module.exports = TaskBuildElectronApp;