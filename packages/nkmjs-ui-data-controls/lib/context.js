'use strict';

const com = require("@nkmjs/common");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class EDITOR extends com.helpers.CSYMBOL { constructor() { super(); } }
class DEFAULT_EDITOR extends EDITOR { constructor() { super(); } }
class INSPECTOR extends com.helpers.CSYMBOL { constructor() { super(); } }
class DEFAULT_INSPECTOR extends INSPECTOR { constructor() { super(); } }
class DEFAULT_LIST_INSPECTOR extends DEFAULT_INSPECTOR { constructor() { super(); } }
class EDITOR_IN_PLACE extends com.helpers.CSYMBOL { constructor() { super(); } }
class CONTROLLER extends com.helpers.CSYMBOL { constructor() { } }

module.exports = {
    EDITOR: EDITOR,
    DEFAULT_EDITOR: DEFAULT_EDITOR,
    INSPECTOR: INSPECTOR,
    DEFAULT_INSPECTOR: DEFAULT_INSPECTOR,
    DEFAULT_LIST_INSPECTOR: DEFAULT_LIST_INSPECTOR,
    EDITOR_IN_PLACE: EDITOR_IN_PLACE,
    CONTROLLER: CONTROLLER
};