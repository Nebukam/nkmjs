'use strict';

require('./lib/fetch-polyfill');

const core = globalThis.nkmCore ? globalThis.nkmCore : require(`./core`);

globalThis.nkm = module.exports = {

    //#region core

    collections : core.collections,
    com : core.com,
    io : require(`@nkmjs/server-io`),
    env : core.env,
    metrics : core.metrics,
    services : core.services,
    u : core.u,

    //#endregion

    //#region data

    documents : core.documents,
    data : core.data,

    //#endregion

    server : require(`@nkmjs/server-core`),

    get main(){ return core.env.app; },

}