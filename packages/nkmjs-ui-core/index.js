'use strict';

const __UTILS_DOM = require(`./lib/utils-dom`);
const __UI = require(`./lib/ui`);
const __INPUT = require(`./lib/input`);
__INPUT.instance._Prepare();

const __DOMtemplate = require(`./lib/dom-template`);

module.exports = {

    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),
    REQUEST: require(`./lib/request`),
    CONTEXT: require(`./lib/context`),

    UI: __UI,

    INPUT: __INPUT,
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
    extensions: require(`./lib/extensions`),
    helpers: require(`./lib/helpers`),
    inputs: require(`./lib/inputs`),
    manipulators: require(`./lib/manipulators`),
    lists: require(`./lib/lists`),
    views: require(`./lib/views`),
    overlays: require(`./lib/overlays`),

    dom: __UTILS_DOM,
    // UTILS_DOM Shortcuts
    El: __UTILS_DOM.El.bind(__UTILS_DOM),

    // Templates

    DOMTemplate: __DOMtemplate,

    // Shortcuts

    // to UI.Register
    Register: __UI.Register.bind(__UI),
    // to UI.RegisterGroup
    RegisterGroup: __UI.RegisterGroup.bind(__UI),
    // to DOMTemplate.Render
    Render: __DOMtemplate.Render.bind(__DOMtemplate),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));