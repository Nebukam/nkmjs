'use strict';

module.exports = {
    SignalBroadcaster: require(`./signal-broadcaster`),
    SignalBox: require(`./signal-box`),
    Observer: require(`./observer`),
    isObservable: (p_item) => {
        if (p_item === null || p_item === undefined) { return false; }
        return (`Watch` in p_item && `Unwatch` in p_item && `WatchOnce` in p_item);
    }
}