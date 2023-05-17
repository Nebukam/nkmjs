'use strict';

/**
 * This module is specifically made for the non user-facing parts of the app
 * and should NOT be used along with nkm.js ( @nkmjs/core index ) lib.
 * 
 * It is meant to be used on node-side only (electron or server)
 */

globalThis.nkmCore = module.exports = {

    //#region core

    collections : require(`@nkmjs/collections`),
    com : require("@nkmjs/common"),
    io : require(`@nkmjs/io-core`),
    env : require(`@nkmjs/environment`),
    metrics : require(`@nkmjs/metrics`),
    services : require(`@nkmjs/services`),
    u : require("@nkmjs/utils"),

    //#endregion

    //#region data

    documents : require(`@nkmjs/documents`),
    data : require(`@nkmjs/data-core`),
    
    //#endregion

    actions : require("@nkmjs/actions"),

}