const path = require(`path`);
const chalk = require('chalk');
const fs = require(`fs`);

const ARGS = require(`./helpers/argv-parser`);
const NKMJSPackageConfig = require(`./helpers/nkmjs-package-config`);
const FSUTILS = require('./helpers/fsutils');



class NKMjs {

    static ELECTRON_ENTRY_POINT = `index-electron.js`;
    static ELECTRON_HTML_INDEX = `index-electron.html`;
    static ELECTRON_BUNDLE = `electron-bundle.js`;
    static ELECTRON_BUNDLE_MIN = `electron-bundle-min.js`;

    static BUNDLE_ENTRY_POINT = `bundle-entry-point.js`;

    static BUNDLE_ENTRY_POINT_EXT = `index.ext.js`;
    static BUNDLE_ENTRY_POINT_PWA = `index.pwa.js`;
    static BUNDLE_ENTRY_POINT_WWW = `index.www.js`;

    static PWA_SERVICE_WORKER = `service-worker.js`;

    static BUNDLE = `bundle.js`;
    static BUNDLE_MIN = `bundle-min.js`;
    static BUNDLE_DIR = `.bundles`;

    static HTML_INDEX = `index.html`;
    static JS_MAIN = `main.js`;
    static GENERATED_RSC = `.build.rsc`;

    static CORE_CACHE_DIR = ``;

    static LOCALES_DIR = `_locales`;

    static Init() {
        if (this.__initialized) { return; }
        this.__initialized = true;

        this.args = new ARGS(process.argv);

        let eC = process.env.INIT_CWD, //process.argv[1],
            cProject = null,
            cCore = path.resolve(__dirname, `../`);

        console.log(eC);

        if (`context` in this.args) {
            cProject = this.args.context;
        } else {
            if (eC.includes(`node_modules`)) {
                cProject = eC;
                while (cProject.includes(`node_modules`)) { cProject = path.resolve(cProject, `../`); }
            } else {
                cProject = process.env.INIT_CWD; //path.dirname(eC);
            }
        }

        this.tempFiles = [];

        this.dirnameProject = cProject;
        this.dirnameCore = cCore;

        this.coreConfig = new NKMJSPackageConfig(cCore, false);
        this.projectConfig = new NKMJSPackageConfig(cProject, false);

        if (!this.projectConfig.__hasNKMConfig) {
            console.log(chalk.yellow(`>> WARNING : Current project (${path.basename(cProject)}) has no nkmjs.config.json. Will be using defaults instead.`));
            this.validProject = false;
            let defaultConfigPath = path.resolve(cCore, `configs`);
            this.projectConfig = new NKMJSPackageConfig(defaultConfigPath, false);
        } else {
            this.validProject = true;
        }

        process.argv = process.argv.splice(2);
        this.shortargs = new ARGS(process.argv);

        this.projectVersion = (NKMjs.projectConfig.__packagejson.version || `0.0.0`);
        this.CORE_CACHE_DIR = this.InCore(`caches`, `@nkmjs`);

        if (this.shortargs[`invalidate-cache`]) {
            console.log(chalk.blue.italic(`invalidating cache`));
            try { FSUTILS.rmdir(this.CORE_CACHE_DIR); } catch (e) { }
        }

        //console.log(`dirnameProject : ${this.dirnameProject}`);
        //console.log(`dirnameCore : ${this.dirnameCore}`);

        console.log(this.projectConfig.__keys);

    }

    static initialized = false;
    static args = null;
    static shortargs = null;
    static executable = ``;
    static validProject = false;

    static coreConfig = null;
    static projectConfig = null;
    static projectVersion = `0.0.0`;

    static dirnameCore = null;
    static dirnameApp = null;
    static dirnameProject = null;

    static __data = {};

    static WriteTempSync(p_path, p_content, p_options = null) {
        if (!this.tempFiles.includes(p_path)) { this.tempFiles.push(p_path); }
        FSUTILS.ensuredir(path.dirname(p_path));
        if (p_options === null) { fs.writeFileSync(p_path, p_content); }
        else { fs.writeFileSync(p_path, p_content, p_options); }
    }

    static CopyTempSync(p_src, p_dest){
        if (!this.tempFiles.includes(p_dest)) { this.tempFiles.push(p_dest); }
        fs.copyFileSync(p_src, p_dest);
    }

    static RegisterTemp(p_path) {
        if (!this.tempFiles.includes(p_path)) { this.tempFiles.push(p_path); }
    }

    static Set(p_id, p_value) {
        this.__data[p_id] = p_value;
    }

    static Get(p_id, p_fallback) {
        if (p_id in this.__data) { return this.__data[p_id]; }
        else { return p_fallback; }
    }

    static InCore(...pathSegments) {
        return path.resolve(this.dirnameCore, ...pathSegments);
    }

    static InCoreModules(...pathSegments) {
        let p = path.resolve(this.dirnameCore, `node_modules`, ...pathSegments);
        try { fs.statSync(p); }
        catch (e) {
            try {
                // If using yarn, there's a good chance some modules have been flattened.
                p = path.resolve(this.dirnameProject, `node_modules`, ...pathSegments);
                fs.statSync(p);
            } catch (e) {
                console.error(`Invalid core module lookup : ${pathSegments}, either the module isn't installed, or has been flattened in an unexpected fashion.`);
                return path.resolve(this.dirnameCore, `node_modules`, ...pathSegments);
            }

        }
        return p;
    }

    static InProject(...pathSegments) {
        return path.resolve(this.dirnameProject, ...pathSegments);
    }

    static InBuildRsc(...pathSegments) {
        return this.InBuilds(
            this.GENERATED_RSC,
            ...pathSegments);
    }

    static InSharedWebBuildRsc(...pathSegments) {
        return this.InBuildRsc(
            `.shared.rsc`,
            ...pathSegments);
    }

    static InWWWBuildRsc(...pathSegments) {
        return this.InBuildRsc(
            `.www.rsc`,
            ...pathSegments);
    }

    static InPWABuildRsc(...pathSegments) {
        return this.InBuildRsc(
            `.pwa.rsc`,
            ...pathSegments);
    }

    static InExtBuildRsc(...pathSegments) {
        return this.InBuildRsc(
            `.ext.rsc`,
            ...pathSegments);
    }

    static InApp(...pathSegments) {
        return this.InProject(
            this.projectConfig.dirs.app,
            ...pathSegments);
    }

    static InBuilds(...pathSegments) {
        return this.InProject(
            this.projectConfig.dirs.builds,
            ...pathSegments);
    }

    static InVersionedBuilds(...pathSegments) {
        return this.InBuilds(
            this.projectVersion,
            ...pathSegments);
    }

    static InAssets(...pathSegments) {
        return this.InProject(this.projectConfig.dirs.assets, ...pathSegments);
    }

    static InStyle(...pathSegments) {
        return this.InProject(this.projectConfig.dirs.styleSource, ...pathSegments);
    }

    static Shorten(p_path) {
        p_path = this.Short(p_path, this.InCore(), `{core}`);
        p_path = this.Short(p_path, this.InApp(), `{app}`);
        p_path = this.Short(p_path, this.InBuilds(), `{builds}`);
        p_path = this.Short(p_path, this.InAssets(), `{assets}`);
        p_path = this.Short(p_path, this.InStyle(), `{styles}`);
        p_path = this.Short(p_path, this.InProject(), `{project}`);
        p_path = this.Short(p_path, this.InCore(this.CORE_CACHE_DIR), `{core-cache}`);
        return p_path;
    }

    static Short(p_path, p_prefix, p_rep = `.`, p_sanitize = false) {
        let p = p_path.split(p_prefix).join(p_rep);
        return p_sanitize ? p.split('\\').join('/') : p;
    }

    static Sanitize(p_name) {
        p_name = p_name.split(`@`).join(`external-`);
        p_name = p_name.split(`/`).join(`-`);
        p_name = p_name.split(`\\`).join(`-`);
        return p_name;
    }

    static ExternalName(p_name) {
        p_name = p_name.split(`@`).join(`external-`);
        p_name = p_name.split(`/`).join(`-`);
        p_name = p_name.split(`\\`).join(`-`);
        return `lib-${p_name}`;
    }

}

module.exports = NKMjs;