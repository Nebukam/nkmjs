'use strict';

const TIME = require(`./time`);

module.exports = {
    TIME: TIME,
    DelayedCall: require(`./delayed-call`),
    DeferredCall: require(`./deferred-call`),

    WatchNextTick:TIME.WatchNextTick.bind(TIME),

}