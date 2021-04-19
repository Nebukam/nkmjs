'use strict';

// Static sanitization functions
// used by inputs & filters

class NUMBER {
    constructor() { }

    ClampMin(p_value, p_min) { return p_value < p_min ? p_min : p_value; }

    ClampMax(p_value, p_max) { return p_value > p_max ? p_max : p_value; }

    Clamp(p_value, p_min, p_max) {
        if (p_value < p_min) { p_value = p_min; }
        else if (p_value > p_max) { p_value = p_max; }
        return p_value;
    }

}

module.exports = NUMBER;