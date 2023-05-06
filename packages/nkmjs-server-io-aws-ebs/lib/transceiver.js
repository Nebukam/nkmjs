const nkm = require(`@nkmjs/core/nkmserver`);

class Transceiver extends nkm.io.Transceiver {
    constructor() { super(); }

    CreateReadStream(p_path, p_options = null) { throw new Error(__noImplemented); }

    CreateWriteStream(p_path, p_options = null) { throw new Error(__noImplemented); }

    Exists(p_path, p_callback) { throw new Error(__noImplemented); }

    Stat(p_path, p_callback) { throw new Error(__noImplemented); }

    MkDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    ReadDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    ReadFile(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    RmDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    Unlink(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    WriteFile(p_path, p_data, p_callback, p_options = null) { throw new Error(__noImplemented); }

}

module.exports = Transceiver;