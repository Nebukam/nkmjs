const nkm = require(`@nkmjs/core/nkmserver`);
const nkmAWS = require(`@nkmjs/server-io-aws`);

class SERVER_IO_AWS_S3 extends nkmAWS.IO {
    constructor() { super(); }

    static __SDK = require(`@aws-sdk/client-s3`).S3;
    static __transceiverClass = require(`./transceiver-s3`);

    _Init() {
        super._Init();
    }

    static CreateBucket(p_identifier, p_callback) {
        this.api.createBucket(
            { Bucket: p_identifier },
            function (err, data) {
                if (err) { throw err; }
                else {
                    p_callback(data.Location);
                    if (p_identifier in this._map) {
                        //this._map[p_identifier];
                    }
                }
            });
    }

    static DeleteBucket(p_identifier, p_callback) {
        this.api.createBucket(
            { Bucket: p_identifier },
            function (err, data) {
                if (err) { throw err; }
                else {
                    p_callback(data.Location);
                    if (p_identifier in this._map) {
                        this._map[p_identifier].Stop();
                    }
                }
            });
    }

}

module.exports = new SERVER_IO_AWS_S3();