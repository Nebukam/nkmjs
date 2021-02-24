'use strict';

const { U, PATH, UDOM } = require(`@nkmjs/utils`);
const { Dictionary } = require(`@nkmjs/collections`);
const { NFOS, DisposableObject } = require(`@nkmjs/common`);

const CSS_UTILS = require(`./css`);

const __DELIM_KVP = `|`;
const __REF = `@`;

/*

    {
        '.element':{ 'property':'|value|' },
        '.element':{ 'property':'25px' },
        '.element':{ 'color':'|warning|' },
        '.globalElement':``
    }

*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof style
 */
class Palette extends DisposableObject {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._STYLE = null;

        this._fonts = {};
        this._colors = {};
        this._variables = {};
        this._rulesets = {};
        this._suffixes = {};
        this._properties = {};
        this._documentRulesets = {};
        this._externalCSSMap = {};
        this._themeId = `default`;

        this._cache = new Dictionary();

    }

    /**
     * @description TODO
     * @param {Palette} p_palette 
     */
    InitFrom(p_palette) {

        this._fonts = JSON.parse(JSON.stringify(p_palette._fonts));
        this._colors = CSS_UTILS.Merge(this._colors, p_palette._colors);
        this._variables = JSON.parse(JSON.stringify(p_palette._variables));
        this._rulesets = JSON.parse(JSON.stringify(p_palette._rulesets));
        this._suffixes = JSON.parse(JSON.stringify(p_palette._suffixes));
        this._properties = JSON.parse(JSON.stringify(p_palette._properties));
        this._documentRulesets = JSON.parse(JSON.stringify(p_palette._documentRulesets));
        this._externalCSSMap = JSON.parse(JSON.stringify(p_palette._externalCSSMap));

    }

    // ----> Document Rulesets

    /**
     * @description TODO
     * @param {string} p_key 
     * @param {string} p_path 
     */
    AddCSSLink(p_key, p_path) {
        this._externalCSSMap[p_key] = p_path;
    }

    /**
     * @description TODO
     * @param {string} p_key 
     */
    GetCSSLink(p_key) {
        if (p_key in this._externalCSSMap) { p_key = this._externalCSSMap[p_key]; }
        if (p_key[0] === __REF) { p_key = `${PATH.FULL(PATH.STYLE)}/${this._themeId}${p_key.substring(1)}`; }
        else { p_key = PATH.FULL(p_key); }
        return p_key;
    }

    /**
     * @description Register a font face that will be added in the header 
     * in the form `@font-face { font-family: 'p_family'; src: url('p_url');}`
     * @param {*} p_family 
     * @param {*} p_url 
     */
    AddFontFace(p_family, p_url) { this._fonts[p_family] = PATH.FULL(p_url); }

    /**
     * @description TODO
     * @param {*} p_colors 
     */
    AddColors(p_colors) {
        for (let name in p_colors) {
            let color = p_colors[name];
            this._colors[name] = color;
            this._variables[`${__DELIM_KVP}${name}${__DELIM_KVP}`] = color;
        }
    }

    /**
     * @description Rulesets to be added to the document header
     * @param {object} p_ruleSets { '.element':{ 'rule':'value' }, '.element':{ 'rule':'value' } }
     */
    AddDocumentRulesets(p_ruleSets) {
        //TODO : Override existing properties/rulesets
    }

    // ----> Global rulesets & KVPs

    /**
     * @description TODO
     * @param {object} p_vars { 'A':'value', 'B':'value' }
     */
    AddVariables(p_vars) {
        for (let name in p_vars) { this._variables[`${__DELIM_KVP}${name}${__DELIM_KVP}`] = p_vars[name]; }
    }

    /**
     * @description TODO
     * @param {object} p_suffixes { 'kitID':{ 'suffix':{ ruleset }, 'suffix2':{ ruleset2 }, } }
     */
    AddSuffixes(p_suffixes) {
        this._suffixes = CSS_UTILS.Merge(this._suffixes, p_suffixes);
    }

    /**
     * @description TODO
     * @param {object} p_properties { 'groupID':{ 'prop':'value' } }
     */
    AddProperties(p_properties) {
        this._properties = CSS_UTILS.Merge(this._properties, p_properties);
    }

    /**
     * @description TODO
     * @param {object} p_rulesets { '.element':{ 'rule':'value' }, '.element':{ 'rule':'value' } }
     */
    AddRulesets(p_rulesets) {
        for (let el in p_rulesets) { this.AddSingleRuleset(el, p_rulesets[el]); }
    }

    /**
     * @description TODO
     * @param {string} p_el Ruleset identifier
     * @param {object} p_ruleSet { 'rule':'value' }
     */
    AddSingleRuleset(p_el, p_ruleSet) {

        let g = this._rulesets;
        if (p_el in g) { g[p_el] = CSS_UTILS.Merge(g[p_el], p_ruleSet); }
        else { g[p_el] = p_ruleSet; }

    }

    // ----> Process & Cache

    /**
     * @description TODO
     * @param {class} p_class 
     * @param {function} p_generator 
     * @param {boolean} [p_invalidateCache] 
     * @returns {array} an array of styling items. Contains
     */
    Get(p_class, p_generator, p_invalidateCache = false) {

        let style = this._cache.Get(p_class);

        if (!U.isVoid(style) && !p_invalidateCache) { return style; }

        if (style) { style.length = 0; }
        else { style = new Array(0); }

        // Check if the class __NFO__ has any specific css imports
        let nfos = NFOS.Get(p_class);
        if (nfos) {

            if (nfos.css) {
                for (let i = nfos.css.length - 1; i >= 0; i--) {
                    style.push(UDOM.New(`link`, { href: this.GetCSSLink(nfos.css[i]), rel: `stylesheet` }));
                }
            }

            if (nfos.ignoreLocal) {
                this._cache.Set(p_class, style);
                return style;
            }
        }


        let styleObject = p_generator();

        if (!U.isEmpty(styleObject)) {

            if (!U.isObject(styleObject)) { throw new Error(`Generator must return an object.`); }

            //Replace KVPs before appending globals, for performance reasons
            let styleString = ``;

            for (let el in styleObject) { this._ProcessSuffixes(el, styleObject[el], styleObject); }
            for (let el in styleObject) { styleString += CSS_UTILS.CSS(el, this._ProcessSingleRuleset(el, styleObject[el])); }

            let styleElement = UDOM.New(`style`);
            styleElement.innerText = styleString;
            style.push(styleElement);

        }

        this._cache.Set(p_class, style);

        return style;

    }

    /**
     * @access private
     * @description TODO
     * @param {*} p_el 
     * @param {*} p_ruleset 
     * @param {*} p_parent 
     */
    _ProcessSuffixes(p_el, p_ruleset, p_parent) {

        //TODO : Check parent, see if we're currently processing rules inside a @media breakpoint

        let refCandidate = p_el[0] === __REF;

        if (!U.isArray(p_ruleset)) {

            if (refCandidate && U.isObject(p_ruleset)) {
                if (p_el.indexOf(`@media`) === 0
                    || p_el.indexOf(`@supports`) === 0) {
                    //media query or supports query
                    for (let el in p_ruleset) { this._ProcessSuffixes(el, p_ruleset[el], p_ruleset); }
                }
            }

            return;
        }
        if (!refCandidate || !U.isArray(p_ruleset)) { return; }

        let prefix = p_el.substr(1, p_el.length - 1);

        for (let i = 0, n = p_ruleset.length; i < n; i++) {
            let kitName = p_ruleset[i];
            if (!(kitName in this._suffixes)) { continue; }
            let kit = this._suffixes[kitName], id, kitRuleset;
            for (let k in kit) {
                id = `${prefix}${k}`;
                kitRuleset = kit[k];
                if (id in p_parent) {
                    p_parent[id] = CSS_UTILS.Compose(p_parent[id], kitRuleset);
                }
                else {
                    p_parent[id] = CSS_UTILS.Compose(null, kitRuleset);
                }
            }
        }

        delete p_parent[p_el];

    }

    /**
     * @access private
     * @param {*} p_el 
     * @param {*} p_ruleset 
     */
    _ProcessSingleRuleset(p_el, p_ruleset) {

        let isObject = U.isObject(p_ruleset);

        if (p_el[0] === __REF && isObject) {

            if (p_el.indexOf(`@media`) === 0
                || p_el.indexOf(`@supports`) === 0) {
                //media query or supports query
                for (let el in p_ruleset) { this._ProcessSingleRuleset(el, p_ruleset[el]); }
                console.log(p_ruleset);
                return p_ruleset;
            }

        }

        let g = this._rulesets, isGlobal = p_el in g;

        if (isObject) {

            if (isGlobal) { CSS_UTILS.Compose(p_ruleset, g[p_el]); }

            if (__REF in p_ruleset) {
                let propGroup = p_ruleset[__REF];
                for (let i = 0, n = propGroup.length; i < n; i++) {
                    let groupName = propGroup[i];
                    if (groupName === null) { continue; }
                    if (groupName in this._properties) {
                        CSS_UTILS.Compose(p_ruleset, this._properties[groupName]);
                    } else {
                        throw new Error(`${groupName} is not a valid property kit`);
                    }
                }
                delete p_ruleset[__REF];
            }

        } else if (isGlobal) {
            p_ruleset = CSS_UTILS.Compose(null, g[p_el]);
            isObject = true;
        }
        else { p_ruleset = ``; }

        if (isObject) {
            for (let r in p_ruleset) {
                let rule = p_ruleset[r];
                if (U.isString(rule) && rule.includes(__DELIM_KVP)) { p_ruleset[r] = this._ReplaceVars(rule); }
            }
        }

        return p_ruleset;

    }

    /**
     * @access private
     * @param {*} p_str 
     */
    _ReplaceVars(p_str) {
        for (let name in this._variables) { p_str = p_str.replace(name, this._variables[name]); }
        return p_str;
    }


}

module.exports = Palette;
