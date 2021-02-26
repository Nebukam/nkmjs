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

        super(`build-electron-app`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        this._Bind(this.BuildNext);

        // Fetch target package config in project ( { platform:'windows', arch:'x64' } )
        this.configs = null;

        if (`buildConfigs` in NKMjs.projectConfig) { this.configs = NKMjs.projectConfig.buildConfigs; }

        if (!this.configs) {
            this._logWarn(`There are no build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            return;
        }

        this.Run(`./task-build-styles`);
        this.Run(`./task-build-electron-html-index`);
        this.Run(`./task-build-electron-entry-point`);

        fs.renameSync(NKMjs.InProject(`package.json`), NKMjs.InProject(`package.bak.json`));

        this.sharedConfig = {
            version: (NKMjs.projectConfigCompiled.__packagejson.version || `0.0.1`),
            name: NKMjs.projectConfigCompiled.name,
            main: `${NKMjs.projectConfigCompiled.srcLocation}/js-process/${NKMjs.JS_MAIN}`,
            description: NKMjs.projectConfigCompiled.description,
            productName: NKMjs.projectConfigCompiled.longName,
            appId: `my.id`,
            appDirectory: NKMjs.InProject(),
            buildResources: NKMjs.InProject(),
            dependencies: (NKMjs.projectConfigCompiled.__packagejson.dependencies || {})
        };

        this.BuildNext();

    }

    BuildNext() {

        let conf = this.configs.shift();

        if (!conf) {
            this._OnBuildsComplete();
            return;
        }

        //Plateform accepted values : "windows" | "linux" | "mac"
        //Arch accepted values : "x64" | "ia32" | "armv7l" | "arm64"

        conf.plateform = (conf.plateform || builder.Platform.WINDOWS);
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
                platform: conf.plateform,
                [conf.arch]: true,
                build: {
                    productName: shared.productName,
                    appId: shared.appId,
                    asar: false, //build-specific
                    directories: {
                        output: NKMjs.InBuilds(`${conf.plateform}-${conf.arch}-${shared.version}`),
                        app: shared.appDirectory,
                        buildResources: shared.buildResources
                    }
                },
                dependencies: shared.dependencies,
                devDependencies: shared.devDependencies
            },
            builderConfig = {};

        if (NKMjs.shortargs.packonly) {
            builderConfig.dir = true;
        }

        fs.writeFileSync(NKMjs.InProject(`package.json`), JSON.stringify(packageConfig));

        try {
            builder.build(builderConfig)
                .then((arr) => { console.log(`done :${arr}`); })
                .catch((e) => { console.log(e); })
                .finally(this.BuildNext);
        } catch (e) {
            console.log(e);
            this._RestorePackageJson();
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