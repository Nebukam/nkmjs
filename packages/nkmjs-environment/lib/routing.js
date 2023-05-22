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

    /**
     * 
     * @param {*} p_nfos 
     * @returns 
     */
    Model: function (p_nfos) {
        let route = ``;
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { route += p_nfos.prefix; }
        if (p_nfos.params) { for (const param of p_nfos.params) { route += `/:${param.id}`; }; }
        return route;
    },

    /**
     * 
     * @param {*} p_nfos 
     * @param {*} p_params 
     * @returns 
     */
    Build: function (p_nfos, p_params) {
        let route = ``;
        if (p_nfos.constructor !== Object) { p_nfos = com.NFOS.Get(p_nfos); }
        if (p_nfos.prefix) { route += p_nfos.prefix; }
        if (p_nfos.action) {
            route += `/do/${p_nfos.name}`;
        } else if (p_nfos.params) {
            for (const param of p_nfos.params) {
                let value = (p_params ? p_params[param.id] : null) || param.default || module.exports.NONE;
                route += `/${value}`;
            };
        }
        return route;
    },

    /**
     * 
     * @param {*} p_api 
     * @param {*} p_params 
     * @param {*} p_onSuccess 
     * @param {*} p_onError 
     * @returns 
     */
    Send: async function (p_api, p_params, p_onSuccess = null, p_onError = null) {

        let
            conf = {
                method: p_api.method || 'GET',
                body: p_params?.body || null,
                headers: u.merge.Defaults(p_params?.headers, _globalHeaders)
            };

        if(conf.body){
            if(u.isObject(conf.body)){
                conf.body = JSON.stringify(conf.body);
                conf.headers['content-type'] = `application/json`;
            }
        }

        let res;

        try { res = await fetch(`${env.app.baseURL}${module.exports.Build(p_api, p_params)}`, conf); }
        catch (e) { res = e; }

        if (!res.ok) {
            if (p_onError) { return p_onError(res); }
            else { return res; }
        }

        if (p_onSuccess) {
            let data = await module.exports.ProcessResponse(res, p_params);
            return p_onSuccess(data);
        } else {
            return await module.exports.ProcessResponse(res, p_params);
        }

    },

    ProcessResponse: async function (p_res, p_params) {

        if (p_params?.get) { return p_params.get(p_res); }

        let contentType = p_res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return p_res.json();
        } else {
            return p_res.text();
        }
    }


}