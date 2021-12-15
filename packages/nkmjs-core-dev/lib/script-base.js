'use strict';

const NKMjs = require(`./nkm`);
const chalk = require('chalk');
const RunList = require(`./helpers/run-list`);

class ScriptBase {

    static indent = 0;
    static runOnce = true;
    static __ranOnce = false;
    static __undefined = Symbol(`undefined`);

    constructor(
        p_localId,
        p_onCompleteFn = null,
        p_options = null) {

        let
            requiredLocals = p_options ? p_options.requiredLocals : null,
            requiredArgs = p_options ? p_options.requiredArgs : null,
            requiredGlobals = p_options ? p_options.requiredGlobals : null,
            requiredKeys = p_options ? p_options.requiredKeys : null,
            requiredConfigs = p_options ? p_options.requiredConfigs : null,
            skipKey = p_options ? p_options.skipKey : null;

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

        this.__shouldSkip = false;
        if (this.constructor.runOnce && this.constructor.__ranOnce) {
            //this._log(chalk.white(`× `)+chalk.italic(`skipping ${p_localId}, it ran once already.`));
            this.__shouldSkip = true;
            this.__running = false;
            return;
        }

        if (skipKey && NKMjs.shortargs.Has(skipKey)) {
            this._log(chalk.white(`× `) + chalk.italic(`--${skipKey} » skipping ${p_localId}.`));
            this.__shouldSkip = true;
            this.__running = false;
            return;
        }

        if (requiredGlobals) {
            for (let i = 0, n = requiredGlobals.length; i < n; i++) {
                let key = requiredGlobals[i],
                    value = NKMjs.Get(key, this.__undefined); // Because null or undefined may be valid value for some scripts !
                if (value === this.__undefined) {
                    this._log(chalk.white(`× `) + chalk.italic(`NKMjs.${key} undefined » skipping ${p_localId}.`));
                    this.__shouldSkip = true;
                    this.__running = false;
                    return;
                }
            }
        }

        if (requiredKeys) {
            for (let i = 0, n = requiredKeys.length; i < n; i++) {
                if (!NKMjs.projectConfig.__keys.hasOwnProperty(requiredKeys[i])) {
                    this._log(chalk.white(`× `) + chalk.italic(`NKMjs.${requiredKeys[i]} not set » skipping ${p_localId}.`));
                    this.__shouldSkip = true;
                    this.__running = false;
                    return;
                }
            }
        }

        if (requiredConfigs) {
            for (let i = 0, n = requiredConfigs.length; i < n; i++) {
                if (!NKMjs.projectConfig.hasOwnProperty(requiredConfigs[i])) {
                    this._log(chalk.white(`× `) + chalk.italic(`${requiredConfigs[i]} config missing » skipping ${p_localId}.`));
                    this.__shouldSkip = true;
                    this.__running = false;
                    return;
                }
            }
        }

        this.constructor.__ranOnce = true;

        this.localConfig = null;

        try { this.localConfig = NKMjs.projectConfig[this.__localId]; }
        catch (e) { }

        if (requiredLocals && requiredLocals.length > 0) {
            if (!this.localConfig) {
                this._logError(`${this.__localId} is missing local config.`);
                this.__hasErrors = true;
                return;
            } else {
                for (let i = 0, n = requiredLocals.length; i < n; i++) {
                    let key = requiredLocals[i];
                    if (!(key in this.localConfig)) {
                        this._logError(`${this.__localId} is missing required local config value : '${key}'.`);
                        this.__hasErrors = true;
                    }
                }
            }
        }

        if (requiredArgs && requiredArgs.length > 0) {
            for (let i = 0, n = requiredArgs.length; i < n; i++) {
                let key = requiredArgs[i];
                if (!NKMjs.shortargs.Has(key)) {
                    this._logError(`${this.__localId} is missing required argument value : '${key}'.`);
                    this.__hasErrors = true;
                }
            }
        }

        if (this.__indent == 0) { this._logFwd(`${this.__localId} ` + chalk.gray.italic(`in ${NKMjs.InProject()}`)); }
        else { this._logFwd(this.__localId); }


    }

    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    Ind(p_offset = 0, p_char = `· `) {
        let offset = ``;
        for (let i = 0; i < (this.__indent + p_offset); i++) {
            offset += p_char;
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

    /**
     * 
     * @param {string|array} p_path 
     * @param {function} p_onCompleteFn 
     */
    Run(p_path, p_onCompleteFn = null) {

        if (Array.isArray(p_path)) {

            let _scriptList = new RunList(
                this,
                p_path,
                p_onCompleteFn
            );

        } else {

            ScriptBase.indent = this.__indent + 1;

            let _script = require(p_path),
                instance = new _script(p_onCompleteFn);

            ScriptBase.indent = this.__indent;

        }

    }

    End() {
        this.__running = false;
        if (this.__onCompleteFn) { this.__onCompleteFn(); }
    }

    //  ----> Log

    _log(p_msg, p_offset = 0) {
        console.log(chalk.gray(`${this.Ind(p_offset)}${p_msg}`));
    }

    _logFwd(p_msg, p_char = null, p_offset = 0) {
        if (p_char === null) {
            console.log(chalk.gray(`${this.Ind(p_offset)}`) + chalk.green(`» `) + `${p_msg}`);
        } else {
            //console.log(chalk.gray(`${this.Ind()}`) + `· ` + chalk.green(`${p_char} `) + chalk.gray(p_msg));
            console.log(chalk.gray(`${this.Ind(p_offset)}`) + chalk.green(`${p_char} `) + chalk.gray(p_msg));
        }
    }

    _logError(p_msg, p_offset = 0) {
        console.log(chalk.red(`${this.Ind(p_offset)}× ${chalk.bgRed.white(` ${this.__localId} ERR `)} : `) + chalk.red(p_msg));
        //console.log(chalk.red(`${this.Ind()}>> ERROR: `) + p_msg);
    }

    _logWarn(p_msg, p_offset = 0) {
        //console.log(chalk.yellow(`${this.Ind(p_offset)}! `) + p_msg);
        console.log(chalk.yellow(`${this.Ind(p_offset)}! ${chalk.yellow(`${this.__localId}`)} : `) + p_msg);
    }

}

module.exports = ScriptBase;