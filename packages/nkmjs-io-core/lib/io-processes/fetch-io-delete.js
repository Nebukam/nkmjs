'use strict';

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class FetchIORename extends IOProcess {

    constructor() { super(); }

    Process() {
        this._OnStart();
        this._OnProgress(0);
        this._OnError(new Error(`HTTP delete not supported.`));
    }

}

module.exports = FetchIORename;