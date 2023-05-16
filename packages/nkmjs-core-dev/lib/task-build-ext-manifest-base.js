const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskBuildWebmanifestBase extends ScriptBase {

    constructor(p_id, p_preparationScripts = [], p_onComplete = null) {

        super(p_id, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }
        this.Run([
            `./task-prepare-icons`,
            `./task-audit-visible-urls`,
            ...p_preparationScripts
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        this.inconList = {};
        let iconList = NKMjs.Get(`icon-list`, []),
            manifest = {};

        for (let i = 0, n = iconList.length; i < n; i++) {
            let icon = iconList[i];
            this.inconList[`${icon.size}`] = `icons/${icon.size}x${icon.size}.png`;
        }

        // ----> mandatory

        let extensionConfig = NKMjs.projectConfig.extension;

        manifest.manifest_version = (extensionConfig.manifest_version || 2);
        manifest.name = NKMjs.projectConfig.longName;
        manifest.short_name = NKMjs.projectConfig.shortName;
        manifest.description = NKMjs.projectConfig.description;
        manifest.version = NKMjs.projectVersion;
        manifest.version_name = `${NKMjs.projectConfig.shortName} ${NKMjs.projectVersion}`;
        manifest.homepage_url = NKMjs.projectConfig.homepage;

        manifest.icons = this.inconList;

        manifest.minimum_chrome_version = `93`;

        let author = (NKMjs.projectConfig.__packagejson.author || `MissingAuthorData`);
        if (typeof author === `object`) { author = (author.name || `InvalidAuthorData`); }
        manifest.author = author;

        // ----> action type

        this.PrepareAction(manifest);

        // ----> default_locale
        // "default_locale" must be present if the "_locales" directory is present, and must be absent otherwise

        let locales = NKMjs.Get(`locales`, []);
        if (locales.length) {

            // We have locales !
            manifest.default_locale = (NKMjs.projectConfig.lang || locales[0].name);

            // Update existing infos so they are localized
            manifest.name = `__MSG_longName__`;
            manifest.short_name = `__MSG_shortName__`;
            manifest.description = `__MSG_description__`;

        }

        // ----> permissions

        this.PreparePermissions(manifest);

        // ----> web_accessible_resources


        // ----> Specifics

        let specifics = NKMjs.Get(`extensions-specific-params`, {});
        for (var key in specifics) { manifest[key] = specifics[key]; }

        // TODO

        this.Finalize(manifest);
        NKMjs.WriteTempSync(NKMjs.InExtBuildRsc(`manifest.json`), JSON.stringify(manifest, null, 4));

        this.End();
    }

    PrepareAction(p_manifest) {

    }

    PreparePermissions(p_manifest) {

    }

    Finalize(p_manifest){
        delete p_manifest.popup;
    }

}

module.exports = TaskBuildWebmanifestBase;