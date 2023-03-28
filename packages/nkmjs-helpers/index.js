'use strict';

module.exports = {

    REQUEST: require(`./lib/request`),
    SIGNAL: require(`./lib/signal`),

    actions: require(`./actions`),
    commands: require(`./commands`),
    
    widgets: require(`./lib/widgets`),
    
}

//require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));