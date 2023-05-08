const nkm = require(`@nkmjs/core/nkmserver`);
const fs = require(`fs`);
const path = require(`path`);

const base = nkm.io.Transceiver;
class Transceiver_FS extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`sync`, false);

    _Init() {
        super._Init();
        this._sync = false;
    }

    get sync() { return this._sync; }
    set sync(p_value) { this._sync = p_value; }

    Start(p_options = null) {
        if (!super.Start(p_options)) { return false; }
        this._OnStarted();
        return true;
    }

    _SanitizePath(p_path) {
        let sanitized = super._SanitizePath(p_path);
        return path.join(sanitized);
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
    Exists(p_path, p_callback) {

        p_path = this._SanitizePath(p_path);

        if (this._sync) {
            try {
                let stats = fs.statSync(p_path);
                p_callback(null, p_path, true);
            } catch (e) { p_callback(e, p_path, false); }
        } else {
            fs.stat(p_path, (err, stats) => { p_callback(err, p_path, true); });
        }

    }

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
    Stat(p_path, p_callback) {

        p_path = this._SanitizePath(p_path);

        if (this._sync) {
            try {
                let stats = fs.statSync(p_path);
                p_callback(null, p_path, stats);
            } catch (e) { p_callback(e, p_path, null); }
        } else {
            fs.stat(p_path, (err, stats) => { p_callback(err, p_path, stats); });
        }

    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    MkDir(p_path, p_callback, p_options = null) {

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};
        opts.recursive = this._opt(opts, `recursive`);

        if (this._sync) {
            try {
                fs.mkdirSync(p_path, opts);
                p_callback(null, p_path, true);
            } catch (e) { p_callback(e, p_path, false); }
        } else {
            fs.mkdir(p_path, opts, (err, p) => {
                if (err.code == 'ENOENT' && opts.recursive) {
                }
                p_callback(err, p_path, err ? false : true);
            })
        }

    }

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
    ReadDir(p_path, p_callback, p_options = null) {

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};

        if (this._sync) {
            try {
                let content = fs.readdirSync(p_path, opts);
                p_callback(null, p_path, content);
            } catch (e) { p_callback(e, p_path, []); }
        } else {
            fs.readdir(p_path, opts, (err, content) => { p_callback(err, p_path, content); });
        }

    }

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
    ReadFile(p_path, p_callback, p_options = null) {

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};

        if (this._sync) {
            try {
                let content = fs.readFileSync(p_path, opts);
                p_callback(null, p_path, content);
            } catch (e) { p_callback(e, p_path, null); }
        } else {
            fs.readFile(p_path, opts, (err, content) => { p_callback(err, p_path, content); });
        }
    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    RmDir(p_path, p_callback, p_options = null) {

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};
        opts.recursive = this._opt(opts, `recursive`);
        opts.force = this._opt(opts, `force`, true);

        if (this._sync) {
            try {
                fs.rmSync(p_path, opts);
                p_callback(null, p_path, true);
            } catch (e) { p_callback(e, p_path, false); }
        } else {
            fs.rm(p_path, opts, (err, p) => { p_callback(err, p_path, err ? false : true); })
        }

    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    Unlink(p_path, p_callback, p_options = null) {

        p_path = this._SanitizePath(p_path);

        if (this._sync) {
            try {
                fs.unlinkSync(p_path);
                p_callback(null, p_path, true);
            } catch (e) { p_callback(e, p_path, false); }
        } else {
            fs.unlink(p_path, (err) => { p_callback(err, p_path, err ? false : true); });
        }

    }

    /**
     * 
     * @param {string} p_path 
     * @param {*} p_data 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    WriteFile(p_path, p_data, p_callback, p_options = null) {



        p_path = this._SanitizePath(p_path);

        if (this._sync) {
            try {
                fs.writeFileSync(p_path, p_data, p_options);
                p_callback(null, p_path, true);
            } catch (e) { p_callback(e, p_path, false); }
        } else {
            //TODO Chain:
            // - make sure parent directory exists
            // - if not, check if option to recursively check exists
            // - if not, throw.
            // - if true, create directory
            // - once directory is created, finally write file.
            //fs.writeFile(p_path, p_data, p_options, (err) => { p_callback(err, p_path, true); });
            fs.writeFile(p_path, p_data, p_options, (err) => {
                if (err) {
                    let recursive = this._opt(p_options, `recursive`, this._recursive);
                    if (err.code == 'ENOENT' && recursive) {
                        fs.mkdir(path.dirname(p_path), { recursive: true }, (direrr) => {
                            if (direrr) { p_callback(direrr, p_path, false); } else {
                                fs.writeFile(p_path, p_data, p_options, (fserr) => {
                                    if (fserr) { p_callback(fserr, p_path, false); }
                                    else { p_callback(null, p_path, true); }
                                });
                            }
                        });
                    } else {
                        p_callback(err, p_path, false);
                    }
                } else {
                    p_callback(null, p_path, true);
                }

            });
        }

    }

    _CleanUp() {
        this._sync = false;
        super._CleanUp();
    }

}

module.exports = Transceiver_FS;