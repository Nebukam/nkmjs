'use strict';

const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);

class TaskExtractBuildConfigs extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`extract-build-configs`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let allConfigs = null;

        if (`builds` in NKMjs.projectConfig) { allConfigs = NKMjs.projectConfig.builds; }

        if (!allConfigs) {
            this._logWarn(`There are no build target set in your nkmjs.config.json. See https://nebukam.github.io/nkmjs/doc/config.html`);
            this.End();
            return;
        }

        // First, fetch Electron targets

        let electronPlatforms = ["windows", "win", "linux", "mac", "darwin"],
            extensionPlatforms = ["chrome", "firefox", "edge"],
            wwwPlatforms = ["www"],
            pwaPlatforms = ["pwa"],
            serverPlatforms = ["node"],
            electronArch = ["x64", "ia32", "armv7l", "arm64"],
            electronConfigs = [],
            extensionsConfigs = [],
            wwwConfigs = [],
            pwaConfigs = [],
            serverConfigs = [];

        for (let i = 0, n = allConfigs.length; i < n; i++) {

            let conf = allConfigs[i],
                platform = conf.platform;

            if (electronPlatforms.includes(platform)
                && !electronConfigs.includes(platform)) {
                electronConfigs.push(conf);
            }
            else if (extensionPlatforms.includes(platform)
                && !extensionsConfigs.includes(platform)) {
                extensionsConfigs.push(conf);
            }
            else if (wwwPlatforms.includes(platform)
                && !wwwConfigs.includes(platform)) {
                wwwConfigs.push(conf);
            }
            else if (pwaPlatforms.includes(platform)
                && !pwaConfigs.includes(platform)) {
                pwaConfigs.push(conf);
            }
            else if (serverPlatforms.includes(platform)
                && !serverConfigs.includes(platform)) {
                serverConfigs.push(conf);
            }
        }

        if (NKMjs.shortargs.Has(`electron-only`)) {
            serverConfigs = extensionsConfigs = wwwConfigs = pwaConfigs = [];
        } else if (NKMjs.shortargs.Has(`ext-only`)) {
            serverConfigs = electronConfigs = wwwConfigs = pwaConfigs = [];
        } else if (NKMjs.shortargs.Has(`www-only`)) {
            serverConfigs = electronConfigs = extensionsConfigs = pwaConfigs = [];
        } else if (NKMjs.shortargs.Has(`pwa-only`)) {
            serverConfigs = electronConfigs = extensionsConfigs = wwwConfigs = [];
        } else if (NKMjs.shortargs.Has(`server-only`)) {
            electronConfigs = extensionsConfigs = wwwConfigs = pwaConfigs = [];
        }

        NKMjs.Set(`buildconf-electron`, electronConfigs);
        NKMjs.Set(`buildconf-server`, serverConfigs);
        NKMjs.Set(`buildconf-ext`, extensionsConfigs);
        NKMjs.Set(`buildconf-www`, wwwConfigs);
        NKMjs.Set(`buildconf-pwa`, pwaConfigs);

        this.End();

    }

}

module.exports = TaskExtractBuildConfigs;