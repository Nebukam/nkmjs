'use strict';
const { spawn } = require("child_process");
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

        console.log(`Opening ${p_targetPath} using ${p_editorPath}`);
        spawn(p_editorPath, [`"${p_targetPath}"`], opts);

    }

}
