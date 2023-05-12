require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));

const DIALOG = require(`./lib/dialog`);

module.exports = {

    DIALOG: DIALOG,

    REQUEST: require(`./lib/request`),

    DialogBox: require(`./lib/dialog-box`),
    DialogForm: require(`./lib/dialog-form`),
    DialogOverlay: require(`./lib/dialog-overlay`),

    // to DIALOG.Push
    Push: DIALOG.Push.bind(DIALOG),
}