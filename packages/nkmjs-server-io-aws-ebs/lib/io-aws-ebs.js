const nkm = require(`@nkmjs/core/nkmserver`);
const nkmAWS = require(`@nkmjs/server-io-aws`);

class SERVER_IO_AWS_EBS extends nkmAWS.IO {
    constructor() { super(); }

    static __SDK = require(`@aws-sdk/client-ebs`).EBS;
    static __transceiverClass = require(`./transceiver-ebs`);

    _Init() {
        super._Init();
    }

}

module.exports = SERVER_IO_AWS_EBS;