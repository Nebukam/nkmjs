module.exports = {

    DIALOG: require(`./lib/dialog`),

    DialogBox: require(`./lib/dialog-box`),
    DialogLayer: require(`./lib/dialog-overlay`),
    DialogHandler: require(`./lib/dialog-handler`)
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));