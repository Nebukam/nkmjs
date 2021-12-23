'use strict';

const axios = require(`axios`);

/**
 * A simple ping object to an url that either succeeds or fails.
 * @class
 * @hideconstructor
 * @memberof common.helpers
 */
class Ping {

    constructor(p_url, p_options = null) {
        this._url = p_url;
        this._running = false;
        this._success = false;
        this._done = false;

        if (p_options) {
            this._onSuccess = p_options.success;
            this._onError = p_options.error;
            this._onAny = p_options.any;
        } else {
            this._onSuccess = null;
            this._onError = null;
            this._onAny = null;
        }
        this._OnSuccess = this._OnSuccess.bind(this);
        this._OnError = this._OnError.bind(this);
        this._OnAny = this._OnAny.bind(this);
    }

    get running() { return this._running; }
    get success() { return this._success; }
    get done() { return this._done; }
    get doneAndSuccess() { return this._done && this._success; }
    get doneAndError() { return this._done && !this._success; }

    Ping() {
        if (this._running || this._done) { return this._done; }

        this._running = true;
        this._success = false;
        this._done = false;

        axios.get(this._url,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(this._OnSuccess)
            .catch(this._OnError);

        return this._done;

    }

    Reset(){
        if(this._running){ return; }
        this._done = false;
    }

    _OnSuccess() {
        this._success = true;
        this._done = true;
        if (this._onSuccess) { this._onSuccess(); }
        this._OnAny();
    }

    _OnError() {
        this._success = false;
        this._done = true;
        if (this._onError) { this._onError(); }
        this._OnAny();
    }

    _OnAny() {
        if (this._onAny) { this._onAny(); }
        this._running = false;
    }

}

module.exports = Ping;