'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`./environment`);
const _globalHeaders = {};
const _actionPrefix = `/do`
module.exports = {

    NONE: Object.freeze('none'),

    get actionPrefix() { return _actionPrefix; },
    set actionPrefix(p_value) { _actionPrefix = p_value; },

    get globalHeaders() { return _globalHeaders; },
    set globalHeaders(p_value) { for (let h in p_value) { _globalHeaders[h] = p_value[h]; } },

    Model: function (p_nfos) {
        let route = ``;
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { route += p_nfos.prefix; }
        if (p_nfos.params) { for (const param of p_nfos.params) { route += `/:${param.id}`; }; }
        return route;
    },

    Build: function (p_nfos, p_params) {
        let route = ``;
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { route += p_nfos.prefix; }
        if (p_nfos.params) {
            for (const param of p_nfos.params) {
                let value = (p_params ? p_params[param.id] : null) || param.default || module.exports.NONE;
                route += `/${value}`;
            };
        }
        return route;
    },

    Send: async function (p_api, p_params, p_onSuccess = null, p_onError = null) {

        let conf = {
            method: p_api.method || 'GET',
            body: p_params?.body || null,
            headers: u.merge.Defaults(p_params?.headers, _globalHeaders)
        }

        return fetch(`${env.app.baseURL}${module.exports.Build(p_api, p_params)}`, conf)
            .then(async (p_res) => {
                if (!p_res.ok) {
                    if (p_onError) { return p_onError(p_res) }
                    else { return p_res; }
                }

                if (p_onSuccess) {
                    let data = await module.exports.ProcessResponse(p_params, p_res);
                    return p_onSuccess(data);
                } else {
                    return module.exports.ProcessResponse(p_params, p_res);
                }

            })
            .catch((e) => {
                if (p_onError) { return p_onError(e) }
                else { return e; }
            });
    },

    ProcessResponse: async function (p_params, p_res) {

        if (p_params.get) { return p_params.get(p_res); }

        let contentType = p_res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return p_res.json();
        } else {
            return p_res.text();
        }
    }


}