const NKMjs = require("../nkm");

class ConfigBuilder {

    static PWA = `pwa`;
    static WWW = `www`;
    static ELECTRON = `electron`;
    static SERVER = `server`;
    static EXT = `ext`;

    constructor(p_context, p_contextDetail = null) {
        let config = ``;
        config += `\tlang:'${NKMjs.projectConfig.lang}',\n`;
        config += `\tappName:'${NKMjs.projectConfig.name}',\n`;

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

        if(p_contextDetail){
            for(var p in p_contextDetail){
                config += `\t${p}:'${JSON.stringify(p_contextDetail[p], null, '    ')}',\n`;
            }
        }

        this.string = config;
    }

    toString(){ return this.string; }

    
}

module.exports = ConfigBuilder;