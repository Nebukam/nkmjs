'use strict';

const fs = require(`fs`);
const { exec, execSync } = require('child_process');
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require(`./helpers/fsutils`);
const builder = require(`electron-builder`);

class TaskBuildElectronApp extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-electron`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.BuildNext);

        // Fetch target package config in project ( { platform:'windows', arch:'x64' } )
        this.configIndex = 0;
        this.validConfigCount = 0;
        this.configs = null;
        this.validPlatforms = ["windows", "linux", "mac"];
        this.validArch = ["x64", "ia32", "armv7l", "arm64"];

        this._log(`--pack-only : ${chalk.blue(NKMjs.shortargs[`pack-only`] ? true : false)}`, 1);

        if (`buildConfigs` in NKMjs.projectConfig) { this.configs = NKMjs.projectConfig.buildConfigs; }

        if (!this.configs) {
            this._logWarn(`There are no build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            this.End();
            return;
        }

        let validConfigs = [];
        for (let i = 0, n = this.configs.length; i < n; i++) {
            let conf = this.configs[i];
            if (this.validPlatforms.includes(conf.platform)) {
                validConfigs.push(conf);
            }
        }

        if (validConfigs.length == 0) {
            this._logWarn(`No valid electron config found.`);
            this.End();
            return;
        }

        this.configs = validConfigs;

        fs.copyFileSync(NKMjs.InProject(`package.json`), NKMjs.InProject(`package.bak.json`));

        // ----> Ignore files
        let files = this.BuildIgnoreList();

        this.sharedConfig = {
            version: NKMjs.projectVersion,
            name: NKMjs.projectConfigCompiled.name,
            main: `${NKMjs.projectConfigCompiled.srcLocation}/${NKMjs.ELECTRON_ENTRY_POINT}`,
            description: NKMjs.projectConfigCompiled.description,
            productName: NKMjs.projectConfigCompiled.longName,
            appId: `my.id`,
            appDirectory: NKMjs.InProject(),
            buildResources: NKMjs.InBuildRsc(),
            dependencies: (NKMjs.projectConfigCompiled.__packagejson.dependencies || {}),
            files: files
        };

        this.Run([
            `./task-build-styles`,
            `./task-prepare-icons`,
            `./task-build-electron-html`,
            `./task-build-electron-main`,
        ], this.BuildNext);

    }

    BuildIgnoreList() {

        let appDir = NKMjs.projectConfigCompiled.srcLocation,
            list = [
                `!package.bak.json`,
                `!${NKMjs.projectConfigCompiled.styleLocation}`,
                `!${appDir}/${NKMjs.BUNDLE_ENTRY_POINT}`,
                `!${appDir}/${NKMjs.HTML_INDEX}`,
                `!${appDir}/index.ext.js`,
                `!${appDir}/index.pwa.js`,
                `!${appDir}/index.www.js`
            ],
            externals = NKMjs.Get(`externals`);

        // Add externals to the ignore list
        if (externals && externals.length != 0) {
            for (let i = 0, n = externals.length; i < n; i++) {
                list.push(`!${NKMjs.projectConfigCompiled.srcLocation}/external-${NKMjs.Sanitize(externals[i])}.js`);
            }
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
                author: {
                    name: 'author_name',
                    email: 'email@email.com'
                },
                platform: conf.platform,
                [conf.arch]: true,
                build: {
                    productName: shared.productName,
                    appId: shared.appId,
                    asar: !!conf.asar,
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

        if (NKMjs.shortargs[`pack-only`] || conf[`pack-only`]) {
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

    _RestorePackageJson() {
        fs.unlinkSync(NKMjs.InProject(`package.json`));
        fs.renameSync(NKMjs.InProject(`package.bak.json`), NKMjs.InProject(`package.json`));
    }

    _OnBuildsComplete() {
        this._RestorePackageJson();
        this.End();
    }

}

module.exports = TaskBuildElectronApp;