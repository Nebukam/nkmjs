'use strict';

class INPUT_SIGNAL {
    constructor() { }

    static VALUE_CHANGED = Symbol(`valueChanged`);
    static VALUE_SUBMITTED = Symbol(`valueCommitted`);
    static INPUT_ERROR = Symbol(`inputError`);

    static FORM_READY = Symbol(`formReady`);
    static FORM_INVALID = Symbol(`formInvalid`);

}

module.exports = INPUT_SIGNAL;