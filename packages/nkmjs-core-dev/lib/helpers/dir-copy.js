'use strict';

const { UV_FS_O_FILEMAP } = require("constants");
const fs = require(`fs`);
const path = require(`path`);

class DirCopy {


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
    constructor(p_src, p_dest, p_callbacks, p_replace = false, p_appendArray = null, p_canAppendFn = null) {

        this._sourceRoot = p_src;
        this._destRoot = p_dest;
        this._callbacks = p_callbacks;
        this._replace = p_replace;
        this._appendArray = p_appendArray;
        this._canAppend = p_canAppendFn;

        this._Copy(p_src, p_dest);

    }

    _Copy(p_src, p_dest) {

        let srcStat = null, destStat = null;

        try {
            srcStat = fs.statSync(p_src);
            p_dest = this._validate(p_src, p_dest, srcStat.isDirectory());
            if (!p_dest) { return; }
        } catch (e) {
            return;
        };

        try { destStat = fs.statSync(p_dest) } catch (e) { };

        if (srcStat.isDirectory()) {

            if (!destStat) { fs.mkdirSync(p_dest); }
            let srcContent = fs.readdirSync(p_src), item;
            for (let i = 0, n = srcContent.length; i < n; i++) {
                item = srcContent[i];
                this._Copy(
                    path.resolve(p_src, item),
                    path.resolve(p_dest, item)
                );
            }

        } else {
            if (!destStat || this._replace) { //Only copy if does not exists

                let canAppend = !!this._appendArray;
                if (canAppend && this._canAppend) { canAppend = this._canAppend(p_dest, p_src); }

                if (canAppend) {

                    if (this._appendArray.includes(p_dest)) {

                        if (typeof canAppend === `function`) {
                            try {
                                let merged = canAppend(p_dest, p_src);
                                if(merged){ fs.writeFileSync(p_dest, merged); }
                            } catch (e) { }
                            return;
                        }

                        let data = fs.readFileSync(p_src);

                        try {
                            let existingData = fs.readFileSync(p_dest);
                            if (existingData.includes(data)) { return; }
                        } catch (e) { }

                        fs.appendFileSync(p_dest, data);
                        //console.log(`   MERGED IN > ${p_dest}`);
                        return;
                    } else {
                        this._appendArray.push(p_dest);
                    }
                }

                fs.copyFileSync(p_src, p_dest);

            }
        }


    }

    _validate(p_src, p_dest, p_isDir) {

        let pass = p_dest;

        if (p_isDir) {
            if (`dir` in this._callbacks) {
                pass = this._callbacks.dir(p_src, p_dest, p_isDir);
                if (!pass) { return false; }
            }
        } else {
            let ext = path.extname(p_src);
            if (ext in this._callbacks) {
                pass = this._callbacks[ext](p_src, p_dest, p_isDir);
                if (!pass) { return false; }
            } else if (`else` in this._callbacks) {
                pass = this._callbacks.else(p_src, p_dest, p_isDir);
                if (!pass) { return false; }
            }

            if (`anyFile` in this._callbacks) {
                pass = this._callbacks.anyFile(p_src, p_dest, p_isDir);
                if (!pass) { return false; }
            }
        }

        if ('any' in this._callbacks) {
            pass = this._callbacks.any(p_src, p_dest, p_isDir);
            if (!pass) { return false; }
        }

        return pass;

    }

}

module.exports = DirCopy;