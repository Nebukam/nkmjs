const __DIALOG = require(`./lib/dialog`);

module.exports = {

    DIALOG: __DIALOG,

    REQUEST: require(`./lib/request`),

    DialogBox: require(`./lib/dialog-box`),
    DialogLayer: require(`./lib/dialog-overlay`),

    // to DIALOG.Push
    Push:__DIALOG.Push.bind(__DIALOG),
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));