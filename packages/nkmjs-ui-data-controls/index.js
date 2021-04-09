
'use strict';

module.exports = {

    CONTEXT: require(`./lib/context`),
    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),
    META_IDS: require(`./lib/meta-ids`),

    ControlView: require(`./lib/control-view`),
    ControlWidget: require(`./lib/control-widget`),

    Editor: require(`./lib/editor`),

    InspectorShell: require(`./lib/inspector-shell`),
    InspectorView: require(`./lib/inspector-view`),
    InspectorWidgetGroup: require(`./lib/inspector-widget-group`),
    InspectorWidget: require(`./lib/inspector-widget`)

}

//require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));