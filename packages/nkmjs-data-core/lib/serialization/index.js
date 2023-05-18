'use strict';

module.exports = {

    BaseSerializer: require(`./serializer-base`),
    JSONSerializer: require(`./serializer-json`),
    TEXTSerializer: require(`./serializer-text`),

    CTX: require(`./context`),
    json: require(`./json`),

}