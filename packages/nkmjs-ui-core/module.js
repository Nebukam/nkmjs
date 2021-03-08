'use strict';

module.exports = {

    ButtonBase: require(`./lib/button-base`),

    DisposableHTMLElement: require(`./lib/disposable-htmlelement`),
    DisplayObject: require(`./lib/display-object`),
    DisplayObjectContainer: require(`./lib/display-object-container`),

    DOMTemplate: require(`./lib/dom-template`),
    INPUT: require(`./lib/input`),
    KEYBOARD: require(`./lib/keyboard`),
    MOUSE: require(`./lib/mouse`),
    UI_FLAG: require(`./lib/ui-flag`),
    UI_ID: require(`./lib/ui-id`),
    UI_SIGNAL: require(`./lib/ui-signal`),
    UI: require(`./lib/ui`),

    Widget: require(`./lib/widget`),
    OrientableWidget: require(`./lib/widget-orientable`),
    WidgetCatalog: require(`./lib/widget-catalog`),

    // namespaces
    buttons: require(`./lib/buttons`),
    extensions: require(`./lib/extensions`),
    helpers: require(`./lib/helpers`),
    manipulators: require(`./lib/manipulators`),
    templates: require(`./lib/templates`),
    tree: require(`./lib/tree`),
    views: require(`./lib/views`)

}