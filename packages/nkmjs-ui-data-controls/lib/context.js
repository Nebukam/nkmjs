'use strict';

const com = require("@nkmjs/common");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class EDITOR extends com.helpers.CSYMBOL { constructor() { super(); } }

module.exports = {

    EDITOR: EDITOR,

};