'use strict';
const { spawn } = require("child_process");
var { shell } = require('electron');
const fs = require(`fs`);
const path = require('path');

module.exports = {

    SIGNAL: require(`./lib/signal`),
    FSUTILS: require(`./lib/fs-util`),
    IOElectron: require(`./lib/io-electron`),
    /*
        FSIOReader: require(`./lib/io-processes/fs-io-reader`),
        FSIOWriter: require(`./lib/io-processes/fs-io-writer`),
        FSIORename: require(`./lib/io-processes/fs-io-rename`),
        FSIODelete: require(`./lib/io-processes/fs-io-delete`),
    */
    helpers: require(`./lib/helpers`),

    LaunchExternalEditor: (p_editorPath, p_targetPath, p_spawnOptions = null) => {

        try {
            p_editorPath = path.join(...p_editorPath.split(nkm.u.tils.DELIM_DIR));
            fs.statSync(p_editorPath);
        } catch (e) {
            console.error(`editor (${p_editorPath}) not found`);
            return;
        }

        try {
            p_targetPath = path.join(...p_targetPath.split(nkm.u.tils.DELIM_DIR));
            fs.statSync(p_editorPath);
        } catch (e) {
            console.error(`targetPath (${p_targetPath}) not found`);
            return;
        }

        let opts = p_spawnOptions ? { ...p_spawnOptions } : {};

        // Make sure the editor processes are detached from the Desktop app.
        // Otherwise, some editors (like Notepad++) will be killed when the
        // Desktop app is closed.
        opts.detached = true;

        //console.log(`Opening ${p_targetPath} using ${p_editorPath}`);
        spawn(p_editorPath, [`${p_targetPath.replaceAll('/', path.sep)}`], opts); //[`"${p_targetPath}"`]

    },

    OpenPath: (path) => {
        shell.openPath(path);
    },

    /**
     * 
     * @param {String} p_path 
     * @param {Function} p_fn (infos)
     * @param {Object} [p_options]
     * @param {Boolean} [p_options.filesOnly]
     * @param {Boolean} [p_options.dirOnly]
     * @param {Array} [p_options.include] list of '.ext' to include
     * @param {Array} [p_options.exclude] list of '.ext' to exclude
     * @param {Array} [p_options.ignore] list of 'name' to ignore
     * @returns 
     */
    ForEach: (p_path, p_fn, p_options = null) => {
        try {
            let
                basedir = nkm.u.FULL(p_path),
                stat = fs.statSync(basedir);

            if (!stat.isDirectory()) { return false; }

            let contents = fs.readdirSync(basedir);
            contents.forEach(entry => {
                try {

                    let
                        fullPath = path.join(basedir, entry),
                        cStat = fs.statSync(fullPath),
                        isFile = cStat.isFile(),
                        isDirectory = cStat.isDirectory();

                    if (p_options.filesOnly && !isFile) { return; }
                    if (p_options.dirOnly && !isDirectory) { return; }
                    if (isFile && (p_options.include || p_options.exclude)) {
                        let ext = path.extname(entry).toLowerCase();
                        if (p_options.include && !p_options.include.includes(ext)) { return; }
                        if (p_options.exclude && p_options.exclude.includes(ext)) { return; }
                    }
                    if (p_options.ignore && p_options.ignore.includes(entry)) { return; }

                    p_fn({
                        name: entry,
                        path: nkm.u.SHORT(fullPath),
                        isFile: isFile,
                        isDirectory: isDirectory
                    });

                } catch (e) {
                    console.error(e);
                }
            });

        } catch (e) {
            console.error(e);
            return false;
        }
    }

}
