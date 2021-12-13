const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const TaskBuildWebmanifestBase = require('./task-build-ext-manifest-base');

class TaskBuildWebmanifestV2 extends TaskBuildWebmanifestBase {

    constructor(p_onComplete = null) {
        super(`build-ext-manifest-v2`, [], p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }
    }

    PrepareAction(p_manifest) {

        let extensionConfig = NKMjs.projectConfig.extension,
            browser_action = {
                default_icon: this.inconList,
                default_title: NKMjs.projectConfig.shortName
            };

        if (!extensionConfig || extensionConfig.display === 'popup') {
            browser_action.default_popup = `index.html`;
        } else {

            let vars = {
                context_api: `chrome`,
                action_api_name: `browserAction`,
                runtime_api_name: `runtime`
            },
                replacer = new ReplaceVars(vars);

            let configs = NKMjs.Get(`web-ext-configs`, null);
            for (let i = 0, n = configs.length; i < n; i++) {
                let conf = configs[i];
                vars.context_api = conf.platform == `firefox` ? `browser` : `chrome`;
                NKMjs.WriteTempSync(
                    NKMjs.InExtBuildRsc(`.${conf.platform}`, `background.js`),
                    replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`,`js`,`ext-background.js`), 'utf8'))
                );
            }

            p_manifest.background = { scripts: [`background.js`] };

        }

        p_manifest.browser_action = browser_action;

    }

    PreparePermissions(p_manifest) {

        let permissions = [],
            extPerm = NKMjs.projectConfig.extension.permissions,
            extHostPerm = NKMjs.projectConfig.extension.hostPermissions;

        if (extPerm) {
            for (let i = 0, n = extPerm.length; i < n; i++) {
                let perm = extPerm[i];
                if (permissions.includes(perm)) { continue; }
                permissions.push(extPerm[i]);
            }
        }

        if (extHostPerm) {
            for (let i = 0, n = extHostPerm.length; i < n; i++) {
                let perm = extHostPerm[i];
                if (permissions.includes(perm)) { continue; }
                permissions.push(extHostPerm);
            }
        }

        /*
                // Get perm from audit, if any
                // NOTE : Actually don't, they contain every outgoing link >.<
                let unknownPermissions = NKMjs.Get(`unknownPermissions`, []);
                for (let i = 0, n = unknownPermissions.length; i < n; i++) {
                    let perm = unknownPermissions[i];
                    if (!permissions.includes(perm)) { permissions.push(perm); };
                }
        */

        if (permissions.length != 0) { p_manifest.permissions = permissions; }

        p_manifest.optional_permissions = ['unlimitedStorage'];

    }

}

module.exports = TaskBuildWebmanifestV2;