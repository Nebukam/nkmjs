'use strict';

const com = require("@nkmjs/common");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class DOCUMENT extends com.helpers.CSYMBOL { constructor() { super(); } }

class DOCUMENT_DEFAULT_DATA extends com.helpers.CSYMBOL { constructor() { super(); } }

module.exports = {
    DOCUMENT: DOCUMENT,
    DOCUMENT_DEFAULT_DATA: DOCUMENT_DEFAULT_DATA
};