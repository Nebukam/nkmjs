'use strict';

module.exports = {
    FSUTILS: require(`./lib/fs-util`),
    IOElectron: require(`./lib/io-electron`),

    FSIOReader: require(`./lib/io-processes/fs-io-reader`),
    FSIOWriter: require(`./lib/io-processes/fs-io-writer`),
    FSIORename: require(`./lib/io-processes/fs-io-rename`),
    FSIODelete: require(`./lib/io-processes/fs-io-delete`),
}