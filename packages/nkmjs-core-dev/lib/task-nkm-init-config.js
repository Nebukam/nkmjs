'use strict';

const fs = require(`fs`);
const path = require(`path`);
const NKMjs = require(`./nkm.js`);
const ScriptBase = require(`./script-base`);
const UserInput = require(`./helpers/user-input`);
const ARGS = require("./helpers/argv-parser");

class TaskNKMInitConfig extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`task-init-config`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Check if a config already exists

        let defaults = JSON.parse(fs.readFileSync(NKMjs.InCore(`configs/nkmjs.config.json`), 'utf8'));

        if (NKMjs.projectConfig.__hasNKMConfig) {

            // A config file already exists. Use it as default.
            let e = NKMjs.projectConfig.__raw, hadMissingValue = false;
            for (var key in defaults) { if (!e.hasOwnProperty(key)) { e[key] = defaults[key]; hadMissingValue = true; } }
            defaults = e;

            if (NKMjs.args.skipConfigIfFound) {
                this._logFwd(`An NKMjs config file already exists, skipping it as per --skipConfigIfFound`, ``);
                if (hadMissingValue) {
                    this._logFwd(`    *some default values were found missing, they've been appended.`, ``);
                    fs.writeFileSync(NKMjs.InProject(`nkmjs.config.json`), JSON.stringify(defaults, null, 4));
                }
                return;
            } else {
                this._logFwd(`Hey there ! Welcome to the nkmjs.config.json wizard !`, ``);
                this._logFwd(`It seems there's an existing config file -- we'll use it as a base, you won't loose its custom content if any.`, ``);
            }

        } else {
            this._logFwd(`Hey there ! Welcome to the nkmjs.config.json wizard !`, ``);
            this._logFwd(`We'll create a config file from scratch, here are a few questions to set everything up.`, ``);
            this._logFwd(`note : Defaults values are shown in parenthesis`, ``);
        }

        let input = new UserInput();
        input.Start([
            {
                key: `longName`,
                q: `Complete app name`
            },
            {
                key: `shortName`,
                q: `Short app name`
            },
            {
                key: `name`,
                q: `App name, identifier-style`,
                default: (a) => { return a.name ? a.name : a.shortName.split(` `).join(`-`).toLowerCase(); },
                validation: (val) => { if (!(/^[A-Za-z_-][A-Za-z0-9_-]*$/.test(val))) { return `Must be a valid identifier ! (/^[A-Za-z_-][A-Za-z0-9_-]*$/)` } return true; }
            },
            {
                key: `srcLocation`,
                q: `Sources location`,
            },
            {
                key: `cacheDirectories`,
                q: `Offline cache data folder, comma-separated (progressive web app, paths are relative to the app folder) ?`,
                sanitize: (a) => { return Array.isArray(a) ? a : (!a || a === ``) ? [] : a.split(`,`); }
            }
        ], this._Bind(this.GotAnswers), defaults);

    }

    GotAnswers(p_results) {
        let p = NKMjs.InProject(`nkmjs.config.json`);
        this._logFwd(`Here is what the config looks like :`, ``);
        console.log(p_results);
        this._logFwd(`---`, ``);
        this._logFwd(`You can find & edit it here : ${p}`, ``);
        fs.writeFileSync(p, JSON.stringify(p_results, null, 4));

        this.EnsurePackageJSON(p_results);

        let input = new UserInput();
        input.Start([
            {
                key: `bootstrap`,
                q: `Would you like to boostart the project ? Y/N`
            }
        ], (p_results) => {
            if (p_results.bootstrap.toUpperCase() === `Y`) { this.Run(`./task-bootstrap-project`, this.End); }
            else { this.End }
        }, { bootstrap: `N` });

    }

    EnsurePackageJSON(p_results) {
        // Check if a package.json exists
        let packageJSON = NKMjs.projectConfig.__packagejson,
            needUpdate = !!packageJSON,
            wantedScripts = {
                ['nkmjs']: `nkmjs`,
            };

        if (needUpdate) {

            packageJSON = {
                name: p_results.name,
                description: p_results.description,
                repository: `TBD`,
                license: `TBD`,
                scripts: wantedScripts
            }

        } else {

            let scripts = packageJSON.scripts;
            if (!scripts) { scripts = packageJSON.scripts = {}; }

            for (var key in wantedScripts) {
                if (!scripts.hasOwnProperty(key)) {
                    needUpdate = true;
                    scripts[key] = wantedScripts[key];
                }
            }

        }

        if (needUpdate) {
            fs.writeFileSync(NKMjs.InProject(`package.json`), JSON.stringify(packageJSON, null, 4), 'utf8')
        }

    }

}

module.exports = TaskNKMInitConfig;