'use strict';

module.exports = {
    SignalBroadcaster: require(`./signal-broadcaster`),
    SignalBox: require(`./signal-box`),
    Observer: require(`./observer`),
    isObservable: (p_item) => {
        if (p_item === null || p_item === undefined) { return false; }
        return (p_item.Watch && p_item.Unwatch && p_item.WatchOnce);
    }
}