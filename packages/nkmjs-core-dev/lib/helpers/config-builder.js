const NKMjs = require("../nkm");

class ConfigBuilder {

    static PWA = `pwa`;
    static WWW = `www`;
    static ELECTRON = `electron`;
    static EXT = `ext`;

    constructor(p_context, p_contextDetail = null) {
        let config = ``;
        config += `\tlang:'${NKMjs.projectConfig.lang}',\n`;

        let localesList = NKMjs.Get(`locales-list`, null);
        if (localesList) {
            config += `\tlocales:${JSON.stringify(localesList)},\n`
        }

        switch (p_context) {
            case ConfigBuilder.EXT:

                let extensionConfig = NKMjs.projectConfig.extension,
                    manifestVersion = (extensionConfig.manifest_version || 2);

                config += `\tisExtension:true,\n`;
                config += `\tmanifestVersion:${manifestVersion},\n`;
                // TODO : If manifest V3, register service-worker instead of background.js
                break;
            case ConfigBuilder.PWA:
                config += `\tservice_worker:'${NKMjs.PWA_SERVICE_WORKER}',\n`;
                break;
        }

        this.string = config;
    }

    toString(){ return this.string; }

    
}

module.exports = ConfigBuilder;