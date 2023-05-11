'use strict';
const io = require(`@nkmjs/server-io`);
const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const collections = require(`@nkmjs/collections`);

const _map = {};

module.exports = {

    VIEW_ERROR: Object.freeze(`error`),

    Set: function (p_id, p_value) { _map[p_id] = p_value; },
    Get: function (p_id) { return p_id in _map ? _map[p_id] : p_id; }
}