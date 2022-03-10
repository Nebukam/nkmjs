'use strict';

require('./lib/fetch-polyfill');

module.exports = {
    core : require(`@nkmjs/electron-core`),
    io : require(`@nkmjs/io-electron`),
}