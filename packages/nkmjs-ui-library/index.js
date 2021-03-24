'use strict';

module.exports = {

    REQUEST: require(`./lib/request`),

    badges: require(`./lib/badges`),
    bars: require(`./lib/bars`),
    buttons: require(`./lib/buttons`),
    cards: require(`./lib/cards`),
    inputs: require(`./lib/inputs`),
    overlays: require(`./lib/overlays`),
    lists: require(`./lib/lists`),    
    dom: require(`./lib/dom`),
    views: require(`./lib/views`),
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));