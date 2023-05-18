'use strict';

const UTILS = require(`./lib/utils`);
const MERGE = require(`./lib/merge`);
const CHECKS = require(`./lib/checks`);
const PATH = require(`./lib/path`);

module.exports = {
    // Generic
    tils: UTILS,

    helpers: require(`./lib/helpers`),

    check: CHECKS,
    merge: MERGE,

    //TODO: Move DOM utils to ui-core

    // CHECKS Shortcuts
    isArray: CHECKS.isArray,
    isArrayBuffer: CHECKS.isArrayBuffer,
    isSymbol: CHECKS.isSymbol,
    isObject: CHECKS.isObject,
    isFunc: CHECKS.isFunc,
    isString: CHECKS.isString,
    isNumber: CHECKS.isNumber,
    isHex: CHECKS.isHex,
    isBool: CHECKS.isBool,
    isUndefined: CHECKS.isUndefined,
    isVoid: CHECKS.isVoid,
    isInstanceOf: CHECKS.isInstanceOf,
    isEmpty: CHECKS.isEmpty,
    isContentEqual: CHECKS.isContentEqual,

    Call: UTILS.Call,
    CallPrepend: UTILS.CallPrepend,
    Assign: UTILS.Assign,

    //
    PATH: PATH,

    FULL: PATH.FULL.bind(PATH),
    SHORT: PATH.SHORT.bind(PATH),

    MIME: require(`./lib/mime`),
    LOG: require(`./lib/logger`),
    Argv: require(`./lib/argv`),

    REPLACE: require(`./lib/replace`),

    Download: (p_filename, p_content, p_mime = null) => {

        let element = document.createElement("a"),
            blob;

        if (CHECKS.isInstanceOf(p_content, Blob)) { blob = p_content; }
        else {
            if (!p_mime) { blob = new Blob([p_content]); }
            else { blob = new Blob([p_content], { type: p_mime.type }); }
        }

        element.href = URL.createObjectURL(blob);
        element.download = p_mime ? `${p_filename}${p_mime.ext}` : p_filename;
        element.click();
        element.remove();

    }

}