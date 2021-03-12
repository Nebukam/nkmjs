'use strict';

const u = require("@nkmjs/utils");
const IOProcess = require(`../io-process`);
const BLOBResource = require(`../resources/resource-blob`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class HTTPIOWriter extends IOProcess {

    constructor() { super(); }

    static get dlLink() {
        if (this.__a) { return this.__a; }
        this.__a = document.createElement('a');
        this.__a.style.display = 'none';
        return this.__a;
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        try {

            let a = HTTPIOWriter.dlLink;
            a.download = `${u.PATH.name(this._operation.fullPath)}${ext}`;
            a.href = window.URL.createObjectURL(
                u.tils.isInstanceOf(this.rsc.content, Blob) ? this.rsc.content
                    : new Blob([this.rsc.content], { type: `${this.rsc.mime ? this.rsc.mime.type : `text/plain`}` }));

            a.click(); //hack much

            this._OnSuccess();

        } catch (p_err) {
            this._OnError(p_err);
        }

    }

}

module.exports = HTTPIOWriter;