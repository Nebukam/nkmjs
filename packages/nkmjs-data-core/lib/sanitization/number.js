'use strict';

// Static sanitization functions
// used by inputs & filters

class NUMBER {
    constructor() { }

    static ClampMin(p_value, p_min) { return p_value < p_min ? p_min : p_value; }

    static ClampMax(p_value, p_max) { return p_value > p_max ? p_max : p_value; }

    static Clamp(p_value, p_min, p_max) {
        if (p_value < p_min) { p_value = p_min; }
        else if (p_value > p_max) { p_value = p_max; }
        return p_value;
    }

}

module.exports = NUMBER;