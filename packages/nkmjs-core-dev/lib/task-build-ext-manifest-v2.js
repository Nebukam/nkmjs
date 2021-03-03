const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWebmanifestV2 extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-ext-manifest-v2`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-icons`,
            `./task-audit-visible-urls`,
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let iconList = NKMjs.Get(`icon-list`, []),
            iconObj = {},
            manifest = {},
            projectInfos = NKMjs.projectConfig;

        for (let i = 0, n = iconList.length; i < n; i++) {
            let icon = iconList[i];
            iconObj[`${icon.size}`] = `icons/${icon.size}x${icon.size}.png`;
        }

        // ----> mandatory

        manifest.manifest_version = 2;
        manifest.name = projectInfos.longName;
        manifest.short_name = projectInfos.shortName;
        manifest.description = projectInfos.description;
        manifest.version = NKMjs.projectVersion;
        manifest.version_name = `${projectInfos.shortName} ${NKMjs.projectVersion}`;
        manifest.homepage_url = projectInfos.homepage;

        let author = (NKMjs.projectConfig.__packagejson.author || `MissingAuthorData`);
        if (typeof author === `object`) { author = (author.name || `InvalidAuthorData`); }
        manifest.author = author;

        // ----> default_locale
        // "default_locale" must be present if the "_locales" directory is present, and must be absent otherwise

        let locales = NKMjs.Get(`locales`, []);
        if (locales.length > 0) {

            // We have locales !
            manifest.default_locale = (projectInfos.lang || locales[0].name);

            // Update existing infos so they are localized
            manifest.name = `__MSG_longName__`;
            manifest.short_name = `__MSG_shortName__`;
            manifest.description = `__MSG_description__`;

        }

        // ----> permissions

        let permissions = [
            "storage",
            projectInfos.homepage
        ];

        // Get perm from config, if any
        if (projectInfos.permissions && Array.isArray(projectInfos.permissions)) {
            for (let i = 0, n = projectInfos.permissions.length; i < n; i++) {
                let perm = projectInfos.permissions[i];
                if (!permissions.includes(perm)) { permissions.push(perm); };
            }
        }

        // Get perm from audit, if any
        let unknownPermissions = NKMjs.Get(`unknownPermissions`, []);
        for (let i = 0, n = unknownPermissions.length; i < n; i++) {
            let perm = unknownPermissions[i];
            if (!permissions.includes(perm)) { permissions.push(perm); };
        }

        if (permissions.length != 0) { manifest.permissions = permissions; }

        // ----> web_accessible_resources

        // TODO

        NKMjs.WriteTempSync(NKMjs.InExtBuildRsc(`manifest.json`), JSON.stringify(manifest, null, 4));

        this.End();
    }

}

module.exports = TaskBuildWebmanifestV2;