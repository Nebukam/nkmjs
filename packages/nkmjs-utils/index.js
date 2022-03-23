'use strict';

const __UTILS = require(`./lib/utils`);
const __CHECKS = require(`./lib/checks`);
const __PATH = require(`./lib/path`);

module.exports = {
    // Generic
    tils: __UTILS,

    helpers: require(`./lib/helpers`),

    check: __CHECKS,

    //TODO: Move DOM utils to ui-core

    // CHECKS Shortcuts
    isArray: __CHECKS.isArray.bind(__CHECKS),
    isArrayBuffer: __CHECKS.isArrayBuffer.bind(__CHECKS),
    isSymbol: __CHECKS.isSymbol.bind(__CHECKS),
    isObject: __CHECKS.isObject.bind(__CHECKS),
    isFunc: __CHECKS.isFunc.bind(__CHECKS),
    isString: __CHECKS.isString.bind(__CHECKS),
    isNumber: __CHECKS.isNumber.bind(__CHECKS),
    isHex: __CHECKS.isHex.bind(__CHECKS),
    isBool: __CHECKS.isBool.bind(__CHECKS),
    isUndefined: __CHECKS.isUndefined.bind(__CHECKS),
    isVoid: __CHECKS.isVoid.bind(__CHECKS),
    isInstanceOf: __CHECKS.isInstanceOf.bind(__CHECKS),
    isEmpty: __CHECKS.isEmpty.bind(__CHECKS),

    Call: __UTILS.Call.bind(__UTILS),
    CallPrepend: __UTILS.CallPrepend.bind(__UTILS),
    Assign: __UTILS.Assign.bind(__UTILS),

    //
    PATH: __PATH,

    FULL: __PATH.FULL.bind(__PATH),
    SHORT: __PATH.SHORT.bind(__PATH),

    MIME: require(`./lib/mime`),
    LOG: require(`./lib/logger`),
    Argv: require(`./lib/argv`),

    REPLACE: require(`./lib/replace`),

    Download: (p_filename, p_content, p_mime = null) => {

        let element = document.createElement("a"),
            blob;

        if (__CHECKS.isInstanceOf(p_content, Blob)) { blob = p_content; }
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