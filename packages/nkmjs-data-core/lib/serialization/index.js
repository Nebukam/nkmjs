'use strict';

module.exports = {

    BaseSerializer: require(`./serializer-base`),
    JSONSerializer: require(`./serializer-json`),
    TEXTSerializer: require(`./serializer-text`),

    SERIALIZATION_CONTEXT: require(`./serialization-context`),
    json: require(`./json`),

}