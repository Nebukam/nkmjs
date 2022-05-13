'use strict';

const ui = require(`@nkmjs/ui-core`);

const InputFile = require(`./input-file`);

class InputDirectory extends InputFile {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._openType = 'openDirectory';
        this._iconID = `directory-search`;
    }

    _GrabValue() {
        let values = this._inputField.value.split(`,`);
        values.forEach((val, i) => { values[i] = val.trim(); });
        return values;
    }

}

module.exports = InputDirectory;
ui.Register(`nkmjs-input-directory`, InputDirectory);