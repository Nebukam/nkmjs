const path = require(`path`);
const chalk = require('chalk');
const fs = require(`fs`);

const u = require("@nkmjs/utils");
const NKMJSPackageConfig = require(`./helpers/nkmjs-package-config`);
const FSUTILS = require('./helpers/fsutils');



class NKMjs {

    static ELECTRON_ENTRY_POINT = `index-electron.js`;
    static ELECTRON_HTML_INDEX = `index-electron.html`;
    static ELECTRON_BUNDLE = `electron-bundle.js`;
    static ELECTRON_BUNDLE_MIN = `electron-bundle-min.js`;

    static EXT_POPUP_HTML_INDEX = `index-ext-popup.html`;
    static EXT_STANDALONE_HTML_INDEX = `index.html`;

    static BUNDLE_ENTRY_POINT = `bundle-entry-point.js`;

    static BUNDLE_ENTRY_POINT_EXT = `index.ext.js`;
    static BUNDLE_ENTRY_POINT_PWA = `index.pwa.js`;
    static BUNDLE_ENTRY_POINT_WWW = `index.www.js`;

    static PWA_SERVICE_WORKER = `service-worker.js`;

    static BUNDLE = `bundle.js`;
    static BUNDLE_MIN = `bundle-min.js`;
    static BUNDLE_DIR = `.bundles`;

    static SERVER_ENTRY_POINT = `server.js`;

    static HTML_INDEX = `index.html`;
    static JS_MAIN = `main.js`;
    static GENERATED_RSC = `.build.rsc`;

    static CORE_CACHE_DIR = ``;

    static LOCALES_DIR = `_locales`;

    static DEFINE_BUILD = `DEF_BUILD`;

    static Init() {
        if (this.__initialized) { return; }
        this.__initialized = true;

        this.buildUID = u.tils.UUID;
        this.args = new u.Argv(process.argv);

        let eC = process.env.INIT_CWD, //process.argv[1],
            cProject = null,
            cCore = path.resolve(__dirname, `../`);

        console.log(eC);

        if (this.args.Has(`context`)) {
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

        let
            projectPackageJson = NKMjs.projectConfig.__packagejson,
            author = { name: `author_name`, email: `mail@mail.com` };

        if (projectPackageJson) {
            if (projectPackageJson.author) {
                if(u.isString(projectPackageJson.author)){
                    //TODO : Try parse format such as "name <email@email.com> (url)"
                    author.name = projectPackageJson.author;
                }else{
                    author.name = u.tils.Get(projectPackageJson.author, `name`, `author_name`);
                    author.email = u.tils.Get(projectPackageJson.author, `email`, `mail@mail.com`);
                }
            }

            author.email = u.tils.Get(projectPackageJson, `email`, author.email);
        }

        console.log(`author ${chalk.white(`» `)} ${chalk.green(author.name)} / ${chalk.green(author.email)}`);

        process.argv = process.argv.splice(2);
        this.shortargs = new u.Argv(process.argv);

        this.projectVersion = ((NKMjs.projectConfig.__packagejson ? NKMjs.projectConfig.__packagejson.version : false) || `0.0.0`);
        this.CORE_CACHE_DIR = this.InCore(`caches`, `@nkmjs`);

        if (this.shortargs[`invalidate-cache`]) {
            console.log(chalk.blue.italic(`invalidating cache`));
            try { FSUTILS.rmdir(this.CORE_CACHE_DIR); } catch (e) { }
        }

        //console.log(`dirnameProject : ${this.dirnameProject}`);
        //console.log(`dirnameCore : ${this.dirnameCore}`);

        if (this.shortargs[`print-build-guid`]) {
            this.projectConfig.__keys[`build-uid`] = this.buildUID;
        }

        

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

    static CopyTempSync(p_src, p_dest) {
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

    static ModuleOwner(p_filePath) {

        p_filePath = p_filePath.split(path.sep).join(`/`);
        if (!p_filePath.includes(`node_modules/`)) { return null; }

        try {
            let splitPath = p_filePath.split(`node_modules/`),
                lastBitParts = splitPath.pop().split(`/`),
                firstBit = lastBitParts[0];

            if (firstBit[0] === `@`) {
                // namespace
                return `${firstBit}/${lastBitParts[1]}`;
            } else {
                return firstBit;
            }

        } catch (e) {
            return null;
        }

    }

}

module.exports = NKMjs;