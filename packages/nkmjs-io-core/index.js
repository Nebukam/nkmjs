'use strict';

const u = require("@nkmjs/utils");
const RESOURCES = require(`./lib/resources-manager`);

module.exports = {

    ENCODING: require(`./lib/encoding`),
    RESPONSE_TYPE: require(`./lib/response-type`),
    IO_TYPE: require(`./lib/io-type`),
    IO_SIGNAL: require(`./lib/io-signal`),

    RESOURCES: RESOURCES,
    RESOURCE_STATE: require(`./lib/resource-state`),
    Resource: require(`./lib/resource`),
    Directory: require(`./lib/directory`),

    IOProcess: require(`./lib/io-process`),
    IOQueue: require(`./lib/io-queue`),
    ResourceOperation: require(`./lib/resource-operation`),

    // namespaces
    helpers: require(`./lib/helpers`),
    resources: require(`./lib/resources`),
    ioprocesses: require(`./lib/io-processes`),

    // Shortcut to RESOURCES.Get
    Get: RESOURCES.Get.bind(RESOURCES),
    Read: RESOURCES.GetAndRead.bind(RESOURCES),

}