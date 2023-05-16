'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const AbstractAction = require(`./abstract-action`);

const _map = {};
var _defaultHandler = null;

module.exports = {

    get defaultHander() { return _defaultHandler; },
    set defaultHander(p_value) { _defaultHandler = p_value; },

    GetModel: function (p_id) {
        let cl = _map[p_id];
        if (!cl) { return null; }
        return com.NFOS.Get(cl);
    },

    Get: function (p_id) {
        let cl = _map[p_id];
        if (!cl) { return null; }
        return com.Rent(cl);
    },

    Add: function (p_input) {

        if (u.isArray(p_input)) {
            p_input.forEach(action => { module.exports._Add(action); });
        } else if (u.isObject(p_input)) {
            for (let id in p_input) { module.exports._Add(p_input[id]); }
        } else {
            module.exports._Add(p_input);
        }
    },

    _Add(p_class) {

        if (!u.isInstanceOf(p_class, AbstractAction)) { return; }

        let nfos = com.NFOS.Get(p_class);
        if (!nfos || !nfos.identifier) { return; }

        if (nfos.identifier in _map) {
            console.warn(`Action '${nfos.identifier}' already exists and will be overwritten.`);
        }else{
            console.log(`+ Action '${nfos.identifier}'`);
        }

        _map[nfos.identifier] = { id: nfos.identifier, cl: p_class, nfos: com.NFOS.Get(p_class) };

    },

    List: function () {
        let list = [];
        for (let id in _map) { list.push(_map[id]); }
        return list;
    }

}