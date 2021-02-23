'use strict';

module.exports = {

    HTTPIOReader: require(`./http-io-reader`),
    HTTPIOWriter: require(`./http-io-writer`),
    HTTPIORename: require(`./http-io-rename`),
    HTTPIODelete: require(`./http-io-delete`),

    StorageIOReader: require(`./storage-io-reader`),
    StorageIOWriter: require(`./storage-io-writer`),
    StorageIORename: require(`./storage-io-rename`),
    StorageIODelete: require(`./storage-io-delete`),

}