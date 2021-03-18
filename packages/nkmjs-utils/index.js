'use strict';

const __UTILS = require(`./lib/utils`);
const __UTILS_DOM = require(`./lib/utils-dom`);
const __CHECKS = require(`./lib/checks`);

module.exports = {
    // Generic
    tils: __UTILS,

    check: __CHECKS,

    // CHECKS Shortcuts
    isArray:__CHECKS.isArray.bind(__CHECKS),
    isArrayBuffer:__CHECKS.isArrayBuffer.bind(__CHECKS),
    isSymbol:__CHECKS.isSymbol.bind(__CHECKS),
    isObject:__CHECKS.isObject.bind(__CHECKS),
    isFunc:__CHECKS.isFunc.bind(__CHECKS),
    isString:__CHECKS.isString.bind(__CHECKS),
    isNumber:__CHECKS.isNumber.bind(__CHECKS),
    isBool:__CHECKS.isBool.bind(__CHECKS),
    isUndefined:__CHECKS.isUndefined.bind(__CHECKS),
    isVoid:__CHECKS.isVoid.bind(__CHECKS),
    isInstanceOf:__CHECKS.isInstanceOf.bind(__CHECKS),
    isEmpty:__CHECKS.isEmpty.bind(__CHECKS),

    dom: __UTILS_DOM,

    // UTILS_DOM Shortcuts
    El: __UTILS_DOM.El.bind(__UTILS_DOM),

    //
    PATH: require(`./lib/path`),
    MIME: require(`./lib/mime`),
    LOG: require(`./lib/logger`),
    Argv: require(`./lib/argv`),

}