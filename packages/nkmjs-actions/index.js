'use strict';

const __RELAY = require(`./lib/relay`);

module.exports = {

    RELAY: __RELAY,
    Request: require(`./lib/request`),
    REQUEST: require(`./lib/action-request`),

    Action : require(`./lib/actions/action`),
    ActionGroup : require(`./lib/actions/action-group`),
    ActionStack : require(`./lib/actions/action-stack`),

    COMMAND_SIGNAL : require(`./lib/commands/command-signal`),
    
    Command : require(`./lib/commands/command`),
    CommandFn : require(`./lib/commands/command-fn`),
    CommandBox : require(`./lib/commands/command-box`),
    CommandChain : require(`./lib/commands/command-chain`),
    CommandAction : require(`./lib/commands/command-action`),

}