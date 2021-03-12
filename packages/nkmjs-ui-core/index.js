'use strict';

module.exports = {

    UI_SIGNAL: require(`./lib/ui-signal`),
    UI_FLAG: require(`./lib/ui-flag`),
    UI_ID: require(`./lib/ui-id`),
    UI_REQUEST: require(`./lib/ui-request`),

    UI: require(`./lib/ui`),

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

    // Overlays

    OverlayOptions: require(`./lib/overlays/overlay-options`),
    Overlay: require(`./lib/overlays/overlay`),
    OverlayHandler: require(`./lib/overlays/overlay-handler`),
    Drawer: require(`./lib/overlays/drawer`),
    DrawerOverlay: require(`./lib/overlays/drawer-overlay`),

    OVERLAY_CONTEXT: require(`./lib/overlays/overlay-context`),

    // Buttons

    ButtonBase: require(`./lib/button-base`),

    ToolButton: require(`./lib/buttons/button-tool`),
    ButtonEx: require(`./lib/buttons/button-ex`),
    ButtonDragHandle: require(`./lib/buttons/button-drag-handle`),

    // Templates

    DOMTemplate: require(`./lib/dom-template`)

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));