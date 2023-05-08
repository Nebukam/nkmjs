'use strict';

const RELAY = require(`./lib/relay`);
const REQUEST = require(`./lib/request`);

module.exports = {

    RELAY: RELAY,
    Request: REQUEST,
    REQUEST: require(`./lib/action-request`),
    SIGNAL: require(`./lib/signal`),
    
    helpers: require(`./lib/helpers`),

    KEYBOARD: require(`./lib/keyboard`),
    Keystroke: require(`./lib/keystroke`),
    KeystrokeEx: require(`./lib/keystroke-ex`),

    Action : require(`./lib/actions/action`),
    ActionGroup : require(`./lib/actions/action-group`),
    ActionStack : require(`./lib/actions/action-stack`),

    ACTION_STATE : require(`./lib/actions/action-state`),

    COMMAND_SIGNAL : require(`./lib/commands/command-signal`),
    
    Command : require(`./lib/commands/command`),
    CommandFn : require(`./lib/commands/command-fn`),
    CommandBox : require(`./lib/commands/command-box`),
    CommandChain : require(`./lib/commands/command-chain`),
    CommandAction : require(`./lib/commands/command-action`),

    Emit:REQUEST.Emit.bind(REQUEST),

}