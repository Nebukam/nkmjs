'use struct';

const UI = require(`../ui`);
const InputBase = require(`./input-base`);

/**
 * For manipulating multi-dimensional values (i.e a curve with handles)
 */

class InputGroup extends InputBase {
    constructor() { super(); }

}

module.exports = InputGroup;
UI.Register(`nkmjs-input-group`, InputGroup);