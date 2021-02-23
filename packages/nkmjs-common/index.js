'use strict';

module.exports = {

    NFOS: require(`./lib/nfos`),
    BINDINGS: require(`./lib/bindings`),
    SIGNAL: require(`./lib/signal`),
    COMMON_FLAG: require(`./lib/common-flag`),
    COM_ID: require(`./lib/common-id`),    

    // namespaces
    filters: require(`./lib/filters`),
    helpers: require(`./lib/helpers`),
    pool: require(`./lib/pool`),
    signals: require(`./lib/signals`),
    time: require(`./lib/time`),  

    Singleton: require(`./lib/helpers/singleton`),
    SingletonEx: require(`./lib/helpers/singleton-ex`),
    StateBase: require(`./lib/helpers/state-base`),
    StateMachine: require(`./lib/helpers/state-machine`),

    TIME: require(`./lib/time/time`),
    
    BindingKit: require(`./lib/helpers/binding-kit`),

    POOL: require(`./lib/pool/pool`),
    DisposableObject: require(`./lib/pool/disposable-object`),
    DisposableObjectEx: require(`./lib/pool/disposable-object-ex`),

    SignalBroadcaster: require(`./lib/signals/signal-broadcaster`),
    SignalBox: require(`./lib/signals/signal-box`),
    Observer: require(`./lib/signals/observer`),

    DelayedCall: require(`./lib/time/delayed-call`),

    Callbacks: require(`./lib/helpers/callbacks`),
    CallList: require(`./lib/helpers/call-list`),
    OptionsHandler: require(`./lib/helpers/options-handler`),

    CSYMBOL : require(`./lib/helpers/class-symbol`),
    OptionsObject: require(`./lib/helpers/options-object`),
    
}