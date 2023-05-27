'use strict';

module.exports = {

    Manipulator: require(`./manipulator`),
    ContentManipulator: require(`./manipulator-content`),
    ContentURLManipulator: require(`./manipulator-content-url`),
    
    Background: require(`./handler-background`),
    Image: require(`./handler-image`),
    iFrame: require(`./handler-iframe`),
    Embed: require(`./handler-embed`),
    Icon: require(`./handler-icon`),
    Text: require(`./handler-text`),
    
}