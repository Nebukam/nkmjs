'use strict';

module.exports = {

    BaseSerializer: require(`./serializer-base`),
    JSONSerializer: require(`./serializer-json`),
    TEXTSerializer: require(`./serializer-text`),

    CONTEXT: require(`./context`),
    json: require(`./json`),

}