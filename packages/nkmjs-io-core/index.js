'use strict';

module.exports = {

    ENCODING: require(`./lib/encoding`),
    RESPONSE_TYPE: require(`./lib/response-type`),
    IO_TYPE: require(`./lib/io-type`),
    IO_SIGNAL: require(`./lib/io-signal`),

    RESOURCES: require(`./lib/resources-manager`),
    RESSOURCE_STATE: require(`./lib/resource-state`),
    Resource: require(`./lib/resource`),
    Directory: require(`./lib/directory`),
    
    IOProcess: require(`./lib/io-process`),
    IOQueue: require(`./lib/io-queue`),
    ResourceOperation: require(`./lib/resource-operation`),

    // namespaces
    resources: require(`./lib/resources`),
    ioprocesses: require(`./lib/io-processes`),

}