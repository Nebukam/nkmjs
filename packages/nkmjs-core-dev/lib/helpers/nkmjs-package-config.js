'use strict';

const fs = require(`fs`);
const path = require(`path`);

class NKMJSPackageConfig {
    constructor(p_modulePath) {
        // Load package.json
        // check if there is an 'nkmjs' config object
        // load it.
        this.__modulePath = p_modulePath;
        this.__raw = null;
        this.__moduleID = p_modulePath ? path.basename(p_modulePath) : `invalid_module_id`;
        this.__hasNKMConfig = false;
        this.__packagejson = null;
        this.__keys = {};

        try { this.__packagejson = JSON.parse(fs.readFileSync(path.resolve(p_modulePath, `package.json`))); }
        catch (e) { }

        try {

            let data = JSON.parse(fs.readFileSync(path.resolve(p_modulePath, `nkmjs.config.json`))),
                defaults = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../configs/nkmjs.config.json`)));

            this._ensureDefaults(data, defaults);
            // Copy original, unparsed data into _raw
            this.__raw = JSON.parse(JSON.stringify(data));

            // Gather & process all keys in config
            this._processKeys(data);
            for (let i = 0; i < 10; i++) { this._resolveKeys(); }

            // Flatten config values
            for (let key in data) {
                let value = this.__parse(data[key]);

                if (!value) {
                    console.log(`${key} => ${value} / ${data[key]}`);
                }

                this[key] = value;
            }

            this.__hasNKMConfig = true;

        } catch (e) { }

    }

    _ensureDefaults(p_source, p_defaults) {
        for (var key in p_defaults) {
            if (!p_source.hasOwnProperty(key)) {
                p_source[key] = p_defaults[key];
            } else {
                let sourceValue = p_source[key],
                    defaultValue = p_defaults[key];
                if (Array.isArray(sourceValue)) {
                    // Push array values from default to source ? heh. Sounds a bit rash :(
                    for (let i = 0, n = defaultValue.length; i < n; i++) {
                        let arrValue = defaultValue[i];
                        if (!sourceValue.includes(arrValue)) { sourceValue.unshift(arrValue); }
                    }
                } else if (typeof sourceValue === 'object') {
                    this._ensureDefaults(sourceValue, defaultValue);
                }
            }
        }
    }

    _processKeys(p_source, p_prefix = null) {
        if (p_prefix === null) { p_prefix = ``; }
        else { p_prefix += `.`; }

        for (var key in p_source) {
            let value = p_source[key];
            if (Array.isArray(value)) {

            } else if (typeof value === 'object') {
                this._processKeys(value, `${p_prefix}${key}`);
            } else {
                this.__keys[`${p_prefix}${key}`] = value;
            }
        }
    }

    _resolveKeys() {
        // replace keys content with themselves
        // { "1":"val", "2":"%1%" } -> { "1":"val", "2":"val" }
        for (var key in this.__keys) {
            let value = this.__keys[key];
            if (typeof value !== 'string' || !key.includes(`%`)) { continue; }
            for (var oKey in this.__keys) { value = value.split(`%${oKey}%`).join(this.__keys[oKey]); }
            this.__keys[key] = value;
        }
    }

    __parse(p_value) {

        if (Array.isArray(p_value)) {
            for (let i = 0, n = p_value.length; i < n; i++) {
                p_value[i] = this.__parse(p_value[i]);
            }
        } else if (typeof p_value === 'object') {
            for (var key in p_value) {
                p_value[key] = this.__parse(p_value[key]);
            }
        } else if (typeof p_value === 'string') {
            if (p_value.includes(`%`)) {
                for (let k in this.__keys) {
                    p_value = p_value.split(`%${k}%`).join(this.__keys[k]);
                }
            }
        }

        return p_value;

    }

}

module.exports = NKMJSPackageConfig;