'use strict';

const __uiManager = require(`./lib/ui`);

module.exports = {

    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),
    IDS: require(`./lib/ids`),
    REQUEST: require(`./lib/request`),

    UI: __uiManager,

    INPUT: require(`./lib/input`),
    MOUSE: require(`./lib/mouse`),
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

    DOMTemplate: require(`./lib/dom-template`),

    // Shortcuts

    // Short to UI.Register
    Register:(p_id, p_class, p_extends = `div`) => { __uiManager.Register(p_id, p_class, p_extends); },
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));