'use strict';

class CONTROL_SIGNAL{
    constructor() {}

    static VALUE_CHANGED = Symbol(`valueChanged`);
    static VALUE_COMMITTED = Symbol(`valueCommitted`);
}

module.exports = CONTROL_SIGNAL;