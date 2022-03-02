'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const env = require("@nkmjs/environment");

const dom = require("./utils-dom");
const ColorBase = require("./colors/color-base");
const COLOR = require("./colors/color");
const Palette = require("./palette");

const CSS = require(`./css`);

const DefaultStylesheet = require(`./default-stylesheet`);

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
 * @augments common.helpers.Singleton
 * @memberof style
 */
class STYLE extends com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._defaultPalette = com.Rent(Palette);
        this._defaultPalette._STYLE = this;
        this._current = this._defaultPalette;
        this._headerStyle = null;

        this._cssPaths = {};

        this._InitDefaults();

    }

    /**
     * @access private
     * @description Initialize a few default values
     */
    _InitDefaults() {
        let cssBuilder = new DefaultStylesheet();
        cssBuilder.Build(this._defaultPalette);
    }

    get computedStyles() {
        if (!this._computeStyles) { this._computeStyles = window.getComputedStyle(env.APP.body); }
        return this._computeStyles;
    }

    /**
     * @description TODO
     * @type {style.Palette}
     * @customtag read-only
     */
    get defaultPalette() { return this._defaultPalette; }

    /**
     * @description TODO
     * @type {style.Palette}
     */
    get current() { return this._current; }
    set current(p_value) {
        if (p_value === null) { p_value = this._defaultPalette; }
        this._current = p_value;
    }

    /**
     * @description TODO
     * @param {boolean} p_initWithDefaults 
     * @returns {style.Palette} new Palette
     */
    static CreatePalette(p_initWithDefaults = true, p_makeCurrent = true) {
        let newPalette = com.Rent(Palette);
        newPalette._STYLE = this;
        if (p_initWithDefaults) { newPalette.InitFrom(this.instance.defaultPalette); }
        if (p_makeCurrent) { this.instance.current = newPalette; }
        return newPalette;
    }

    /**
     * @description Deploy current document rulesets into the header.
     * If it was deployed already, overwrites the previous statements.
     */
    static DeployCurrent() {

        if (!this._isBrowser) { return; }

        let pal = this.instance.current;

        let css = ``;
        for (let f in pal._fonts) {
            css += `@font-face { font-family: '${f}'; src: url('${pal._fonts[f]}');}\n`;
        }
        css += `\n`;

        let styleObject = pal._documentRulesets, ruleset;

        for (let el in styleObject) { pal._ProcessSuffixes(el, styleObject[el], styleObject); }
        for (let el in styleObject) { css += CSS.CSS(el, pal._ProcessSingleRuleset(el, styleObject[el])); }

        // Preload all available css rules
        let externalCSSRules = this.instance.current._externalCSSMap;
        for (let cssKey in externalCSSRules) {
            this.instance.current.PrintCSSLink(cssKey, document.head);
        }

        if (u.isVoid(this._headerStyle)) {
            this._headerStyle = document.createElement('style');
            this._headerStyle.innerText = css;
            dom.Attach(this._headerStyle, document.head);
        } else {
            this._headerStyle.innerText = css;
        }


    }

    /**
     * @description Get the style associated to a constructor.
     * Generate and cache the result provided by the generator function, if none is cached.
     * @param {function} p_class used as unique key to generate or access cache.
     * @param {function} p_generator 
     * @param {function} p_invalidateCache 
     * @returns {string} 
     */
    static Get(p_class, p_generator, p_invalidateCache = false) {
        return this.instance.current.Get(p_class, p_generator, p_invalidateCache);
    }

    /**
     * @description Text format
     * @param {test} p_text 
     * @param {object} p_format 
     * @param {string|style.color.ColorBase} p_format.color only sets color (overriden by .style)
     * @param {boolean} p_format.strong adds a <strong> tag
     * @param {string} p_format.class css class
     * @param {object} p_format.style inline CSS
     * @param {string} p_type tag type
     */
    static TF(p_text, p_format, p_type = 'span') {

        p_text = p_format.strong ? `<strong>${p_text}</strong>` : p_text;

        let css = ``;
        if (p_format.style) {
            css = ` style='${CSS.InlineCSS(this.instance.current._ProcessSingleRuleset(``, p_format.style))}' `;
        } else if (p_format.color) {
            let color = p_format.color;
            if (u.isString(color)) { if (color in this.instance.current._colors) { color = this.instance.current._colors[color]; } }
            css = ` style='color:${color};' `;
        }

        let cl = p_format.class ? ` class='${p_format.class}'` : ``;

        return `<${p_type}${cl}${css}>${p_text}</${p_type}>`;

    }

}

module.exports = STYLE;
