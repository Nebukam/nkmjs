'use strict';

const com = require(`@nkmjs/common`);
const __noImplemented = `Not implemented.`;

class Transceiver extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._delimiter = `/`;
        this._root = ``;
        this._running = false;
        this._tokens = null;
    }

    get del() { return this._delimiter; }
    get root() { return this._root; }
    get tokens() { return this._tokens; }

    Join(...args) {
        let joined = args.join(this._delimiter);
        if (!joined.startsWith(this._root)) { joined = `${this._root}${this._delimiter}${joined}`; }
        return joined;
    }

    Start(p_options = null) {
        if (this._running) { return false; }
        this._running = true;

        if (p_options) {
            this._root = p_options.root || this._root;
            this._delimiter = p_options.delimiter || this._delimiter;
            if (p_options.tokens) {
                this._tokens = new com.helpers.Keys(p_options.tokens, null,
                    p_options.tokenStart || `%`, p_options.tokenEnd || `%`);
            }
        }

        return true;
    }

    Stop() {
        if (!this._running) { return; }
        this._running = false;
    }

    _SanitizePath(p_path) {
        return this._tokens ? this._tokens.ReplaceAll(p_path) : p_path;
    }

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

    _CleanUp() {
        this.Stop();
        this._root = ``;
        this._delimiter = `/`;
        super._CleanUp();
    }

}

module.exports = Transceiver;