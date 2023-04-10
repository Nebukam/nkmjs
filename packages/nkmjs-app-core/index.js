'use strict';

const __ops = require(`./lib/operations`);
const env = require(`@nkmjs/environment`);

module.exports = {

    IDS: require(`./lib/ids`),
    APP_MESSAGES: require(`./lib/app-messages`),

    AppSettings: require(`./lib/app-settings`),
    AppBase: require(`./lib/app-base`),
    AppBody: require(`./lib/app-body`),

    AutoUpdateDialogBox: require(`./lib/dialogs/dialog-box-auto-update`),
    GlobalOverlayHandler: require(`./lib/global-overlay-handler`),

    ops: __ops,
    explorers: require(`./lib/explorers`),

    OpenSettings: () => { __ops.commands.OpenAppSettings.Execute(); },

    get settings(){ return env.APP.appSettings; },
    get main(){ return env.APP; },

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));