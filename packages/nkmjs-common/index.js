'use strict';

const POOL = require(`./lib/pool`);
const time = require(`./lib/time`);

module.exports = {

    NFOS: require(`./lib/nfos`),
    BINDINGS: require(`./lib/bindings`),
    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),    
    SORTING: require(`./lib/sorting`),

    Disposable: require(`./lib/disposable`),
    Observable: require(`./lib/observable`),

    filters: require(`./lib/filters`),
    helpers: require(`./lib/helpers`),
    signals: require(`./lib/signals`),
    time: time,  

    pool:POOL,
    
    Rent:POOL.Rent.bind(POOL),
    Preload:POOL.Preload.bind(POOL),
    WatchNextTick:time.WatchNextTick,
    DelayedCall:(p_fn = null, p_delay = -1) => { return new time.DelayedCall(p_fn, p_delay); }

}