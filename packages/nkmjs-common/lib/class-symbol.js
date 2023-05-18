'use strict';

class CSYMBOL{
    constructor(){}
    toString(){ return this.constructor.name.toUpperCase(); }
    static toString(){ return this.name.toUpperCase(); }
}

module.exports = CSYMBOL;