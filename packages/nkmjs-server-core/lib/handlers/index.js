'use strict';

module.exports = {

    GET: require(`./handler-get`),
    POST: require(`./handler-post`),

    View: require(`./handler-view`),
    Action: require(`./handler-action`),
    Upload: require(`./handler-upload`),
    Fn: require(`./handler-fn`),
    Fetch: require(`./handler-fetch`),
}