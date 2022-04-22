'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const dom = require("./utils-dom");

const __media = `@media `;

const __styleCache = new Map();

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.Singleton
 * @memberof style
 */
class CSS_UTILS extends com.helpers.Singleton {
    constructor() { super(); }

    /**
     * @description Return an HTMLElement formatted as
     * <style> import url("path") </style>
     * @param {string} p_import_path 
     * @returns {Element}
     */
    static CSSImport(p_import_path) {
        let element = dom.El(`style`, { type: `text/css` });
        element.innerText = `@import url("${p_import_path}")`;
        return element;
    }

    /**
     * @description Return a CSS style element formatted as
     * <style> id{ prop:value; } </style>
     * @param {Object|string} p_properties 
     * @returns {Element}
     */
    static Style(p_properties) {
        let element = dom.El(`style`);

        let css = null;
        if (u.tils.IsString(p_properties)) {
            css = p_properties;
        } else {
            css = ``;
            if (p_properties != null && p_properties != undefined) {
                for (let att in p_properties) {
                    css += CSS.CSS(att, p_properties[att]);
                }
            }
        }

        element.innerText = css;
        return element;
    }

    /**
     * @description Return a CSS string formatted as
     * id{ prop:value; }
     * @param {string} p_id 
     * @param {object} p_properties 
     * @returns {string}
     */
    static CSS(p_id, p_properties) {
        if (!u.isObject(p_properties)) { return ``; }
        if (p_id.indexOf(__media) === 0) {
            let css = ``;
            for (let p in p_properties) { css += CSS_UTILS.CSS(p, p_properties[p]); }
            return `${p_id}{${css}}`;
        } else {
            return `${p_id}{${CSS_UTILS.InlineCSS(p_properties)}}`;
        }
    }

    /**
     * @description Return an inline CSS string formatted as
     * prop:value;
     * @param {string} p_id 
     * @param {object} p_properties 
     * @returns {string}
     */
    static InlineCSS(p_properties) {
        if (!u.isObject(p_properties)) { return ``; }
        let css = ``;
        if (p_properties != null && p_properties != undefined) {
            for (let att in p_properties) { css += `${att}:${p_properties[att]};`; }
        }
        return css;
    }

    /**
     * @description Overwrites properties in base with copies of value in source
     * @param {*} p_base 
     * @param {*} p_source 
     */
    static Merge(p_base, p_source) {

        if (!p_base) { return JSON.parse(JSON.stringify(p_source)); }

        for (let name in p_source) {

            let baseValue = p_base[name],
                sourceValue = p_source[name];

            // For each property in p_source, add it to p_base and either overwrite or merge.
            if (name in p_base) {
                if (u.isArray(sourceValue)) {
                    if (sourceValue[0] === null) {
                        //first value is null, remove previous values
                        let arrCopy = [...sourceValue];
                        arrCopy.shift(); //remove null
                        p_base[name] = arrCopy;
                    } else {
                        if (u.isArray(baseValue)) {
                            //Append values at the end of existing array
                            for (let i = 0, n = sourceValue.length; i < n; i++) {
                                let itemValue = sourceValue[i];
                                if (!baseValue.includes(itemValue)) { baseValue.push(itemValue); }
                            }
                        } else {
                            //Copy array
                            p_base[name] = [...sourceValue];
                        }
                    }

                } else if (u.isObject(sourceValue)) { this.Merge(baseValue, sourceValue); }
                else { p_base[name] = sourceValue; }
            } else {
                if (u.isArray(sourceValue)) { p_base[name] = [...sourceValue]; }
                else if (u.isObject(sourceValue)) { p_base[name] = JSON.parse(JSON.stringify(sourceValue)); }
                else { p_base[name] = sourceValue; }
            }
        }

        return p_base;

    }

    /**
     * @description Add p_source properties & values from p_source missing into p_base.
     * Only merge array, does not overwrite values.
     * @param {*} p_base 
     * @param {*} p_source 
     */
    static Compose(p_base, p_source) {

        if (!p_base) { return JSON.parse(JSON.stringify(p_source)); }

        for (let name in p_source) {

            let baseValue = p_base[name],
                sourceValue = p_source[name];

            // For each property in p_source, add it to p_base if it does not exists already.
            // Only merge arrays (in front), if allowed.
            if (name in p_base) {
                if (u.isArray(sourceValue)) {
                    if (u.isArray(baseValue)) {
                        if (baseValue[0] === null) { continue; }
                        for (let i = 0, n = sourceValue.length; i < n; i++) {
                            let itemValue = sourceValue[i];
                            if (!baseValue.includes(itemValue)) { baseValue.unshift(itemValue); }
                        }
                    }
                } else if (u.isObject(sourceValue)) { this.Compose(baseValue, sourceValue); }
                else { p_base[name] = sourceValue; }
            } else {
                if (u.isArray(sourceValue)) { p_base[name] = [...sourceValue]; }
                else if (u.isObject(sourceValue)) { p_base[name] = JSON.parse(JSON.stringify(sourceValue)); }
                else { p_base[name] = sourceValue; }
            }
        }

        return p_base;

    }

    /**
     * @description Add p_source properties & values from p_source missing into p_base.
     * Only merge array, does not overwrite values.
     * @param {*} p_base 
     * @param {*} p_source 
     */
    static Extends(p_base, p_source) {

        if (!p_base) { return JSON.parse(JSON.stringify(p_source)); }

        for (let name in p_source) {

            let baseValue = p_base[name],
                sourceValue = p_source[name];

            // For each property in p_source, add it to p_base if it does not exists already.
            // Only merge arrays (in front), if allowed.
            if (name in p_base) {
                if (u.isArray(sourceValue)) {
                    if (u.isArray(baseValue)) {
                        if (baseValue[0] === null) { continue; }
                        for (let i = 0, n = sourceValue.length; i < n; i++) {
                            let itemValue = sourceValue[i];
                            if (!baseValue.includes(itemValue)) { baseValue.unshift(itemValue); }
                        }
                    }
                } else if (u.isObject(sourceValue)) { this.Extends(baseValue, sourceValue); }
            } else {
                if (u.isArray(sourceValue)) { p_base[name] = [...sourceValue]; }
                else if (u.isObject(sourceValue)) { p_base[name] = JSON.parse(JSON.stringify(sourceValue)); }
                else { p_base[name] = sourceValue; }
            }
        }

        

        return p_base;

    }

    /**
     * Extract CSS Classes rules from a string
     * @param {*} p_styleString 
     * @returns 
     */
     static ClassCSS(p_styleString) {
        let result = {};
        try {
            //.st0 |{| fill:#FF00FF;}.st1 |{| fill:#FF00FF;}
            let baseSplit = p_styleString.split(`{`);
            if (baseSplit.length > 1) {
                //Has classes
                let className = baseSplit[0];
                for (let b = 1; b < baseSplit.length; b++) {
                    let spl = baseSplit[b].split(`}`);
                    result[className] = this.Rules(spl[0]);
                    className = spl[1];
                }
            } else {
                result = this.Rules(p_styleString);
            }
        } catch (e) { }
        return result;
    }

    /**
     * Extract rules from a CSS string
     * @param {*} p_string 
     * @returns 
     */
    static Rules(p_string) {
        let
            obj = {};

        if (!p_string || p_string == ``) {
            return obj;
        }

        let rules = p_string.trim().split(`;`);

        if (rules.length == 1) {
            // Single rule
            let rule = p_string.split(`:`);
            obj[rule[0]] = rule[1];
        } else {
            for (let s = 0; s < rules.length; s++) {
                let rule = rules[s].split(`:`);
                obj[rule[0]] = rule[1];
            }
        }

        return obj;
    }

}

module.exports = CSS_UTILS;