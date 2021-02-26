'use strict';

const fs = require(`fs`);
const { exec, execSync } = require('child_process');
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require(`./helpers/fsutils`);
const builder = require(`electron-packager`);

class TaskPackageElectronApp extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`package-electron-app`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        this._Bind(this.Package);

        // Fetch target package config in project ( { platform:'windows', arch:'x64' } )
        this.targets = null;
        this.currentTarget = null;

        if (`buildConfigs` in NKMjs.projectConfig) { this.targets = NKMjs.projectConfig.buildConfigs; }

        if (!this.targets) {
            this._logWarn(`There are no build target set in your nkmjs.config.json.\nSee https://nebukam.github.io/nkmjs/doc/config.html`);
            return;
        }

        this.Run(`./task-build-styles`);
        this.Run(`./task-build-electron-html-index`);
        this.Run(`./task-build-electron-entry-point`);

        // TODO : Edit package.json so the main points toward the electron-entry-point

        this.electronVersionCacheFolder = ((NKMjs.projectConfigCompiled.electronCache ? NKMjs.InProject(NKMjs.projectConfigCompiled.electronCache) : false)
            || NKMjs.InCore(`caches/electron`));
        FSUTILS.ensuredir(this.electronVersionCacheFolder);

        this.inputLocation = NKMjs.InProject();
        this.outputLocation = NKMjs.InProject(NKMjs.projectConfigCompiled.buildLocation);
        this.packager = NKMjs.InCoreModules(`electron-packager/bin/electron-packager.js`);

        this.packageJSON = JSON.parse(fs.readFileSync(NKMjs.InCore(`package.json`), 'utf8'));
        this.electronVersion = this.packageJSON.dependencies.electron;

        if (this.electronVersion[0] == `~` || this.electronVersion[0] == `^`) { this.electronVersion = this.electronVersion.substring(1); }

        this.PackageNext();

    }

    PackageNext() {

        this.currentTarget = this.targets.shift();

        if (!this.currentTarget) { 
            this.End();
            return; 
        }

        this.currentTarget.zipName = `electron-v${this.electronVersion}-${this.currentTarget.platform}-${this.currentTarget.arch}.zip`;
        this.currentTarget.zipPath = path.resolve(this.electronVersionCacheFolder, this.currentTarget.zipName);
        this.currentTarget.zipSource = `https://github.com/electron/electron/releases/download/v${this.electronVersion}/${this.currentTarget.zipName}`;

        try {
            fs.statSync(this.currentTarget.zipPath);
            this.Package();
        } catch (e) {
            this._log(`Could not find ${this.currentTarget.zipName} -- Downloading it now...`);
            require(`./helpers/download`)(this.currentTarget.zipSource, this.currentTarget.zipPath)
                .then(this.Package)
                .catch((p_err) => { console.log(p_err); });
        }
    }

    Package() {

        let command = `node ${this.packager}`;
        command += ` ${this.inputLocation}`; //path
        command += ` --electronVersion=${this.electronVersion}`;
        command += ` --electronZipDir=${this.electronVersionCacheFolder}`;
        command += ` --overwrite`;
        command += ` --asar=false`;
        command += ` --platform=${this.currentTarget.platform}`;
        command += ` --arch=${this.currentTarget.arch}`;
        //command += ` --icon=build/icon.ico`;
        command += ` --prune=true`;
        command += ` --out=${this.outputLocation}`;
        command += ` --version-string.CompanyName=MMD`;
        command += ` --version-string.ProductName='HUMA Project Manager'`;
        command += ` --max-old-space-size=4096`;

        execSync(command);

        this.PackageNext();

    }

}

module.exports = TaskPackageElectronApp;