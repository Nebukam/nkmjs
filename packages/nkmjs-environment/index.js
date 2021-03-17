'use struct';

const __ENV = require(`./lib/environment`);

module.exports = {
    DOM_STATE: require(`./lib/dom-state`),
    ENV_DISPLAY: require(`./lib/env-display`),
    SIGNAL: require(`./lib/signal`),
    ENV: __ENV,
    
    FEATURES: __ENV.FEATURES
}