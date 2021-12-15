const fs = require(`fs`);
const NKMjs = require(`./nkm.js`);
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
                default_title: NKMjs.projectConfig.shortName
            };

        if (!extensionConfig || extensionConfig.display === 'popup') {

            browser_action.default_popup = `index.html`;

        } else {

            //TODO: This needs to be tweaked on a per-browser basis
            let vars = {
                context_api: `chrome`,
                action_api_name: `action`,
                runtime_api_name: `runtime`
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
            // which will open a new tab that will load the extension.
            p_manifest.background = { service_worker:"service-worker.js" };

        }
        
        p_manifest.action = browser_action;

    }

    PreparePermissions(p_manifest) {

        let permissions = [],
            host_permissions = [],
            extensionConfig = NKMjs.projectConfig.extension,
            extPerm = extensionConfig.permissions,
            extHostPerm = extensionConfig.hostPermissions;

        // Add unlimited storage permission by default
        // as it is not supported as "optional"
        permissions.push('unlimitedStorage');

        if (!extensionConfig || extensionConfig.display === 'popup') {

        } else {
            
        }

        if (extPerm) {
            for (let i = 0, n = extPerm.length; i < n; i++) {
                let perm = extPerm[i];
                if (permissions.includes(perm)) { continue; }
                permissions.push(perm);
            }
        }

        if (extHostPerm) {
            for (let i = 0, n = extHostPerm.length; i < n; i++) {
                let perm = extHostPerm[i];
                if (host_permissions.includes(perm)) { continue; }
                host_permissions.push(perm);
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

        if (permissions.length != 0) { 
            p_manifest.permissions = permissions; 
        }

        if (host_permissions.length != 0) { 
            p_manifest.host_permissions = host_permissions; 
        }

    }

    Finalize(p_manifest){
        super.Finalize(p_manifest);
    }

}

module.exports = TaskBuildWebmanifestV3;