'use struct';

const ENV = require(`./lib/environment`);

module.exports = {

    DOM_STATE: require(`./lib/dom-state`),
    ENV_DISPLAY: require(`./lib/env-display`),
    SIGNAL: require(`./lib/signal`),
    ENV: ENV,

    routing:require(`./lib/routing`),

    get features() { return ENV._features; },
    get app() { return ENV._app; },
    get ARGV() { return ENV._config.argv; },
    get CONF() { return ENV._config; },
    IF_NODE: (p_ifNodeIsEnabled, p_ifNodeIsDisabled) => { return ENV.IF_NODE(p_ifNodeIsEnabled, p_ifNodeIsDisabled); },

    // features shortcuts
    get isBrowser(){ return ENV._features.isBrowser; },
    get isOnline(){ return ENV._features.isOnline; },
    get isTouchEnabled(){ return ENV._features.isTouchEnabled; },
    get isMobile(){ return ENV._features.isMobile; },
    get hasStorage(){ return ENV._features.hasStorage; },
    get storageArea(){ return ENV._features.storageArea; },
    get isExtension(){ return ENV._features.isExtension; },
    get isChromium(){ return ENV._features.isChromium; },
    get runtime(){ return ENV._features.runtime; },
    get isCORSEnabled(){ return ENV._features.isCORSEnabled; },
    get isNodeEnabled(){ return ENV._features.isNodeEnabled; },
    get domState(){ return ENV._features.domState; },
    get displayMode(){ return ENV._features.displayMode; },
    get prefersColorScheme(){ return ENV._features.prefersColorScheme; },
    get displayType(){ return ENV._features.displayType; },

    get prefs(){ return ENV._app.userPreferences; },

}