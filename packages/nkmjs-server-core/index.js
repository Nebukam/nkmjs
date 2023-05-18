'use strict';

module.exports = {

    STATUSES: require(`./lib/status-codes`),
    Views: require(`./lib/views`),

    ServerBase: require(`./lib/server-base`),
    ServerBaseAuth0: require(`./lib/server-base-auth0`),

    operations: require(`./lib/operations`),
    handlers: require(`./lib/handlers`),

    AddOperations: function (p_input, p_handler) {
        module.exports.operations.Manager.Add(p_input, p_handler);
    },

    AddActions: function (p_input) {
        module.exports.operations.Actions.Add(p_input);
    }

}