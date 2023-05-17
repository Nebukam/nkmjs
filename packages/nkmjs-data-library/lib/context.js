'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class FIELD_DETAILS extends com.helpers.CSYMBOL { constructor() { super(); } }
class FIELD_DESCRIPTOR extends com.helpers.CSYMBOL { constructor() { super(); } }

module.exports = {
    FIELD_DETAILS: FIELD_DETAILS
};