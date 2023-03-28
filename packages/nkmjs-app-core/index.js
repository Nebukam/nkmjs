'use strict';

const __ops = require(`./lib/operations`);

module.exports = {

    IDS: require(`./lib/ids`),
    APP_MESSAGES: require(`./lib/app-messages`),

    AppSettings: require(`./lib/app-settings`),
    AppBase: require(`./lib/app-base`),
    AppBody: require(`./lib/app-body`),

    AutoUpdateDialogBox: require(`./lib/dialogs/dialog-box-auto-update`),
    GlobalOverlayHandler: require(`./lib/global-overlay-handler`),

    operations: __ops,
    explorers: require(`./lib/explorers`),

    OpenSettings: () => { __ops.commands.OpenAppSettings.Execute(); }

}