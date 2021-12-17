'use strict';

const __POOL = require(`./lib/pool/pool`);
const __time = require(`./lib/time`);

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
    time: __time,  
    
    // Shortcut to pool.POOL.Rent
    Rent:__POOL.Rent.bind(__POOL),
    Preload:__POOL.Preload.bind(__POOL),
    NextTick:__time.NextTick,

}