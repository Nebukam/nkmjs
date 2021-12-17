'use strict';

const __time = require(`./time`);

module.exports = {
    TIME: __time,
    DelayedCall: require(`./delayed-call`),

    NextTick:__time.NextTick.bind(__time),

}