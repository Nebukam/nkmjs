'use strict';

module.exports = {

    REQUEST: require(`./lib/request`),

    bars: require(`./lib/bars`),
    buttons: require(`./lib/buttons`),
    cards: require(`./lib/cards`),
    inputs: require(`./lib/inputs`),
    overlays: require(`./lib/overlays`),
    lists: require(`./lib/lists`),    
    modals: require(`./lib/modals`),
    dom: require(`./lib/dom`),
    views: require(`./lib/views`),
    widgets: require(`./lib/widgets`),
    
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));