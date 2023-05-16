'use strict';

module.exports = {

    GET: require(`./abstract-get`),
    POST: require(`./abstract-post`),

    View: require(`./handler-view`),
    Action: require(`./handler-action`),
    Getter: require(`./handler-getter`),
    Upload: require(`./handler-upload`),
    Fn: require(`./handler-fn`),
    Fetch: require(`./handler-fetch`),

}