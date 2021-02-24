const path = require(`path`);
const chalk = require('chalk');

const ARGS = require(`./helpers/argv-parser`);
const NKMJSPackageConfig = require(`./helpers/nkmjs-package-config`);



class NKMjs {

    static ELECTRON_ENTRY_POINT = `index-electron.js`;
    static ELECTRON_HTML_INDEX = `index-electron.html`;
    static BUNDLE_ENTRY_POINT = `bundle-entry-point.js`;
    static PWA_SERVICE_WORKER = `service-worker.js`;
    static BUNDLE = `bundle.js`;
    static BUNDLE_MIN = `bundle-min.js`;
    static HTML_INDEX = `index.html`;
    static JS_MAIN = `main.js`;


    static Init() {
        if (this.__initialized) { return; }
        this.__initialized = true;

        this.args = new ARGS(process.argv);

        let eC = process.env.INIT_CWD, //process.argv[1],
            cProject = null,
            cCore = path.resolve(__dirname, `../`);

            console.log(eC);

        if(`context` in this.args){
            cProject = this.args.context;
        }else{
            if (eC.includes(`node_modules`)) {
                cProject = eC;
                while (cProject.includes(`node_modules`)) { cProject = path.resolve(cProject, `../`); }
            }else{
                cProject = process.env.INIT_CWD; //path.dirname(eC);
            }
        }

        this.dirnameProject = cProject;
        this.dirnameCore = cCore;

        this.coreConfig = new NKMJSPackageConfig(cCore, false);
        this.coreConfigCompiled = new NKMJSPackageConfig(cCore, true);

        this.projectConfig = new NKMJSPackageConfig(cProject, false);
        this.projectConfigCompiled = new NKMJSPackageConfig(cProject, true);

        if (!this.projectConfig.__packagejson) {
            console.log(chalk.yellow(`>> WARNING : Current project (${path.basename(cProject)}) has no nkmjs.config.json. Will be using defaults instead.`));
            this.validProject = false;
            let defaultConfigPath = path.resolve(cCore, `configs`);
            this.projectConfig = new NKMJSPackageConfig(defaultConfigPath, false);
            this.projectConfigCompiled = new NKMJSPackageConfig(defaultConfigPath, true);
        }else{
            this.validProject = true;
        }

        process.argv = process.argv.splice(2);
        this.shortargs = new ARGS(process.argv);

        //console.log(`dirnameProject : ${this.dirnameProject}`);
        //console.log(`dirnameCore : ${this.dirnameCore}`);



    }

    static initialized = false;
    static args = null;
    static shortargs = null;
    static executable = ``;
    static validProject = false;

    static coreConfig = null;
    static coreConfigCompiled = null;

    static projectConfig = null;
    static projectConfigCompiled = null;

    static dirnameCore = null;
    static dirnameApp = null;
    static dirnameProject = null;

    static __data = {};

    static Set(p_id, p_value){
        this.__data[p_id] = p_value;
    }

    static Get(p_id, p_fallback){
        if(p_id in this.__data){ return this.__data[p_id]; }
        else{ return p_fallback; }
    }

    static InCore(...pathSegments) {
        return path.resolve(this.dirnameCore, ...pathSegments);
    }

    static InCoreModules(...pathSegments) {
        return path.resolve(this.dirnameCore, `node_modules`, ...pathSegments);
    }

    static InProject(...pathSegments) {
        return path.resolve(this.dirnameProject, ...pathSegments);
    }

    static InApp(...pathSegments) {
        return this.InProject(this.projectConfigCompiled.app_location, ...pathSegments);
    }

    static InBuilds(...pathSegments) {
        return this.InProject(this.projectConfigCompiled.build_location, ...pathSegments);
    }

    static InAssets(...pathSegments) {
        return this.InProject(this.projectConfigCompiled.assets_location, ...pathSegments);
    }

    static InStyle(...pathSegments) {
        return this.InProject(this.projectConfigCompiled.style_location, ...pathSegments);
    }

    static Shorten(p_path){
        p_path = this.Short(p_path, this.InCore(), `{core}`);
        p_path = this.Short(p_path, this.InApp(), `{app}`);
        p_path = this.Short(p_path, this.InBuilds(), `{builds}`);
        p_path = this.Short(p_path, this.InAssets(), `{assets}`);
        p_path = this.Short(p_path, this.InStyle(), `{styles}`);
        p_path = this.Short(p_path, this.InProject(), `{project}`);
        return p_path;
    }

    static Short(p_path, p_prefix, p_rep = `.`, p_sanitize = false){
        let p = p_path.split(p_prefix).join(p_rep);
        return p_sanitize ? p.split('\\').join('/') : p;
    }

    static Sanitize(p_name){
        p_name = p_name.split(`@`).join(`external-`);
        p_name = p_name.split(`/`).join(`-`);
        p_name = p_name.split(`\\`).join(`-`);
        return p_name;
    }

}

module.exports = NKMjs;