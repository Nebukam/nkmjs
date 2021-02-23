'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ARGS = require("./helpers/argv-parser");
const NKMJSPackageConfig = require("./helpers/nkmjs-package-config");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class ScriptBase {

    static indent = 0;

    constructor(p_localId, p_requiredLocals = null, p_requiredArgs = null, p_parseValues = true) {

        NKMjs.Init();

        this.__localId = p_localId;
        this.__hasErrors = false;
        this.__indent = ScriptBase.indent;

        this.localConfig = null;

        try { this.localConfig = NKMjs.projectConfig[this.__localId]; }
        catch (e) { }

        //console.log(chalk.gray(`- ${this.Lines()}`));

        if (p_requiredLocals && p_requiredLocals.length > 0) {
            if (!this.localConfig) {
                console.log(chalk.red(`${this.Ind()}>> ERROR : ${this.__localId} is missing local config.`));
                this.__hasErrors = true;
                return;
            } else {
                for (let i = 0, n = p_requiredLocals.length; i < n; i++) {
                    let key = p_requiredLocals[i];
                    if (!(key in this.localConfig)) {
                        console.log(chalk.red(`${this.Ind()}>> ERROR : ${this.__localId} is missing required local config value : '${key}'.`));
                        this.__hasErrors = true;
                    }
                }
            }
        }

        if (p_requiredArgs && p_requiredArgs.length > 0) {
            for (let i = 0, n = p_requiredArgs.length; i < n; i++) {
                let key = p_requiredArgs[i];
                if (!(key in NKMjs.shortargs)) {
                    console.log(chalk.red(`${this.Ind()}>> ERROR : ${this.__localId} is missing required argument value : '${key}'.`));
                    this.__hasErrors = true;
                }
            }
        }

        console.log(chalk.gray(`${this.Ind()}`) + chalk.green(`>> `) + ` ${this.__localId} ` + chalk.gray.italic(`in ${NKMjs.InProject()}`));
        //console.log(this.localConfig);
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

    Run(p_path) {
        ScriptBase.indent = this.__indent + 1;
        let result = require(p_path);
        ScriptBase.indent = this.__indent;
        return result;
    }

}

module.exports = ScriptBase;