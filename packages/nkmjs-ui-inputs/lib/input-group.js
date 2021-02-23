'use struct';

const { UI } = require(`@nkmjs/ui-core`);
const InputBase = require(`./input-base`);

/**
 * For manipulating multi-dimensional values (i.e a curve with handles)
 */

class InputGroup extends InputBase {
    constructor() { super(); }

}

module.exports = InputGroup;
UI.Register(`nkmjs-input-group`, InputGroup);