
'use strict';

const u = require(`@nkmjs/utils`);
const Editor = require(`./lib/editor`);

module.exports = {

    CTX: require(`./lib/context`),
    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),
    META_IDS: require(`./lib/meta-ids`),

    ControlView: require(`./lib/control-view`),
    ControlWidget: require(`./lib/control-widget`),

    Editor: Editor,

    InspectorShell: require(`./lib/inspector-shell`),
    InspectorView: require(`./lib/inspector-view`),
    InspectorWidgetGroup: require(`./lib/inspector-widget-group`),
    InspectorWidget: require(`./lib/inspector-widget`),
    ListInspectorView: require(`./lib/list-inspector-view`),

    editors: require(`./lib/editors`),
    views: require(`./lib/views`),
    widgets: require(`./lib/widgets`),
    helpers: require(`./lib/helpers`),
    inspectors: require(`./lib/inspectors`),

    FindEditor: (p_displayObject) => {
        let p = p_displayObject;
        while (p != null) {
            let e = p.editor;
            if (e) { if (u.isInstanceOf(e, Editor)) { return e; } }
            if (u.isInstanceOf(p, Editor)) { return p; }
            p = p.parent;
        }
        return null;
    }

}

//require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));