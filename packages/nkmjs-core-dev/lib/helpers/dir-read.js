'use strict';

const { UV_FS_O_FILEMAP } = require("constants");
const fs = require(`fs`);
const path = require(`path`);

class DirRead {


    /**
     * 
     * @param {*} p_src 
     * @param {*} p_dest 
     * @param {*} p_callbacks 
     * @param {*} p_callbacks.ext = fn ( p_src, p_dest, p_isDir )
     * @param {*} p_callbacks.dir = fn ( p_src, p_dest, p_isDir )
     * @param {*} p_callbacks.any = fn ( p_src, p_dest, p_isDir )
     * @param {*} p_callbacks.anyFile = fn ( p_src, p_dest, p_isDir )
     * @param {*} p_callbacks.else = fn ( p_src, p_dest, p_isDir ) //if neither dir or ext was found
     */
    constructor(p_src, p_dest, p_callbacks) {

        this._sourceRoot = p_src;
        this._destRoot = p_dest;
        this._callbacks = p_callbacks;

        this._Read(p_src, p_dest);

    }

    _Read(p_src, p_dest) {

        let srcStat;

        try {
            srcStat = fs.statSync(p_src);
        } catch (e) {
            return;
        };

        if (srcStat.isDirectory()) {
            this._callback(p_src, p_dest, true);
            let srcContent = fs.readdirSync(p_src);
            for (let i = 0, n = srcContent.length; i < n; i++) {
                this._Read( path.resolve(p_src, srcContent[i]), path.resolve(p_dest, srcContent[i]) );
            }
        } else {
            this._callback(p_src, p_dest, false);
        }


    }

    _callback(p_path, p_dest, p_isDir) {

        if (p_isDir) {
            if (`dir` in this._callbacks) {
                this._callbacks.dir(p_path, p_dest, p_isDir);
            }
        } else {
            let ext = path.extname(p_path);
            if (ext in this._callbacks) {
                this._callbacks[ext](p_path, p_dest, p_isDir);
            } else if (`else` in this._callbacks) {
                this._callbacks.else(p_path, p_dest, p_isDir);
            }

            if (`anyFile` in this._callbacks) {
                this._callbacks.anyFile(p_path, p_dest, p_isDir);
            }
        }

        if ('any' in this._callbacks) {
            this._callbacks.any(p_path, p_dest, p_isDir);
        }

    }

}

module.exports = DirRead;