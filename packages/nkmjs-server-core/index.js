'use strict';

module.exports = {

    STATUSES: require(`./lib/status-codes`),
    Views:require(`./lib/views`),

    ServerBase: require(`./lib/server-base`),
    ServerBaseAuth0: require(`./lib/server-base-auth0`),

    actions: require(`./lib/actions`),
    handlers: require(`./lib/handlers`),

}