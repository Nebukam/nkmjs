const nkm = require(`@nkmjs/core/nkmserver`);

class Transceiver extends nkm.io.Transceiver {
    constructor() { super(); }

    Start(p_options = null) {
        if (!super.Start(p_options)) { return false; }
        //Read/write CORS configuration for this bucket
        setTimeout(() => { this._OnStarted(); }, 100); //Obviously not
        return true;
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

}

module.exports = Transceiver;