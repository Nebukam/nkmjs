'use strict';

const com = require(`@nkmjs/common`);
const services = require(`@nkmjs/services`);

const __noImplemented = `Not implemented.`;

const __writeMethods = [
    'CreateWriteStream',
    'MkDir',
    'RmDir',
    'Unlink',
    'WriteFile'
];

class Transceiver extends com.Observable {
    constructor() { super(); }

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`prefix`, null, ``)
        .To(`delimiter`, null, `/`)
        .To(`readOnly`)
        .To(`tokens`)
        .To(`recursive`, null, true);

    _Init() {
        super._Init();

        this._delimiter = `/`;
        this._root = ``;
        this._prefix = ``;
        this._running = false;
        this._recursive = true;
        this._service = null;
        this._tokens = null;
        this._uid = null;

        this._prependRoot = false;

        this._backedWrites = {};
        __writeMethods.forEach(mtd => { this._backedWrites[mtd] = this._Bind(this[mtd]); });

    }

    get service() { return this._service; }
    set service(p_value) { this._service = p_value; }

    get prefix() { return this._prefix; }
    set prefix(p_value) { this._prefix = p_value; }

    get uid() { return this._uid; }
    set uid(p_value) {
        if (this._uid) { throw new Error(`Cannot overwrite transceiver id once it's been set.`); }
        this._uid = p_value;
    }

    get del() { return this._delimiter; }
    set del(p_value) { this._delimiter = p_value; }

    get root() { return this._root; }
    set root(p_value) { this._root = p_value; }

    /**
     * { keys:{key:'value'}, [start:]`%`, [end:]`%` }
     */
    get tokens() { return this._tokens; }
    set tokens(p_value) {
        if (p_value) {
            this._tokens = new com.helpers.Keys(p_value.keys, null,
                p_value.start || `%`, p_value.end || p_value.start || `%`);
        } else {
            this._tokens = null;
        }
    }

    get readOnly() { return this._readOnly; }
    set readOnly(p_value) {
        this._readOnly = p_value;
        if (p_value) {
            __writeMethods.forEach(mtd => {
                this[mtd] = () => { throw new Error(`Transceiver '${mtd}' is read-only.`); }
            })
        } else {
            __writeMethods.forEach(mtd => { this[mtd] = this._backedWrites[mtd] })
        }
    }

    get recursive() { return this._recursive; }
    set recursive(p_value) { this._recursive = p_value; }

    Join(...args) {
        let joined = args.join(this._delimiter);
        if (this._prependRoot && !joined.startsWith(this._root)) {
            joined = this._root.endsWith(this._delimiter) ?
                `${this._root}${joined}` :
                `${this._root}${this._delimiter}${joined}`;
        }
        return joined;
    }

    Start(p_options = null) {
        if (this._running) { return false; }
        this.Broadcast(services.SIGNAL.STARTING, this);
        this._running = true;

        this.constructor.__distribute.Update(this, p_options || {});

        return true;
    }

    _OnStarted() {
        this.Broadcast(services.SIGNAL.STARTED, this);
    }

    Stop() {
        if (!this._running) { return; }
        this.Broadcast(services.SIGNAL.STOPPING, this);
        this._running = false;
    }

    _OnStopped() {
        this.Broadcast(services.SIGNAL.STOPPED, this);
    }

    _SanitizePath(p_path) {
        p_path = this._tokens ? this._tokens.ReplaceAll(p_path) : p_path;
        if (this._prependRoot) { p_path = this.Join(p_path); }
        if (!p_path.startsWith(this._prefix)) { p_path = `${this._prefix}${p_path}`; }
        return p_path;
    }

    _opt(p_options, p_name, p_fallback) {
        if (!p_options) { return p_name in this ? this[p_name] : p_fallback; }
        return p_name in p_options ? p_options[p_name] : p_name in this ? this[p_name] : p_fallback;
    }

    CreateReadStream(p_path, p_options = null) { throw new Error(__noImplemented); }

    CreateWriteStream(p_path, p_options = null) { throw new Error(__noImplemented); }

    /**
     * @callback boolCallback
     * @param {error} p_err Error, if any
     * @param {string} p_path Path used for the original operation
     * @param {boolean} p_response Result of the operation
     */

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     */
    Exists(p_path, p_callback) { throw new Error(__noImplemented); }

    /**
     * @callback statCallback
     * @param {error} p_err Error, if any
     * @param {string} p_path Path used for the original operation
     * @param {stats} p_stats If no error, contains the stat object.
     */

    /**
     * 
     * @param {string} p_path 
     * @param {statCallback} p_callback 
     */
    Stat(p_path, p_callback) { throw new Error(__noImplemented); }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    MkDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    /**
     * @callback readdirCallback
     * @param {error} p_err Error, if any
     * @param {string} p_path Path used for the original operation
     * @param {Array} p_files An array of file paths contained within 
     */

    /**
     * 
     * @param {string} p_path 
     * @param {readdirCallback} p_callback 
     * @param {*} p_options 
     */
    ReadDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    /**
     * @callback readfileCallback
     * @param {error} p_err Error, if any
     * @param {string} p_path Path used for the original operation
     * @param {*} p_content Content of the file
     */

    /**
     * 
     * @param {string} p_path 
     * @param {readfileCallback} p_callback 
     * @param {*} p_options 
     */
    ReadFile(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    RmDir(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    Unlink(p_path, p_callback, p_options = null) { throw new Error(__noImplemented); }

    /**
     * 
     * @param {string} p_path 
     * @param {*} p_data 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    WriteFile(p_path, p_data, p_callback, p_options = null) { throw new Error(__noImplemented); }

    _CleanUp() {

        this.Stop();

        this.readOnly = false;
        this.tokens = null;

        this._uid = null;
        this._root = ``;
        this._prefix = ``;
        this._delimiter = `/`;
        this._recursive = true;
        this._service = null;

        super._CleanUp();
    }

    toString() {
        let base = this.constructor.name.split(`_`); base.shift();
        base = base.join(` `);
        return `· ⇋  ${base} | ${this._uid} @ ${this._root}`;
    }

}

module.exports = Transceiver;