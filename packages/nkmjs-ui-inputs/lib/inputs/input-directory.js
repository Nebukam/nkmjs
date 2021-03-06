'use strict';

const ui = require(`@nkmjs/ui-core`);

const InputFile = require(`./input-file`);

class InputDirectory extends InputFile {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._openType = 'openDirectory';
    }

}

module.exports = InputDirectory;
ui.Register(`nkmjs-input-directory`, InputDirectory);