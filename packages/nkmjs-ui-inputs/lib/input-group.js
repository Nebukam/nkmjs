'use struct';

const ui = require(`@nkmjs/ui-core`);
const InputBase = require(`./input-base`);

/**
 * For manipulating multi-dimensional values (i.e a curve with handles)
 */

class InputGroup extends InputBase {
    constructor() { super(); }

}

module.exports = InputGroup;
ui.Register(`nkmjs-input-group`, InputGroup);