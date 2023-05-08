'use strict';

const TIME = require(`./time`);

module.exports = {
    TIME: TIME,
    DelayedCall: require(`./delayed-call`),

    WatchNextTick:TIME.WatchNextTick.bind(TIME),

}