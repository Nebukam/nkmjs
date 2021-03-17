const __DIALOG = require(`./lib/dialog`);

module.exports = {

    DIALOG: __DIALOG,

    DialogBox: require(`./lib/dialog-box`),
    DialogLayer: require(`./lib/dialog-overlay`),
    DialogHandler: require(`./lib/dialog-handler`),

    // to DIALOG.Push
    Push:(p_options) => { return __DIALOG.Push(p_options); }
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));