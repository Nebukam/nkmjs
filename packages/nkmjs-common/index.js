'use strict';

const POOL = require(`./lib/pool`);
const time = require(`./lib/time`);
const BINDINGS = require(`./lib/bindings`);

module.exports = {

    NFOS: require(`./lib/nfos`),
    BINDINGS: BINDINGS,
    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),
    SORTING: require(`./lib/sorting`),

    CSYMBOL: require(`./lib/class-symbol`),
    CKEY: require(`./lib/class-key`),

    Disposable: require(`./lib/disposable`),
    Observable: require(`./lib/observable`),

    helpers: require(`./lib/helpers`),
    signals: require(`./lib/signals`),
    time: time,

    pool: POOL,

    Rent: POOL.Rent.bind(POOL),
    Preload: POOL.Preload.bind(POOL),

    GetBinding: BINDINGS.Get,

    WatchNextTick: time.WatchNextTick,

    DelayedCall: (p_fn = null, p_delay = -1) => { return new time.DelayedCall(p_fn, p_delay); },
    DeferredCall: (p_init, p_res = null, p_rej = null) => { return new time.DeferredCall(p_init, p_res, p_rej); },

}