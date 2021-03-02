'use strict';

const fs = require(`fs`);
const path = require(`path`);

class NKMJSPackageConfig {
    constructor(p_modulePath, p_parseValues = true) {
        // Load package.json
        // check if there is an 'nkmjs' config object
        // load it.
        this.__modulePath = p_modulePath;
        this.__raw = null;
        this.__moduleID = p_modulePath ? path.basename(p_modulePath) : `invalid_module_id`;
        this.__hasNKMConfig = true;
        this.__packagejson = null;

        try {
            this.__packagejson = JSON.parse(fs.readFileSync(path.resolve(p_modulePath, `package.json`)));
        }
        catch (e) {

        }

        try {

            let data = JSON.parse(fs.readFileSync(path.resolve(p_modulePath, `nkmjs.config.json`)));
            this.__raw = data;
            let keys = {};

            if (data) {

                for (let key in data) {
                    let val = data[key];
                    if (typeof val === 'string') { keys[key] = val; }
                    else if (Array.isArray(val)) {

                    } else {
                        // flatten object content into the config -- this is just a dangerous quickfix
                        // DANGER
                        // DANGER
                        for (let k in val) {
                            data[k] = val[k];
                            if(typeof val[k] === 'string'){
                                keys[k] = val[k];
                            }
                        }
                        // DANGER
                        // DANGER
                    }
                }

                //resolve first-level references -- on keys themselves first
                for (let key in keys) {
                    let val = keys[key];
                    if (typeof val === 'string') {
                        if (val.includes(`%`)) {
                            for (let i = 0; i < 10; i++) {
                                for (let k in keys) {
                                    val = val.split(`%${k}%`).join(keys[k]);
                                }
                            }
                            keys[key] = val;
                        }
                    }
                }

                for (let key in data) {
                    let val = data[key];
                    val = p_parseValues ? this.__replace(val, keys) : val;
                    data[key] = val;
                    this[key] = val;
                }

            } else {
                this.__hasNKMConfig = false;
            }
            /*
            let data = JSON.parse(fs.readFileSync(path.resolve(p_modulePath, `package.json`)));
            this.__raw = data;
            if (data.config.nkmjs) {
                let config = data.config.nkmjs;
                for (let key in config) { this[key] = config[key]; }
            }
            */
        } catch (e) {
            this.__hasNKMConfig = false;
        }
    }

    __replace(p_obj, p_keys) {

        if (Array.isArray(p_obj)) {
            // Go through each value in the array
            for (let i = 0, n = p_obj.length; i < n; i++) {
                p_obj[i] = this.__replace(p_obj[i], p_keys);
            }
        } else if (typeof p_obj === 'string') {
            if (p_obj.includes(`%`)) {
                for (let k in p_keys) {
                    p_obj = p_obj.split(`%${k}%`).join(p_keys[k]);
                }
            }
        } else if (typeof p_value === 'object') {
            for (var key in p_obj) { p_obj[key] = this.__replace(p_obj[key], p_keys); }
        }

        return p_obj;

    }

}

module.exports = NKMJSPackageConfig;