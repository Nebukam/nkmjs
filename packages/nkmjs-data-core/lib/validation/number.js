'use strict';

// Static validation functions

class NUMBER{
    constructor(){}

    GreaterThan(p_value, p_min){
        if(p_value > p_max){ return `Value must be greater than ${p_max}.`; }
    }

    SmallerThan(p_value, p_max){
        if(p_value > p_max){ return `Value must be smaller than ${p_max}.`; }
    }

    WithinRange(p_value, p_min, p_max){
        if(p_value > p_max || p_value < p_min){ return `Value must be withing range [${p_min},${p_max}].` }
    }

}

module.exports = NUMBER;