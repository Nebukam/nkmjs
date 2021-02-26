'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ARGS = require("./helpers/argv-parser");
const NKMJSPackageConfig = require("./helpers/nkmjs-package-config");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class ScriptBase {

    static indent = 0;

    constructor(
        p_localId,
        p_requiredLocals = null,
        p_requiredArgs = null,
        p_onCompleteFn = null) {

        this.__running = true;
        this.__onCompleteFn = p_onCompleteFn;

        this._Bind(this.End);
        this._Bind(this.Run);
        this._Bind(this._log);
        this._Bind(this._logError);
        this._Bind(this._logWarn);

        NKMjs.Init();

        this.__localId = p_localId;
        this.__hasErrors = false;
        this.__indent = ScriptBase.indent;

        this.localConfig = null;

        try { this.localConfig = NKMjs.projectConfig[this.__localId]; }
        catch (e) { }

        if (p_requiredLocals && p_requiredLocals.length > 0) {
            if (!this.localConfig) {
                this._logError(`${this.__localId} is missing local config.`);
                this.__hasErrors = true;
                return;
            } else {
                for (let i = 0, n = p_requiredLocals.length; i < n; i++) {
                    let key = p_requiredLocals[i];
                    if (!(key in this.localConfig)) {
                        this._logError(`${this.__localId} is missing required local config value : '${key}'.`);
                        this.__hasErrors = true;
                    }
                }
            }
        }

        if (p_requiredArgs && p_requiredArgs.length > 0) {
            for (let i = 0, n = p_requiredArgs.length; i < n; i++) {
                let key = p_requiredArgs[i];
                if (!(key in NKMjs.shortargs)) {
                    this._logError(`${this.__localId} is missing required argument value : '${key}'.`);
                    this.__hasErrors = true;
                }
            }
        }

        this._logFwd(`${this.__localId} ` + chalk.gray.italic(`in ${NKMjs.InProject()}`));

    }

    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    Resolve(p_path) { return path.resolve(NKMjs.InProject(), p_path); }

    Ind() {
        let offset = ``;
        for (let i = 0; i < this.__indent; i++) {
            offset += `· `;
        }
        return offset;
    }

    Lines() {
        let offset = ``;
        for (let i = 0; i < this.__indent; i++) {
            offset += ` `;
        }
        return offset;
    }

    Run(p_path, p_doneFn = null) {

        ScriptBase.indent = this.__indent + 1;

        let _script = require(p_path),
            instance = new _script(p_doneFn);

        ScriptBase.indent = this.__indent;

        return instance;

    }

    End() { if (this.__onCompleteFn) { this.__onCompleteFn(); } }

    //  ----> Log

    _log(p_msg) {
        console.log(chalk.gray(`${this.Ind()} ${p_msg}`));
    }

    _logFwd(p_msg, p_char = null) {
        if (p_char === null) {
            console.log(chalk.gray(`${this.Ind()}`) + chalk.green(`>> `) + `${p_msg}`);
        } else {
            //console.log(chalk.gray(`${this.Ind()}`) + `· ` + chalk.green(`${p_char} `) + chalk.gray(p_msg));
            console.log(chalk.gray(`${this.Ind()}`) + chalk.green(`${p_char} `) + chalk.gray(p_msg));
        }
    }

    _logError(p_msg) {        
        console.log(chalk.gray(`${this.Ind()}`) + chalk.redBright(`⚠ ERR : `) + chalk.bgRed.whiteBright(taskId) + ` says : ` + chalk.gray(p_msg));
        //console.log(chalk.red(`${this.Ind()}>> ERROR: `) + p_msg);
    }

    _logWarn(p_msg) {
        console.log(chalk.yellow(`${this.Ind()}!! `) + p_msg);
    }

}

module.exports = ScriptBase;