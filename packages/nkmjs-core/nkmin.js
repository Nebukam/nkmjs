'use strict';

/**
 * This module is specifically made for the user-facing part of the app
 * and should NOT be used along with other @nkmjs/core/* libs.
 * 
 * It encapsulate all available libraries except electron & server specifics.
 */
const core = globalThis.nkmCore ? globalThis.nkmCore : require(`./core`);

globalThis.nkm = module.exports = {
    
    //#region core

    collections : core.collections,
    com : core.com,
    io : core.io,
    env : core.env,
    metrics : core.metrics,
    services : core.services,
    u : core.u,

    //#endregion

    //#region data

    documents : core.documents,
    data : core.data,

    //#endregion

    get main(){ return core.env.app; },

}