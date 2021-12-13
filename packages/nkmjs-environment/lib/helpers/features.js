'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const ENV_DISPLAY = require(`../env-display`);
const DOM_STATE = require(`../dom-state`);
const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment.helpers
 */
class Features extends com.pool.DisposableObjectEx {
    constructor() {

        super();

        this._manifestVersion = 0;
        this._isNodeEnabled = false; // <-- Electron or Nodejs context ?
        this._isBrowser = false;
        this._displayType = ENV_DISPLAY.DESKTOP;
        this._isExtension = false;
        this._isMobile = false;
        this._isChromium = false;
        this._isTouchEnabled = false;
        this._isOnline = false;
        this._context = null;
        this._runtime = null;
        this._hasStorageArea = false;
        this._storageArea = null;
        this._prefersColorScheme = ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES;

        this._displayMode = ENV_DISPLAY.NONE;
        this._domState = DOM_STATE.NONE;

        this._isCORSEnabled = false;

        this._Bind(this._OnDisplayModeMdqChange);
        this._Bind(this._OnColorSchemeMdqChange);
        this._Bind(this._OnDisplayTypeMdqChange);

        this._mdqMap = new Map();

        // Extension check

        try {
            // Check if chromium environment extension
            this._context = chrome; // <-- Chromium
            this._runtime = this._context.runtime;
            this._isExtension = true;
            this._isChromium = true;

            if (!chrome.extension) { throw new Error(); }

        } catch (e) {
            try {
                this._context = browser; // <-- Mozilla
                this._runtime = this._context.runtime;
                this._isExtension = true;
                this._isChromium = false;

                if (!browser.extension) { throw new Error(); }

            } catch (e) {
                this._isExtension = false;
                this._context = null;
                this._runtime = null;
                this._isChromium = false;
            }
        }

        // Storage check

        try {
            this._storageArea = chrome.storage; // <-- Chromium
            this._hasStorageArea = !u.isVoid(this._storageArea);

            if (!this._hasStorageArea) { throw new Error(); }

        } catch (e) {
            try {
                this._storageArea = browser.storage; // <-- Mozilla
                this._hasStorageArea = !u.isVoid(this._storageArea);
            } catch (e) {
                this._storageArea = null;
                this._hasStorageArea = false;
            }
        }

        // Browser checks

        try {
            let w = window; // <-- throw in node.js
            this._isBrowser = true;

            this._isOnline = navigator.onLine;

            window.addEventListener('online', this._Bind(this._OnEnvironmentOnline));
            window.addEventListener('offline', this._Bind(this._OnEnvironmentOffline));

            let navData = window.performance.getEntriesByType("navigation");
            if (navData.length > 0 && navData[0].loadEventEnd > 0){ this._OnWindowLoaded(); }
            else { window.addEventListener('load', this._Bind(this._OnWindowLoaded)); }

            this._isMobile = /Mobi|Android/i.test(navigator.userAgent);

            this._isTouchEnabled = (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));

            // see if DOM is already available
            let domReadyState = document.readyState, listenToDomState = true;
            if (domReadyState === DOM_STATE.COMPLETE || domReadyState === DOM_STATE.INTERACTIVE) {
                if (domReadyState === DOM_STATE.COMPLETE) {
                    this._InitMediaQueries();
                    listenToDomState = false;
                }
                this.domState = domReadyState;
            } else {
                // DOM still loading
            }

            if (listenToDomState) {
                document.addEventListener("readystatechange", this._Bind(this._OnDOMStateChange));
            }

            try {
                let xhr = new XMLHttpRequest();
                if (u.isVoid(xhr.withCredentials)) { this._isCORSEnabled = false; }
                else { this._isCORSEnabled = true; }
            } catch (e) { this._isCORSEnabled = false; console.warn(e); }

        } catch (e) {
            this._isBrowser = false;
        }
    }

    _OnWindowLoaded(p_evt){
        
    }

    // ----> Properties

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isBrowser() { return this._isBrowser; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isOnline(){ return this._isOnline; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isTouchEnabled() { return this._isTouchEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isMobile() { return this._isMobile; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get hasStorage() { return this._hasStorageArea; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get storageArea() { return this._storageArea; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isExtension() { return this._isExtension; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isChromium() { return this._isChromium; }

    /**
     * @description TODO
     * @type {*}
     * @customtag read-only
     */
    get context() { return this._context; } // extension context, abstract chrome.xxx, browser.xxx

    /**
     * @description TODO
     * @type {*}
     * @customtag read-only
     */
    get runtime() { return this._runtime; } // extension context, abstract chrome.xxx, browser.xxx

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isCORSEnabled() { return this._isCORSEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isNodeEnabled() { return this._isNodeEnabled; }

    // ----> DOM State

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get domState() { return this._domState; }
    set domState(p_value) {
        if (this._domState === p_value) { return; }

        let oldState = this._domState;
        this._domState = p_value;

        u.LOG._U(`domState`, this._domState, oldState, `#f7d801`);

        switch (this._domState) {
            case DOM_STATE.LOADING:
                // The document is still loading.
                break;
            case DOM_STATE.INTERACTIVE:
                // The document has finished loading. We can now access the DOM elements.
                // But sub-resources such as images, stylesheets and frames are still loading.
                this._InitMediaQueries();
                break;
            case DOM_STATE.COMPLETE:
                // The page is fully loaded. 
                break;
        }

        this._Broadcast(SIGNAL.DOMSTATE_CHANGED, this._domState);

    }

    _OnDOMStateChange() {

        if (document.readyState === DOM_STATE.COMPLETE) {
            document.removeEventListener("DOMContentLoaded", this._OnDOMStateChange);
        }

        this.domState = document.readyState;

    }

    //

    _InitMediaQueries() {

        // Display Mode

        let mode = ENV_DISPLAY.DEFAULT;

        if (navigator.standalone) { mode = ENV_DISPLAY.STANDALONE; }

        for (let i = 0, n = ENV_DISPLAY.displayModes.length; i < n; i++) {
            let query = ENV_DISPLAY.displayModes[i],
                mdq = window.matchMedia(`(display-mode: ${query})`);
            this._mdqMap.set(query, mdq);
            if (mdq.matches) { mode = query; }
            mdq.addEventListener('change', this._OnDisplayModeMdqChange);
        }

        this._displayMode = mode;

        // Color Scheme

        mode = ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES;

        for (let i = 0, n = ENV_DISPLAY.colorSchemes.length; i < n; i++) {
            let query = ENV_DISPLAY.colorSchemes[i],
                mdq = window.matchMedia(`(prefers-color-scheme: ${query})`);
            this._mdqMap.set(query, mdq);
            if (mdq.matches) { mode = query; }
            mdq.addEventListener('change', this._OnColorSchemeMdqChange);
        }

        this._prefersColorScheme = mode;


        // Device

        mode = ENV_DISPLAY.DESKTOP;

        for (let i = 0, n = ENV_DISPLAY.displayTypes_width.length; i < n; i++) {
            let query = ENV_DISPLAY.displayTypes[i],
                mdq = window.matchMedia(`(max-width: ${ENV_DISPLAY.displayTypes_width[i]}px)`);
            this._mdqMap.set(query, mdq);
            if (mdq.matches) { mode = query; }
            mdq.addEventListener('change', this._OnDisplayTypeMdqChange);
        }

        this._displayType = mode;

    }

    // ----> Display Mode

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get displayMode() { return this._displayMode; }
    set displayMode(p_value) {

        if (this._displayMode === p_value) { return; }

        let oldMode = this._displayMode;
        this._displayMode = p_value;

        u.LOG._U(`displayMode`, this._displayMode, oldMode, `#f7d801`);

        this._Broadcast(SIGNAL.DISPLAY_MODE_CHANGED, this._displayMode, oldMode);

    }

    _OnDisplayModeMdqChange(p_evt) { this._UpdateMDQ(ENV_DISPLAY.displayModes, `displayMode`); }

    // ----> Color scheme

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get prefersColorScheme() { return this._prefersColorScheme; }
    set prefersColorScheme(p_value) {
        if (this._prefersColorScheme === p_value) { return; }

        let oldValue = this._prefersColorScheme;
        this._prefersColorScheme = p_value;

        u.LOG._U(`prefersColorScheme`, this._prefersColorScheme, oldValue, `#f7d801`);

        this._Broadcast(SIGNAL.COLOR_SCHEME_CHANGED, this._prefersColorScheme, oldValue);

    }

    _OnColorSchemeMdqChange(p_evt) { this._UpdateMDQ(ENV_DISPLAY.colorSchemes, `prefersColorScheme`); }

    /// ----> Device type

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get displayType() { return this._displayType; }
    set displayType(p_value) {

        if (this._displayType === p_value) { return; }

        let oldMode = this._displayType;
        this._displayType = p_value;

        u.LOG._U(`device`, this._displayType, oldMode, `#f7d801`);

        this._Broadcast(SIGNAL.DISPLAY_TYPE_CHANGED, this._displayType, oldMode);

    }

    _OnDisplayTypeMdqChange(p_evt) { this._UpdateMDQ(ENV_DISPLAY.displayTypes, `displayType`); }

    _UpdateMDQ(p_list, p_key) {
        let mode = this[`_${p_key}`];
        for (let i = 0, n = p_list.length; i < n; i++) {
            let query = p_list[i], mdq = this._mdqMap.get(query);
            if (mdq.matches) { mode = query; }
        }
        this[p_key] = mode;
    }

    //

    _OnEnvironmentOnline(p_evt){
        if(this._isOnline){ return; }
        this._isOnline = true;
        this._Broadcast(SIGNAL.ONLINE);
    }

    _OnEnvironmentOffline(p_evt){
        if(!this._isOnline){ return; }
        this._isOnline = false;
        this._Broadcast(SIGNAL.OFFLINE);
    }

    //

    List() {
        let g = `✔`, b = `🞫`, gt = `889000`, bt = `d86100`, bg = `#171717`;
        u.LOG._(`${this._isBrowser ? g : b} isBrowser`, `#${this._isBrowser ? gt : bt}`, bg);
        u.LOG._(`${this._isMobile ? g : b} isMobile`, `#${this._isMobile ? gt : bt}`, bg);
        u.LOG._(`${this._isExtension ? g : b} isExtension (v${this._isExtension ? this._manifestVersion : 0 })`, `#${this._isExtension ? gt : bt}`, bg);
        u.LOG._(`${this._isTouchEnabled ? g : b} isToucheEnabled`, `#${this._isTouchEnabled ? gt : bt}`, bg);
        u.LOG._(`${this._hasStorageArea ? g : b} hasStorageArea`, `#${this._hasStorageArea ? gt : bt}`, bg);
        u.LOG._(`${this._isCORSEnabled ? g : b} isCORSEnabled`, `#${this._isCORSEnabled ? gt : bt}`, bg);
        u.LOG._(`▢ displayMode : ${this._displayMode}`, `#889000`, bg);
        u.LOG._(`◐ prefersColorScheme : ${this._prefersColorScheme}`, `#889000`, bg);
        u.LOG._(`⎚ displayType : ${this._displayType}`, `#889000`, bg);
        u.LOG._(`${this._isNodeEnabled ? g : b} isNodeEnabled`, `#${this._isNodeEnabled ? '182000' : 'fff'}`, `#${this._isNodeEnabled ? '7ca500' : '980700'}`);
    }

}

module.exports = Features;