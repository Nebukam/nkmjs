'use strict';

const fs = require(`fs`);
const path = require(`path`);
const NKMjs = require(`./nkm.js`);
const ScriptBase = require(`./script-base`);
const UserInput = require(`./helpers/user-input`);
const ARGS = require("./helpers/argv-parser");

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskNKMInitConfig extends ScriptBase {

    constructor() {

        super(`task-init-config`, null, null, false);
        if (this.__hasErrors) { return; }

        // Check if a config already exists

        let defaults = JSON.parse(fs.readFileSync(NKMjs.InCore(`configs/nkmjs.config.json`), 'utf8'));

        if (NKMjs.projectConfig.__packagejson) {

            // A config file already exists. Use it as default.
            let e = NKMjs.projectConfig.__packagejson, hadMissingValue = false;
            for (var key in defaults) { if (!e.hasOwnProperty(key)) { e[key] = defaults[key]; hadMissingValue = true; } }
            defaults = e;

            if (NKMjs.args.skipConfigIfFound) {
                console.log(`An NKMjs config file already exists, skipping it as per --skipConfigIfFound`);
                if (hadMissingValue) {
                    console.log(`    *some default values were found missing, they've been appended.`);
                    fs.writeFileSync(NKMjs.InProject(`nkmjs.config.json`), JSON.stringify(defaults, null, 4));
                }
                return;
            } else {
                console.log(`Hey there ! Welcome to the nkmjs.config.json wizard !`);
                console.log(`It seems there's an existing config file -- we'll use it as a base, you won't loose its custom content if any.`);
            }

        } else {
            console.log(`Hey there ! Welcome to the nkmjs.config.json wizard !`);
            console.log(`We'll create a config file from scratch, here are a few questions to set everything up.`);
            console.log(`note : Defaults values are shown in parenthesis`);
        }

        let input = new UserInput();
        input.Start([
            {
                key: `verbose_name`,
                q: `Complete app name`
            },
            {
                key: `verbose_short_name`,
                q: `Short app name`
            },
            {
                key: `name`,
                q: `App name, identifier-style`,
                default: (a) => { return a.name ? a.name : a.verbose_short_name.split(` `).join(`-`).toLowerCase(); },
                validation: (val) => { if (!(/^[A-Za-z_-][A-Za-z0-9_-]*$/.test(val))) { return `Must be a valid identifier ! (/^[A-Za-z_-][A-Za-z0-9_-]*$/)` } return true; }
            },
            {
                key: `app_location`,
                q: `Sources location`,
            },
            {
                key: `cache_folders`,
                q: `Offline cache data folder, comma-separated (progressive web app, paths are relative to the app folder) ?`,
                sanitize: (a) => { return Array.isArray(a) ? a : (!a || a === ``) ? [] : a.split(`,`); }
            }
        ], this._Bind(this.GotAnswers), defaults);

    }

    GotAnswers(p_results) {
        let p = NKMjs.InProject(`nkmjs.config.json`);
        console.log(`Here is what the config looks like :`);
        console.log(p_results);
        console.log(`---`);
        console.log(`You can find & edit it here : ${p}`);
        fs.writeFileSync(p, JSON.stringify(p_results, null, 4));

        this.EnsurePackageJSON(p_results);

        let input = new UserInput();
        input.Start([
            {
                key: `bootstrap`,
                q: `Would you like to boostart the project ? Y/N`
            }
        ], (p_results) => {
            if (p_results.bootstrap.toUpperCase() === `Y`) { this.Run(`./task-bootstrap-project`); }
        }, { bootstrap: `N` });

    }

    EnsurePackageJSON(p_results){
        // Check if a package.json exists
        let packageJSON = null;
        try{
            packageJSON = JSON.parse(fs.readFileSync(NKMjs.InProject(`package.json`), 'utf8'));
        }catch(e){
            packageJSON = {
                name:p_results.name,
                description:p_results.description,
                repository:`TBD`,
                license:`TBD`
            }
        }

        let scripts = packageJSON.scripts;
        if(!scripts){ 
            scripts = {}; 
            packageJSON.scripts = scripts;
        }

        scripts["nkmjs-start"] = "nkmjs-task start clean";
        scripts["nkmjs-bundle"] = "nkmjs-task bundle";

        fs.writeFileSync(NKMjs.InProject(`package.json`), JSON.stringify(packageJSON, null, 4), 'utf8')

    }

}

new TaskNKMInitConfig();