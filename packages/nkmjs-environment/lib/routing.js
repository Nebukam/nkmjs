'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`./environment`);

const _getPrefix = `/api/get`;
const _actionPrefix = `/api/action`;

module.exports = {

    get getPrefix() { return _getPrefix; },
    get actionPrefix() { return _actionPrefix; },

    NONE: Object.freeze('none'),

    Model: function (p_prefix, p_nfos) {
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { p_prefix += p_nfos.prefix; }
        if (p_nfos.params) { p_nfos.params.forEach(param => { p_prefix += `/:${param.id}`; }); }
        return p_prefix;
    },

    Build: function (p_prefix, p_nfos, p_params) {
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { p_prefix += p_nfos.prefix; }
        if (p_nfos.params) {
            p_nfos.params.forEach(param => {
                let value = (p_params ? p_params[param.id] : null) || param.default || module.exports.NONE;
                p_prefix += `/${value}`;
            });
        }
        return p_prefix;
    },

    Get: function (p_api, p_params, p_callback) {
        fetch(`${env.app.baseURL}${module.exports.Build(_getPrefix, p_api, p_params)}`, {})
            .then((p_res) => {
                if (!p_res.ok) { p_callback(p_res, null); }
                else {
                    let contentType = p_res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        p_res.json().then(data => { p_callback(null, data); });
                    } else {
                        p_res.text().then(text => { p_callback(null, text); });
                    }
                }
            });
    },

    Do: function (p_options, p_callback) {
        fetch(`${env.app.baseURL}${_actionPrefix}`, p_options)
            .then((p_res) => {
                if (!p_res.ok) { p_callback(p_res, null); }
                else { p_callback(null, p_res.json()); }
            });
    },



}