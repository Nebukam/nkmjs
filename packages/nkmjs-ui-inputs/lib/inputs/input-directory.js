'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { UI } = require(`@nkmjs/ui-core`);

const InputFile = require(`./input-file`);

class InputDirectory extends InputFile {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._openType = 'openDirectory';
    }

}

module.exports = InputDirectory;
UI.Register(`nkmjs-input-directory`, InputDirectory);