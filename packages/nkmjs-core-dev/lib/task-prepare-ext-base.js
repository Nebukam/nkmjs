const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskPrepareExtBase extends ScriptBase {

    constructor(p_id, p_preparationScripts = [], p_onComplete = null) {

        super(p_id, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            ...p_preparationScripts
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete(){
        
        
        let configs = null;

        if (`builds` in NKMjs.projectConfig) { configs = NKMjs.projectConfig.builds; }

        if (!configs) {
            this._logWarn(`There are no build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            this.End();
            return;
        }

        let validPlatforms = ["chrome", "firefox", "edge"],
            validConfigs = [];

        for (let i = 0, n = configs.length; i < n; i++) {
            let conf = configs[i];
            if (validPlatforms.includes(conf.platform)) { validConfigs.push(conf); }
        }

        let extensionConfig = NKMjs.projectConfig.extension;

        if (validConfigs.length == 0) {
            this._logWarn(`No valid extension config found.`);
            this.End();
            return;
        } else {

            let ignoreKeys = ["platform", "arch", "display", "hostPermissions"],
                specifics = {};

            if (extensionConfig) {
                for (var key in extensionConfig) {
                    if (ignoreKeys.includes(key)) { continue; }
                    specifics[key] = extensionConfig[key];
                }
            }

            for (let i = 0, n = validConfigs.length; i < n; i++) {
                let conf = validConfigs[i];
                for (var key in conf) {
                    if (ignoreKeys.includes(key)) { continue; }
                    specifics[key] = conf[key];
                }
            }

            NKMjs.Set(`extensions-specific-params`, specifics);

        }

        NKMjs.Set(`web-ext-configs`, validConfigs);

    }

}

module.exports = TaskPrepareExtBase;