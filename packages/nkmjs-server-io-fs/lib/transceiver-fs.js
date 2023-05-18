const nkm = require(`@nkmjs/core/nkmserver`);
const { rejects } = require("assert");
const fs = require(`fs`);
const fsPromises = require(`fs`).promises;
const path = require(`path`);

const base = nkm.io.Transceiver;
class Transceiver_FS extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base);

    _Init() {
        super._Init();
        this._prependRoot = true;
    }

    Start(p_options = null) {
        if (!super.Start(p_options)) { return false; }
        this._OnStarted();
        return true;
    }

    _SanitizePath(p_path) {
        let sanitized = super._SanitizePath(p_path);
        return path.join(sanitized);
    }

    async CreateReadStream(p_path, p_options = null) { throw new Error(__noImplemented); }

    async CreateWriteStream(p_path, p_options = null) { throw new Error(__noImplemented); }

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
    async Exists(p_path, p_callback) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        fsPromises.stat(p_path).then(
            stats => { p_callback(null, p_path, true); },
            err => { p_callback(err, p_path, false); }
        );

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
    async Stat(p_path, p_callback) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        fsPromises.stat(p_path).then(
            stats => { p_callback(null, p_path, true); },
            err => { p_callback(err, p_path, false); }
        );

    }

    /**
     * 
     * @param {*} p_path 
     * @param {*} p_newPath 
     * @param {*} p_callback 
     * @param {*} p_options 
     */
    async Rename(p_path, p_newPath, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        fsPromises.rename(p_path, p_newPath).then(
            stats => { p_callback(null, p_path, true); },
            err => { p_callback(err, p_path, false); }
        );

    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    async MkDir(p_path, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};
        opts.recursive = this._opt(opts, `recursive`);

        fsPromises.mkdir(p_path, opts).then(
            () => { p_callback(null, p_path, true); },
            err => { p_callback(err, p_path, false); }
        );

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
    async ReadDir(p_path, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};

        fsPromises.readdir(p_path).then(
            (content) => {

                Promise.all(content.map(fname => { return fsPromises.stat(this.Join(fname)); })).then(
                    (stats) => {
                        let results = { files: [], directories: [] };
                        for (let i = 0, n = stats.length; i < n; i++) {
                            let targetArray = stats[i].isDirectory() ? results.directories : results.files;
                            targetArray.push(content[i]);
                        }
                        p_callback(null, p_path, results);
                    },
                    err => {
                        p_callback(err, p_path, null);
                    }
                );
            },
            (err) => { p_callback(err, p_path, null); }
        );

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
    async ReadFile(p_path, p_callback, p_options = null) {

        if (this._rateLimit) { let tokensLeft = await this._rateLimit.removeTokens(1); }



        p_path = this._SanitizePath(p_path);

        let
            encoding = p_options?.encoding || 'utf-8',
            err = null;

        fsPromises.readFile(p_path, encoding).then(
            (data) => { p_callback(null, p_path, data); },
            (err) => { p_callback(err, p_path, null); }
        );

    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    async RmDir(p_path, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        let opts = p_options || {};
        opts.recursive = this._opt(opts, `recursive`);
        opts.force = this._opt(opts, `force`, true);

        fsPromises.rm(p_path, opts).then(
            () => { p_callback(null, p_path, true); },
            (err) => { p_callback(err, p_path, false); }
        );

    }

    /**
     * 
     * @param {string} p_path 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    async Unlink(p_path, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        fsPromises.unlink(p_path).then(
            () => { p_callback(null, p_path, true); },
            (err) => { p_callback(err, p_path, false); }
        );

    }

    /**
     * 
     * @param {string} p_path 
     * @param {*} p_data 
     * @param {boolCallback} p_callback 
     * @param {*} p_options 
     */
    async WriteFile(p_path, p_data, p_callback, p_options = null) {

        if (this._rateLimit) { await this._rateLimit.removeTokens(1); }

        p_path = this._SanitizePath(p_path);

        fsPromises.writeFile(p_path, p_data, p_options).then(
            () => { p_callback(null, p_path, true); },
            (err) => {
                let recursive = this._opt(p_options, `recursive`, this._recursive);
                if (err.code == 'ENOENT' && recursive) {
                    fsPromises.mkdir(path.dirname(p_path), { recursive: true }).then(
                        () => {
                            fsPromises.writeFile(p_path, p_data, p_options).then(
                                () => { p_callback(null, p_path, true); },
                                (err) => { p_callback(err, p_path, false); }
                            );
                        },
                        (err) => { console.log(err); }
                    )
                } else { throw err; }
            }
        );

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = Transceiver_FS;