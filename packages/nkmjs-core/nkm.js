'use strict';

/**
 * This module is specifically made for the user-facing part of the app
 * and should NOT be used along with other @nkmjs/core/* libs.
 * 
 * It encapsulate all available libraries except electron & server specifics.
 */

module.exports = {
    
    //#region core

    collections : require(`@nkmjs/collections`),
    com : require("@nkmjs/common"),
    io : require(`@nkmjs/io-core`),
    env : require(`@nkmjs/environment`),
    metrics : require(`@nkmjs/metrics`),
    services : require(`@nkmjs/services`),
    utils : require("@nkmjs/utils"),

    //#endregion

    //#region data

    documents : require(`@nkmjs/documents`),
    data : require(`@nkmjs/data-core`),
    datalib : require(`@nkmjs/data-library`),
    datacontrols : require(`@nkmjs/ui-data-controls`),
    
    //#endregion

    //#region renderer

    actions : require("@nkmjs/actions"),
    app : require(`@nkmjs/app-core`),
    localisation : require(`@nkmjs/localisation`),
    dialog : require(`@nkmjs/dialog`),
    style : require(`@nkmjs/style`),
    ui : require(`@nkmjs/ui-core`),
    uicontrols : require(`@nkmjs/ui-data-controls`),
    uilib : require(`@nkmjs/ui-library`),
    uiworkspace : require(`@nkmjs/ui-workspace`),
    
    //#endregion


}