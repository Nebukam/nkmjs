'use strict';

const axios = require('axios');

const IOProcess = require(`../io-process`);
const ENCODING = require(`../encoding`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class HTTPIOReader extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnRequestSuccess);
    }

    Process() {

        this._OnStart();

        let additionalHeaders = this._operation.GetOption(`headers`, {});

        let options = {
            onDownloadProgress: this._OnProgress,
            responseType: this.rsc.type,
            headers: {
                'Access-Control-Allow-Origin': '*',
                ...additionalHeaders
            }
        };

        if (this.rsc.mime) {
            options.headers['Content-Type'] = this.rsc.mime;
        }

        
        let creds = this._operation.GetOption(`withCredentials`, -1);

        if (options.headers.Cookie) { options.withCredentials = true; }
        if (creds != -1) { options.withCredentials = creds; }

        super._OnProgress(0);

        axios.get(this._operation.fullPath, options)
            .then(this._OnRequestSuccess)
            .catch(this._OnError);

    }

    _OnProgress(p_evt) {

        let totalLength = p_evt.lengthComputable ? p_evt.total : p_evt.target.getResponseHeader('x-decompressed-content-length') || p_evt.target.getResponseHeader('content-length');
        //console.log(`onDownloadProgress ${p_evt.loaded} / ${totalLength}`);
        let progress = 1;
        if (totalLength !== null) { progress = p_evt.loaded / totalLength; }

        super._OnProgress(progress);

    }

    _OnRequestSuccess(p_evt) {
        this.rsc.raw = p_evt.data;
        this._OnSuccess();
    }


    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = HTTPIOReader;