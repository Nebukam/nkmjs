'use strict';

const __poolManager = require(`./lib/pool/pool`);

module.exports = {

    NFOS: require(`./lib/nfos`),
    BINDINGS: require(`./lib/bindings`),
    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),    

    filters: require(`./lib/filters`),
    helpers: require(`./lib/helpers`),
    pool: require(`./lib/pool`),
    signals: require(`./lib/signals`),
    time: require(`./lib/time`),  
    
    // Shortcut to pool.POOL.Rent
    Rent:(p_class) => { return __poolManager.Rent(p_class); },

}