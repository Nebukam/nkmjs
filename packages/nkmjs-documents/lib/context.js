'use strict';

const com = require("@nkmjs/common");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class DOCUMENT extends com.CSYMBOL { constructor() { super(); } }

class DOCUMENT_DATA extends com.CSYMBOL { constructor() { super(); } }

module.exports = {
    DOCUMENT: DOCUMENT,
    DOCUMENT_DATA: DOCUMENT_DATA
};