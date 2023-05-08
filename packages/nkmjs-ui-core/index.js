'use strict';

const UTILS_DOM = require(`./lib/utils-dom`);
const UI = require(`./lib/ui`);

const __DOMtemplate = require(`./lib/dom-template`);

module.exports = {

    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),
    REQUEST: require(`./lib/request`),
    CONTEXT: require(`./lib/context`),
    ANCHORING: require(`./lib/anchoring`),

    UI: UI,

    INPUT: require(`./lib/input`),
    POINTER: require(`./lib/pointer`),

    DisposableHTMLElement: require(`./lib/disposable-htmlelement`),
    DisplayObject: require(`./lib/display-object`),
    DisplayObjectContainer: require(`./lib/display-object-container`),

    Widget: require(`./lib/widget`),
    WidgetButton: require(`./lib/widget-button`),
    WidgetOrientable: require(`./lib/widget-orientable`),
    WidgetItem: require(`./lib/widget-item`),
    WidgetBar: require(`./lib/widget-bar`),

    // namespaces
    commands: require(`./lib/commands`),
    extensions: require(`./lib/extensions`),
    helpers: require(`./lib/helpers`),
    inputs: require(`./lib/inputs`),
    manipulators: require(`./lib/manipulators`),
    lists: require(`./lib/lists`),
    views: require(`./lib/views`),
    overlays: require(`./lib/overlays`),

    dom: UTILS_DOM,
    // UTILS_DOM Shortcuts
    El: UTILS_DOM.El.bind(UTILS_DOM),

    // Templates

    DOMTemplate: __DOMtemplate,

    // Shortcuts

    // to UI.Preload
    Preload: UI.Preload.bind(UI),
    // to UI.Register
    Register: UI.Register.bind(UI),
    // to UI.RegisterGroup
    RegisterGroup: UI.RegisterGroup.bind(UI),
    // to UI.FindFirstParentOfType
    FindFirstParent: UI.FindFirstParentOfType.bind(UI),
    // to UI.GetClass
    GetClass: UI.GetClass.bind(UI),
    // to DOMTemplate.Render
    Render: __DOMtemplate.Render.bind(__DOMtemplate),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));