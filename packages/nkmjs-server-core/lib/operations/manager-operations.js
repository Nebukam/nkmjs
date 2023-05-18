'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const AbstractOperation = require(`./abstract-operation`);

const _map = {};
var _defaultHandler = null;

module.exports = {

    get defaultHandler() { return _defaultHandler; },
    set defaultHandler(p_value) { _defaultHandler = p_value; },

    GetNFOS: function (p_id) { return _map[p_id]?.nfos; },

    Has: function (p_id) {
        return p_id in _map;
    },

    Get: function (p_id) {
        let cl = _map[p_id]?.cl;
        if (!cl) { return null; }
        return com.Rent(cl);
    },

    Add: function (p_input, p_handler = null) {

        if (u.isArray(p_input)) {
            p_input.forEach(getter => { module.exports._Add(getter, p_handler); });
        } else if (u.isObject(p_input)) {
            for (let id in p_input) { module.exports._Add(p_input[id], p_handler); }
        } else {
            module.exports._Add(p_input, p_handler);
        }
    },

    _Add(p_class, p_handler = null) {

        if (!u.isInstanceOf(p_class, AbstractOperation)) { return; }

        let nfos = com.NFOS.Get(p_class);
        if (!nfos) { return; }

        let id = nfos.name;

        if (id in _map) {
            console.warn(`Getter '${id}' already exists and will be overwritten.`);
        }

        _map[id] = {
            id: id,
            cl: p_class,
            nfos: nfos,
            handler: p_handler || _defaultHandler
        };

        //console.log(`+ get '${id}' ${p_class.name} | ${(p_handler || _defaultHandler).name}`);

    },

    List: function () {
        let list = [];
        for (let id in _map) { list.push(_map[id]); }
        return list;
    }

}