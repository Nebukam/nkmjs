'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const AbstractOperation = require("./abstract-operation");

const _map = {};
var _defaultHandler = null;

module.exports = {

    get defaultHandler() { return _defaultHandler; },
    set defaultHandler(p_value) { _defaultHandler = p_value; },

    GetNFOS: function (p_id) { return _map[p_id]?.nfos; },

    Get: function (p_id) {
        let cl = _map[p_id].cl;
        if (!cl) { return null; }
        return com.Rent(cl);
    },

    Add: function (p_input) {

        if (u.isArray(p_input)) {
            for (const action of p_input) { module.exports._Add(action); };
        } else if (u.isObject(p_input)) {
            for (let id in p_input) { module.exports._Add(p_input[id]); }
        } else {
            module.exports._Add(p_input);
        }
    },

    _Add(p_class) {

        if (!u.isInstanceOf(p_class, AbstractOperation)) { return; }

        let nfos = com.NFOS.Get(p_class);
        if (!nfos || !nfos.name) { return; }

        if (nfos.name in _map) {
            console.warn(`Action '${nfos.name}' already exists and will be overwritten.`);
        } else {
            console.log(`+ Action '${nfos.name}'`);
        }

        _map[nfos.name] = { id: nfos.name, cl: p_class, nfos: com.NFOS.Get(p_class) };

    },

    List: function () {
        let list = [];
        for (let id in _map) { list.push(_map[id]); }
        return list;
    }

}