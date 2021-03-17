'use strict';

const __UTILS = require(`./lib/utils`);
const __UTILS_DOM = require(`./lib/utils-dom`);
const __CHECKS = require(`./lib/checks`);

module.exports = {
    // Generic
    tils: __UTILS,

    check: __CHECKS,

    // CHECKS Shortcuts
    isArray:__CHECKS.isArray,
    isArrayBuffer:__CHECKS.isArrayBuffer,
    isSymbol:__CHECKS.isSymbol,
    isObject:__CHECKS.isObject,
    isFunc:__CHECKS.isFunc,
    isString:__CHECKS.isString,
    isNumber:__CHECKS.isNumber,
    isBool:__CHECKS.isBool,
    isUndefined:__CHECKS.isUndefined,
    isVoid:__CHECKS.isVoid,
    isInstanceOf:__CHECKS.isInstanceOf,
    isEmpty:__CHECKS.isEmpty,

    dom: __UTILS_DOM,

    // UTILS_DOM Shortcuts
    El: __UTILS_DOM.El,

    //
    PATH: require(`./lib/path`),
    MIME: require(`./lib/mime`),
    LOG: require(`./lib/logger`),
    Argv: require(`./lib/argv`),

}