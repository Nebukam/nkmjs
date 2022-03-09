'use strict';

const IOProcess = require(`../io-process`);
const ENCODING = require(`../encoding`);
const RESPONSE_TYPE = require(`../response-type`);

const domparser = new DOMParser();

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
        this._Bind(this._OnResponseReadComplete);
        this._Bind(this._OnResponseReadCompleteDOM);
        this._responseType = null;
        this._domType = null;
    }

    Process() {

        this._OnStart();

        this._responseType = this._operation.GetOption(`responseType`, this.rsc.type);

        let requestOptions = {
            //onDownloadProgress: this._OnProgress,
            headers: {
                'Access-Control-Allow-Origin': '*',
                ...this._operation.GetOption(`headers`, {})
            }
        };

        if (this.rsc.mime) { requestOptions.headers['Content-Type'] = this.rsc.mime.type; }

        requestOptions.method = `GET`;
        
        // no-cors, *cors, same-origin
        requestOptions.mode = this._operation.GetOption(`mode`, `cors`);

        // *default, no-cache, reload, force-cache, only-if-cached
        requestOptions.cache = this._operation.GetOption(`cache`, `default`); 
        
        // include, *same-origin, omit
        requestOptions.credentials = this._operation.GetOption(`credentials`, `same-origin`);
        
        // manual, *follow, error
        requestOptions.redirect = this._operation.GetOption(`redirect`, `follow`);
        
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        requestOptions.referrerPolicy = this._operation.GetOption(`referrerPolicy`, `no-referrer-when-downgrade`);

        super._OnProgress(0);

        console.log(requestOptions);

        fetch(this._operation.fullPath, requestOptions)
            .then(response => {
                if (!response.ok) { console.log(response);throw new Error('Network response was not OK'); }
                return response;
            })
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

        let data = null;

        switch (this._responseType) {
            case RESPONSE_TYPE.TEXT:
                data = p_evt.text().then(this._OnResponseReadComplete);
                break;
            case RESPONSE_TYPE.ARRAYBUFFER:
                data = p_evt.arrayBuffer().then(this._OnResponseReadComplete);
                break;
            case RESPONSE_TYPE.BLOB:
                data = p_evt.blob().then(this._OnResponseReadComplete);
                break;
            case RESPONSE_TYPE.JSON:
                data = p_evt.json().then(this._OnResponseReadComplete);
                break;
            case RESPONSE_TYPE.DOCUMENT:
                this._domType = p_evt.headers.get("content-type");
                data = p_evt.text().then(this._OnResponseReadCompleteDOM);
                break;
            default:
                data = p_evt.text().then(this._OnResponseReadComplete);
                break;
        }

        data.catch(this._OnError);

    }

    _OnResponseReadCompleteDOM(p_data) {
        try {
            this.rsc.raw = domparser.parseFromString(p_data, this._domType);
            this._OnSuccess();
        } catch (e) {
            this._OnError(e);
        }
    }

    _OnResponseReadComplete(p_data) {
        this.rsc.raw = p_data;
        this._OnSuccess();
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = HTTPIOReader;