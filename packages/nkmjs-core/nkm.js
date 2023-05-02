'use strict';

/**
 * This module is specifically made for the user-facing part of the app
 * and should NOT be used along with other @nkmjs/core/* libs.
 * 
 * It encapsulate all available libraries except electron & server specifics.
 */
const core = globalThis.nkmcore ? globalThis.nkmcore : require(`./core`);

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
    datalib : core.datalib,
    datacontrols : require(`@nkmjs/ui-data-controls`),
    
    //#endregion

    //#region renderer

    actions : core.actions,
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