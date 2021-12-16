const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);


class TaskPrepareExtBase extends ScriptBase {

    constructor(p_id, p_preparationScripts = [], p_onComplete = null) {

        super(p_id, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        p_preparationScripts.unshift(`./task-extract-build-configs`);

        this.Run([
            ...p_preparationScripts
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {


        let validConfigs = [...NKMjs.Get(`buildconf-ext`, [])];

        if (validConfigs.length == 0) {
            this._logWarn(`There are no extension build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            this.End();
            return;
        }

        let extensionConfig = NKMjs.projectConfig.extension,
            ignoreKeys = ["platform", "arch", "display", "hostPermissions", "permissions", "manifestVersion"],
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
        NKMjs.Set(`web-ext-configs`, validConfigs);

    }

}

module.exports = TaskPrepareExtBase;