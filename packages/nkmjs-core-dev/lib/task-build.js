const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');
const FSUTILS = require('./helpers/fsutils');
const DirCopy = require('./helpers/dir-copy');

class TaskBuild extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run(`./task-extract-build-configs`, this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let electronConfigs = NKMjs.Get(`buildconf-electron`, []),
            serverConfigs = NKMjs.Get(`buildconf-server`, []),
            extensionsConfigs = NKMjs.Get(`buildconf-ext`, []),
            wwwConfigs = NKMjs.Get(`buildconf-www`, []),
            pwaConfigs = NKMjs.Get(`buildconf-pwa`, []),
            scripts = [];

        if (wwwConfigs.length > 0) { scripts.push(`./task-build-www`); }
        if (pwaConfigs.length > 0) { scripts.push(`./task-build-pwa`); }
        if (extensionsConfigs.length > 0) { scripts.push(`./task-build-ext`); }
        if (electronConfigs.length > 0) { scripts.push(`./task-build-electron`); }
        if (serverConfigs.length > 0) { scripts.push(`./task-build-server`); }

        if (scripts.length > 0) {
            this.Run(scripts, this.End);
        } else {
            this.End();
        }

    }

}

module.exports = TaskBuild;