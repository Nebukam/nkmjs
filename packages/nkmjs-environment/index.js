'use struct';

const __ENV = require(`./lib/environment`);

module.exports = {

    DOM_STATE: require(`./lib/dom-state`),
    ENV_DISPLAY: require(`./lib/env-display`),
    SIGNAL: require(`./lib/signal`),
    ENV: __ENV,

    get features() { return __ENV.instance._features; },
    get APP() { return __ENV.instance._app; },
    get ARGV() { return __ENV.instance._config.argv; },
    get CONF() { return __ENV.instance._config; },
    IF_NODE: (p_ifNodeIsEnabled, p_ifNodeIsDisabled) => { return __ENV.IF_NODE(p_ifNodeIsEnabled, p_ifNodeIsDisabled); },

    // features shortcuts
    get isBrowser(){ return __ENV.instance._features.isBrowser; },
    get isOnline(){ return __ENV.instance._features.isOnline; },
    get isTouchEnabled(){ return __ENV.instance._features.isTouchEnabled; },
    get isMobile(){ return __ENV.instance._features.isMobile; },
    get hasStorage(){ return __ENV.instance._features.hasStorage; },
    get storageArea(){ return __ENV.instance._features.storageArea; },
    get isExtension(){ return __ENV.instance._features.isExtension; },
    get isChromium(){ return __ENV.instance._features.isChromium; },
    get runtime(){ return __ENV.instance._features.runtime; },
    get isCORSEnabled(){ return __ENV.instance._features.isCORSEnabled; },
    get isNodeEnabled(){ return __ENV.instance._features.isNodeEnabled; },
    get domState(){ return __ENV.instance._features.domState; },
    get displayMode(){ return __ENV.instance._features.displayMode; },
    get prefersColorScheme(){ return __ENV.instance._features.prefersColorScheme; },
    get displayType(){ return __ENV.instance._features.displayType; },

    get prefs(){ return __ENV.instance._app.userPreferences; },

}