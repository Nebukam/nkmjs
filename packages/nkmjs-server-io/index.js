
'use strict';

const __IO_SERVICES = require(`./lib/io-services`);

module.exports = {

    IO_SERVICES: __IO_SERVICES,
    BaseIOService: require(`./lib/base-io-service`),

    Transceiver: require(`./lib/transceiver`),

    Use(p_serviceClass, p_options, p_setAsDefault = false) {
        __IO_SERVICES.Register(p_serviceClass, p_options, p_setAsDefault);
    }

}