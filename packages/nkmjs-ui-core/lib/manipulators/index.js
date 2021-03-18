'use strict';

module.exports = {

    Manipulator: require(`./manipulator`),
    ContentManipulator: require(`./manipulator-content`),
    ContentURLManipulator: require(`./manipulator-content-url`),
    
    Background: require(`./handler-background`),
    Image: require(`./handler-image`),
    Icon: require(`./handler-icon`),
    Text: require(`./handler-text`),

    Grid: require(`./handler-grid`),
    GridItem: require(`./handler-grid-item`),
    
}