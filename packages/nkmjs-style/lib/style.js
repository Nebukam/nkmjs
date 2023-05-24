'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const helpers = require(`./helpers`);

const __REF = `@`;
var _themeId = 'default';

const _cache = new Map();
const _signalBox = new com.signals.SignalBox(null);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof style
 */
module.exports = {

    Watch: _signalBox.Watch.bind(_signalBox),
    WatchOnce: _signalBox.WatchOnce.bind(_signalBox),
    Unwatch: _signalBox.Unwatch.bind(_signalBox),
    Broadcast: _signalBox.Broadcast.bind(_signalBox),

    get themeId() { return _themeId; },
    set themeId(p_value) { _themeId = p_value || 'default'; },

    /**
     * @description TODO
     * @param {string} p_key 
     */
    GetCSSLink: function (p_key, p_themeId = null) {
        if (p_key[0] === __REF) { p_key = `${u.FULL(u.PATH.STYLE)}/${p_themeId || _themeId}${p_key.substring(1)}`; }
        else { p_key = u.FULL(p_key); }
        return p_key;
    },

    // ----> Process & Cache

    /**
     * @description TODO
     * @param {class} p_class 
     * @param {function} p_generator 
     * @param {boolean} [p_invalidateCache] 
     * @returns {array} an array of styling items. Contains
     */
    Build: function (p_class, p_generator, p_invalidateCache = false) {

        let cachedFragment = _cache.get(p_class);

        if (cachedFragment && !p_invalidateCache) { return cachedFragment; }

        let
            fragment = document.createDocumentFragment(),
            nfos = com.NFOS.Get(p_class),
            imports = ``;

        if (nfos) {

            if (nfos.css) {
                for (let i = nfos.css.length - 1; i >= 0; i--) {
                    helpers.El(`link`, { href: module.exports.GetCSSLink(nfos.css[i]), rel: `stylesheet`, type: `text/css` }, fragment);
                }
            }
        }

        let rulesets = p_generator._Style ? p_generator._Style?.call(p_generator) : p_generator(p_class);

        if (u.isObject(rulesets) && Object.keys(rulesets).length) {

            let styleString = ``;

            for (let selector in rulesets) {
                styleString += module.exports.Ruleset(selector, rulesets[selector]);
            }

            imports += styleString;

        }

        let styleElement = helpers.El(`style`, { type: `text/css` }, fragment);
        styleElement.innerText = imports;

        _cache.set(p_class, fragment);

        return fragment;

    },

    //#region Stringify

    /**
     * @description Return a CSS string formatted as
     * id{ prop:value; }
     * @param {string} p_selector 
     * @param {object} p_properties 
     * @returns {string}
     */
    Ruleset: function (p_selector, p_properties) {

        if (!Object.keys(p_properties).length) { return ``; }

        if (p_selector.startsWith('@')) {
            // Nest inside statement. Support @keyframe, @media, @supports etc
            let css = ``;
            for (let p in p_properties) { css += module.exports.Ruleset(p, p_properties[p]); }
            return `${p_selector}{${css}}`;
        } else {
            // Regular Inline
            return `${p_selector}{${module.exports.Inline(p_properties)}}`;
        }
    },

    /**
     * @description Return an inline CSS string formatted as
     * prop:value;
     * @param {string} p_id 
     * @param {object} p_properties 
     * @returns {string}
     */
    Inline: function (p_properties) {
        let css = ``;
        for (let att in p_properties) {
            let val = p_properties[att];
            if (u.isNumber(val)) { css += `${att}:${val};`; }
            else if (u.isString(val)) { css += val.endsWith(`;`) ? `${att}:${val}` : `${att}:${val};`; }
        }
        return css;
    },

    /**
     * @description Add p_source properties & values from p_source missing into p_base.
     * @param {*} p_base 
     * @param {*} p_source 
     */
    Extends: function (p_base, p_source) {

        if (!p_base) { return { ...p_source }; }

        for (let selector in p_source) {

            let src = p_source[selector];
            if (u.isObject(src)) {
                p_base[selector] = module.exports.Extends(p_base[selector], src);
            } else {
                if (!p_base[selector]) { p_base[selector] = src; }
            }

        }

        return p_base;

    },

    //#endregion



}
