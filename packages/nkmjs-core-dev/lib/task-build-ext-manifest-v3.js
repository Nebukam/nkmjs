const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const TaskBuildWebmanifestBase = require('./task-build-ext-manifest-base');

class TaskBuildWebmanifestV3 extends TaskBuildWebmanifestBase {

    constructor(p_onComplete = null) {
        super(`build-ext-manifest-v3`, [], p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }
    }

    PrepareAction(p_manifest) {

        let extensionConfig = NKMjs.projectConfig.extension,
            browser_action = {
                default_icon: this.inconList,
                default_title: projectInfos.shortName
            };

        if (!extensionConfig || extensionConfig.display === 'popup') {

            browser_action.default_popup = `index.html`;

        } else {

            let vars = {
                action_api_name: `browserAction`,
                context_api: `chrome`
            },
                replacer = new ReplaceVars(vars);

            let configs = NKMjs.Get(`web-ext-configs`, null);
            for (let i = 0, n = configs.length; i < n; i++) {
                let conf = configs[i];
                vars.context_api = conf.platform == `firefox` ? `browser` : `chrome`;
                NKMjs.WriteTempSync(
                    NKMjs.InExtBuildRsc(`.${conf.platform}`, `service-worker.js`),
                    replacer.Replace(fs.readFileSync(NKMjs.InCore(`configs`,`js`,`ext-service-worker.js`), 'utf8'))
                );
            }

            // Need to alter entry point to specify the app has a service-worker

        }

        p_manifest.action = browser_action;

    }

    PreparePermissions(p_manifest) {

        let permissions = [],
            host_permissions = [],
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
                if (host_permissions.includes(perm)) { continue; }
                host_permissions.push(extHostPerm);
            }
        }
        /*
                // Get perm from audit, if any
                // NOTE : Actually don't, they contain every outgoing link >.<
                let unknownPermissions = NKMjs.Get(`unknownPermissions`, []);
                for (let i = 0, n = unknownPermissions.length; i < n; i++) {
                    let perm = unknownPermissions[i];
                    if (!host_permissions.includes(perm)) { host_permissions.push(perm); };
                }
        */
        if (permissions.length != 0) { p_manifest.permissions = permissions; }
        if (host_permissions.length != 0) { p_manifest.host_permissions = host_permissions; }

        p_manifest.optional_permissions = ['unlimitedStorage'];

    }

}

module.exports = TaskBuildWebmanifestV3;