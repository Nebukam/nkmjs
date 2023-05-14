'use strict';

module.exports = {

    STATUSES: require(`./lib/status-codes`),
    Views: require(`./lib/views`),

    ServerBase: require(`./lib/server-base`),
    ServerBaseAuth0: require(`./lib/server-base-auth0`),

    actions: require(`./lib/actions`),
    getters: require(`./lib/getters`),
    handlers: require(`./lib/handlers`),

    AddGetters: function (p_input, p_handler) {
        module.exports.getters.Manager.Add(p_input, p_handler);
    },

    AddActions: function (p_input) {
        module.exports.actions.Manager.Add(p_input);
    }

}