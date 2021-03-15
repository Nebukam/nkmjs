'use strict';

const io = require(`@nkmjs/io-core`);
const fs = require('fs');
const path = require('path');


class FSUTIL {

    static DeleteDirContent(p_path, stats = null) {

        if (!stats) {
            try { stats = fs.statSync(p_path); } catch (err) { return; }
        }

        if (!stats.isDirectory()) { return; }

        let content = fs.readdirSync(p_path, io.ENCODING.UTF8);
        for (let i = 0, n = content.length; i < n; i++) {
            FSUTIL.Delete(path.join(p_path, content[i]));
        }

    }

    static Delete(p_path) {
        let stats = null;
        try { stats = fs.statSync(p_path); } catch (err) { return; }

        if (stats.isDirectory()) {
            FSUTIL.DeleteDirContent(p_path, stats);
            fs.rmdirSync(p_path, (e) => { if (e) { console.error(`FS ERROR : ${e.message}`); } });
        } else if (stats.isFile()) {
            fs.unlinkSync(p_path);
        }
    }

    static Rename(p_oldPath, p_newPath) {
        fs.renameSync(p_oldPath, p_newPath);
    }

    static mkDirByPathSync(p_path, p_relativeToScript = false, p_callback = null) {
        
        let sep = '/',
            initDir = path.isAbsolute(p_path) ? sep : '',
            baseDir = p_relativeToScript ? __dirname : '.',
            result = null;

        try {
            let pathsplt = p_path.split(sep);
            result = pathsplt.reduce((parentDir, childDir) => {

                let curDir = path.resolve(baseDir, parentDir, childDir);
                try {
                    fs.mkdirSync(curDir);
                } catch (err) {

                    if (err.code === 'EEXIST') { // curDir already exists!
                        return curDir;
                    }

                    // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                    if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                        throw new Error(`ENOENT: permission denied, mkdir '${parentDir}' ('${p_path}' / ${pathsplt})`);
                    }

                    let caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                    if (!caughtErr || caughtErr && curDir === path.resolve(p_path)) {
                        throw err; // Throw if it's just the last created dir.
                    }

                }

                return curDir;
            }, initDir);
        } catch (err) {
            result = null;
            if (p_callback) {
                p_callback(err);
            } else {
                throw err;
            }
        }

        if (result) {
            if (p_callback) { p_callback(); }
        }

    }
}

module.exports = FSUTIL;