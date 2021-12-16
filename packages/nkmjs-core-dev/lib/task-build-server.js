'use strict';

const fs = require(`fs`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const builder = require(`electron-builder`);
const FileBackup = require('./helpers/file-backup');
const FSUTILS = require('./helpers/fsutils');
const DirCopy = require('./helpers/dir-copy');

class TaskBuildServer extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-server`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let configs = [...NKMjs.Get(`buildconf-server`, [])];
        if (configs.length == 0) {
            this._logWarn(`Build server executed but not server config present.`);
            this.End();
        }

        this._Bind(this.Entry);

        this._log(`server-builder » ${configs[0].platform}`);

        this.Run([
            `./task-extract-build-configs`
        ], this._Bind(this._CopySources));

    }

    _CopySources() {

        let
            srcDirName = NKMjs.projectConfig.dirs[`src-server`],
            output = NKMjs.InVersionedBuilds(`server`),
            outputSrc = NKMjs.InVersionedBuilds(`server`, srcDirName);

        try { FSUTILS.rmdir(output); } catch (e) { }
        FSUTILS.ensuredir(output);

        try { FSUTILS.rmdir(outputSrc); } catch (e) { }
        FSUTILS.ensuredir(outputSrc);

        //Copy source files to output location
        new DirCopy(NKMjs.InApp(srcDirName), outputSrc, { 'any': this.Entry });

        this.Run(`./task-build-server-main`, this._Bind(this.End));

    }

    Entry(p_src, p_dest, p_isDir) {
        return p_dest;
    }

}

module.exports = TaskBuildServer;