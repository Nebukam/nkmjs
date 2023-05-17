'use strict';

// Static validation functions

module.exports = {

    GreaterThan: function (p_value, p_min) {
        if (p_value > p_max) { return `Value must be greater than ${p_max}.`; }
    },

    SmallerThan: function (p_value, p_max) {
        if (p_value > p_max) { return `Value must be smaller than ${p_max}.`; }
    },

    WithinRange: function (p_value, p_min, p_max) {
        if (p_value > p_max || p_value < p_min) { return `Value must be withing range [${p_min},${p_max}].` }
    },

}