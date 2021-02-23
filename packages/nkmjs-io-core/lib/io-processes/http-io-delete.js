'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);
const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class HTTPIORename extends IOProcess {

    constructor() { super(); }

    Process() {
        this._OnStart();
        this._OnProgress(0);
        this._OnError(new Error(`HTTP delete not supported.`));
    }

}

module.exports = HTTPIORename;