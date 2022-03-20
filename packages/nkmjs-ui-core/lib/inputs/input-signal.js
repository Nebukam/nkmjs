'use strict';

class INPUT_SIGNAL {
    constructor() { }

    static VALUE_INPUT_CHANGED = Symbol(`valueInputChanged`);
    static VALUE_SUBMITTED = Symbol(`valueCommitted`);
    static VALUE_UPDATE_ANY = Symbol(`valueUpdateAny`);

    static INPUT_ERROR = Symbol(`inputError`);

    static FORM_READY = Symbol(`formReady`);
    static FORM_INVALID = Symbol(`formInvalid`);

}

module.exports = INPUT_SIGNAL;