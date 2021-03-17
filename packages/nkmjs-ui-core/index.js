'use strict';

const __uiManager = require(`./lib/ui`);
const __inputManager = require(`./lib/input`);
__inputManager.instance._Prepare();

const __DOMtemplate = require(`./lib/dom-template`);

module.exports = {

    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),
    REQUEST: require(`./lib/request`),

    UI: __uiManager,

    INPUT: __inputManager,
    POINTER: require(`./lib/pointer`),
    KEYBOARD: require(`./lib/keyboard`),

    DisposableHTMLElement: require(`./lib/disposable-htmlelement`),
    DisplayObject: require(`./lib/display-object`),
    DisplayObjectContainer: require(`./lib/display-object-container`),

    Widget: require(`./lib/widget`),
    OrientableWidget: require(`./lib/widget-orientable`),
    CatalogWidget: require(`./lib/widget-catalog`),

    // namespaces
    buttons: require(`./lib/buttons`),
    extensions: require(`./lib/extensions`),
    helpers: require(`./lib/helpers`),
    manipulators: require(`./lib/manipulators`),
    templates: require(`./lib/templates`),
    tree: require(`./lib/tree`),
    views: require(`./lib/views`),
    overlays: require(`./lib/overlays`),

    // Helpers

    CatalogBuilder: require(`./lib/helpers/catalog-builder`),
    CatalogViewBuilder: require(`./lib/helpers/catalog-view-builder`),
    FlagBox: require(`./lib/helpers/flag-box`),
    FlagEnum: require(`./lib/helpers/flag-enum`),
    WidgetSelection: require(`./lib/helpers/widget-selection`),
    Frame: require(`./lib/helpers/frame`),
    Toolbar: require(`./lib/helpers/toolbar`),
    PopIn: require(`./lib/helpers/pop-in`),

    // Tree

    TreeItem: require(`./lib/tree/tree-item`),
    TreeItemGroup: require(`./lib/tree/tree-item-group`),
    TreeRoot: require(`./lib/tree/tree-root`),

    // Views

    View: require(`./lib/views/view`),
    Layer: require(`./lib/views/layer`),
    LayerContainer: require(`./lib/views/layer-container`),
    ShelfNav: require(`./lib/views/shelf-nav`),
    Shelf: require(`./lib/views/shelf`),

    // Buttons

    ButtonBase: require(`./lib/buttons/button-base`),

    ToolButton: require(`./lib/buttons/button-tool`),
    ButtonEx: require(`./lib/buttons/button-ex`),
    ButtonDragHandle: require(`./lib/buttons/button-drag-handle`),

    // Templates

    DOMTemplate: __DOMtemplate,

    // Shortcuts

    // to UI.Register
    Register:(p_id, p_class, p_extends = `div`) => { __uiManager.Register(p_id, p_class, p_extends); },
    // to UI.RegisterGroup
    RegisterGroup:(p_group) => { __uiManager.RegisterGroup(p_group); },
    // to DOMTemplate.Render
    Render:(p_tpl, p_host, p_options) => { return __DOMtemplate.Render(p_tpl, p_host, p_options); },
    
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));