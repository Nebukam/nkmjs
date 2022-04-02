'use strict';

const LOG = require(`./logger`);

/**
 * PATH is a wrapper class that contains a bunch of utilitary static methods to manipulate paths.
 * It also indexes global paths the like of node's `__dirname`, or system's PATH variable. This allow to use shorter paths & strings
 * inside the application.
 * 
 * This is especially useful when working with project with lots of external references, or even different environments (such as dev vs production); 
 * but can very well be used with user-set paths too.
 * @class
 * @hideconstructor
 * @memberof utils
 */
class PATH {

    constructor() { }

    static APP = '%APP%';
    static APP_DATA = '%APP_DATA%';
    static USER_DATA = '%USER_DATA%';
    static HOME = '%HOME%';
    static TEMP = '%TEMP%';
    static DOCUMENTS = '%DOCUMENTS%';
    static DESKTOP = '%DESKTOP%';
    static LOGS = '%LOGS%';
    static DOWNLOADS = '%DOWNLOADS%';
    static VIDEOS = '%VIDEOS%';
    static PICTURES = '%PICTURES%';
    static MUSIC = '%MUSIC%';
    static STYLE = '%STYLE%';

    static SYSTEM_MAP = [
        this.APP_DATA,
        this.USER_DATA,
        this.HOME,
        this.TEMP,
        this.DOCUMENTS,
        this.DESKTOP,
        this.LOGS,
        this.DOWNLOADS,
        this.VIDEOS,
        this.PICTURES,
        this.MUSIC,
        this.STYLE,
    ];

    static MAP = {};

    /**
     * @description Registers a shortcut/path pair to PATH.
     * @param {string} p_envShortcut %MY_SHORTCUT%
     * @param {string} p_path path/to/foo
     * @order 1
     */
    static SET(p_envShortcut, p_path) {
        if (this.SYSTEM_MAP.includes(p_envShortcut) && this.MAP.hasOwnProperty(p_envShortcut)) {
            throw new Error(`Cannot override system path (${p_envShortcut})`);
        }

        if (p_envShortcut.length < 3
            || p_envShortcut.substr(0, 1) != '%'
            || p_envShortcut.substr(p_envShortcut.length - 1, 1) != '%') {
            //console.warn(`Did not register PATH shorthand "${p_envShortcut}" since it doesn't match the pattern %S%`);
            return;
        }

        this.MAP[p_envShortcut] = p_path;
        LOG._(`⮥ ${p_envShortcut} ⮧ ${p_path}`, `#7f7f7f`);
    }

    /**
     * @description Removes a shortcut from PATH.
     * @param {string} p_envShortcut 
     * @order 1
     */
    static UNSET(p_envShortcut) {
        delete this.MAP[p_envShortcut];
    }

    /**
     * @description Replaces ``\`` with `/`
     * @param {string} p_string The string to sanitize
     * @returns {string} Sanitized string
     */
    static Sanitize(p_string) {
        return p_string.split('\\').join('/');
    }

    /**
     * @description Shrink a path, replacing expanded environment path with their %SHORTCUT%
     * <br>Opposite of `{@link utils.PATH.FULL|FULL}`.
     * @param {string} p_path 
     * @returns {string} Shrinked path
     * @order 2
     * @example PATH.SHORT('./style/default/global.css') == '%STYLE%/global.css'
     */
    static SHORT(p_path) {
        if (!p_path) { return p_path; }
        p_path = this.Sanitize(p_path);
        for (let n in this.MAP) { if (this.MAP[n] === ``) { continue; } p_path = p_path.replace(this.MAP[n], n); }
        return p_path;
    }

    /**
     * @description Expand a path, replacing the %SHORTCUT% variables with their full value.
     * <br>Opposite of `{@link utils.PATH.SHORT|SHORT}`.
     * @param {string} p_path 
     * @returns {string} Expanded path
     * @order 2
     * @example PATH.FULL('%STYLE%/global.css'); == './style/default/global.css'
     */
    static FULL(p_path) {
        if (!p_path) { return p_path; }
        for (let n in this.MAP) { p_path = p_path.replace(n, this.MAP[n]); }
        return this.Sanitize(p_path);
    }

    /**
     * @description Get the parent directory path
     * @param {string} p_path 
     * @returns {string} The path leading up the last `/`
     */
    static dir(p_path) {
        let split = this.Sanitize(p_path).split('/');
        split.pop();
        return split.join('/');
    }

    /**
     * @description Attempt to isolate the last name inside a path.
     * @param {string} p_path 
     * @returns {string}
     * @example PATH.name('./style/default/global.css')  === 'global'
     * @example PATH.name('./style/default/global')  === 'global'
     * @example PATH.name('./style/default/global/')  === 'global'
     */
    static name(p_path) {
        let splitBase = p_path.split('/');
        if (splitBase.length <= 1) { return this.stripExt(p_path); }
        let splitEnd = splitBase.pop();
        while (splitEnd === `` && splitBase.length >= 1) { splitEnd = splitBase.pop(); }
        return this.stripExt(splitEnd);
    }

    /**
     * @description Attempts to isolate and return the extension from a given path
     * @param {string} p_path 
     * @returns {string}
     * @example PATH.name('./style/default/global.css')  === '.css'
     * @example PATH.name('./style/default/global.css?value=none')  === '.css'
     */
    static ext(p_path) {

        if (p_path.includes('?')) {
            let preSplit = p_path.split('?');
            p_path = preSplit[0];
        }

        let splitDot = p_path.split('.');
        if (splitDot.length <= 1) { return p_path; }
        return `.${splitDot[splitDot.length - 1]}`;

    }

    /**
     * @description Remove the extension of a filename string.
     * @param {string} p_path 
     * @returns {string}
     * @example stripExt('file.ext') === 'file'
     */
    static stripExt(p_path) {
        let splitDot = p_path.split('.');
        if (splitDot.length <= 1) { return p_path; }
        splitDot.pop();
        return splitDot.join('.');
    }

    /**
     * @description Return all registered paths that aren't 'system' one, or in other words, any path registered after the
     * app initilization.
     * @customtag read-only
     * @type {object}
     */
    static get extras() {
        let extras = {};
        for (let n in this.MAP) {
            if (!this.SYSTEM_MAP.includes(n)) {
                extras[n] = this.MAP[n];
            }
        }
        return extras;
    }

}

module.exports = PATH;