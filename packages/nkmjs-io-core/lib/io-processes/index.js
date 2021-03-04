'use strict';

module.exports = {

    HTTPIOReader: require(`./http-io-reader`),
    HTTPIOWriter: require(`./http-io-writer`),
    HTTPIORename: require(`./http-io-rename`),
    HTTPIODelete: require(`./http-io-delete`),

    LocalStorageIOReader: require(`./localstorage-io-reader`),
    LocalStorageIOWriter: require(`./localstorage-io-writer`),
    LocalStorageIORename: require(`./localstorage-io-rename`),
    LocalStorageIODelete: require(`./localstorage-io-delete`),

    StorageIOReader: require(`./storage-io-reader`),
    StorageIOWriter: require(`./storage-io-writer`),
    StorageIORename: require(`./storage-io-rename`),
    StorageIODelete: require(`./storage-io-delete`),

    StoragePromiseIOReader: require(`./storage-promise-io-reader`),
    StoragePromiseIOWriter: require(`./storage-promise-io-writer`),
    StoragePromiseIORename: require(`./storage-promise-io-rename`),
    StoragePromiseIODelete: require(`./storage-promise-io-delete`),

}