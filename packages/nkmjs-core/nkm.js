'use strict';

/**
 * This module is specifically made for the user-facing part of the app
 * and should NOT be used along with other @nkmjs/core/* libs.
 * 
 * It encapsulate all available libraries except electron & server specifics.
 */

let nkmin = globalThis.nkm ? globalThis.nkm : require(`./core`);

globalThis.nkm = module.exports = {
    
    //#region core

    collections : nkmin.collections,
    com : nkmin.com,
    io : nkmin.io,
    env : nkmin.env,
    metrics : nkmin.metrics,
    services : nkmin.services,
    u : nkmin.u,

    //#endregion

    //#region data

    documents : nkmin.documents,
    data : nkmin.data,
    datalib : nkmin.datalib,
    datacontrols : require(`@nkmjs/ui-data-controls`),
    
    //#endregion

    //#region renderer

    actions : nkmin.actions,
    app : require(`@nkmjs/app-core`),
    localisation : require(`@nkmjs/localisation`),
    dialog : require(`@nkmjs/dialog`),
    style : require(`@nkmjs/style`),
    ui : require(`@nkmjs/ui-core`),
    uilib : require(`@nkmjs/ui-library`),
    uiworkspace : require(`@nkmjs/ui-workspace`),
    
    //#endregion
    
    get settings(){ return nkm.app.settings; },
    get main(){ return nkm.app.main; },

}