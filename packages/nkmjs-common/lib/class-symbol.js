'use strict';

class CSYMBOL {
    constructor() { }
    toString() { return this.constructor.name.toUpperCase(); }
    static toString() { return this.name.toUpperCase(); }
}

class CKEY extends CSYMBOL { constructor() { super(); } }

module.exports = {
    CSYMBOL: CSYMBOL,
    CKEY: CKEY
};