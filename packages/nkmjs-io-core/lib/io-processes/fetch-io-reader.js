'use strict';

const env = require(`@nkmjs/environment`);

const IOProcess = require(`../io-process`);
const ENCODING = require(`../encoding`);

/**
 * @description Fetch is used in conjunction with service workers.
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class FetchIOReader extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnMessageResponse);
        this._Bind(this._OnRequestSuccess);
    }

    Process() {

        this._OnStart();

        super._OnProgress(0);

        //TODO : Fetch "type" from resource
        //so we can know what kind of answer to expect

        env.runtime.sendMessage({
            url: this._operation.fullPath
        }, this._OnMessageResponse);

    }

    _OnMessageResponse(p_response){

        if(p_response.error){
            this._OnError(new Error(p_response.error));
            return;
        }

        if(!p_response.data){
            this._OnError(new Error(`Empty response`));
            return;
        }

        this._OnProgress(1);
        this._OnRequestSuccess(p_response);

    }

    _OnRequestSuccess(p_evt) {

        // re-interpret type from response string
        // to expected strong type

        this.rsc.raw = p_evt.data;
        this._OnSuccess();
    }


    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = FetchIOReader;