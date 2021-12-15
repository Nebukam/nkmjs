'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirRead = require(`./helpers/dir-read`);
const FileBackup = require('./helpers/file-backup');

/**
 * Pre-build style go through .scss files and replace
 * data-driven attributes with actual data.
 */

class TaskPreBuildStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`styles-pre-build`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.inputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.styleSource);

        this._backups = new FileBackup();
        NKMjs.Set(`styles-prebuild-backups`, this._backups);

        this._Bind(this._Prebuild);

        new DirRead(this.inputLocation, null, {
            '.scss': this._Prebuild
        });

        this.End();

    }

    _Prebuild(p_src) {
        let fileContent = fs.readFileSync(p_src, 'utf8');
        if (!fileContent.includes(`"<!nkm-- `)) { return; }

        if(!fileContent.includes(` -->"`)){
            this._logWarn(`Malformed instruction in ${NKMjs.Shorten(p_src)}`);
            return;
        }

        let splitContent = fileContent.split(`"<!nkm-- `),
            instructions = [],
            serials = {};

        splitContent.shift();

        for (let i = 0, n = splitContent.length; i < n; i++) {

            try {

                let argsList = splitContent[i].split(` -->"`)[0],
                    args = argsList.split(` `),
                    serial = `<!nkm-- ${argsList} -->`;

                if (serials[serial]) { continue; }

                instructions.push({
                    context: path.dirname(p_src),
                    serial: serial,
                    args: args,
                });

                serials[serial] = true;

            } catch (e) {}

        }

        if (instructions.length > 0) {

            let processedSomething = false;
            for (let i = 0, n = instructions.length; i < n; i++) {

                let conf = instructions[i],
                    value = this._ProcessInstruction(conf);

                if (value === null) { continue; }
                processedSomething = true;

                fileContent = fileContent.split(`"${conf.serial}"`).join(value);

            }

            if (processedSomething) {
                this._backups.Backup(p_src);
                fs.writeFileSync(p_src, fileContent);
            }

        }

    }

    _ProcessInstruction(conf) {

        try {

            var taskClass = require(`./scss-prebuild-tasks/task-${conf.args[0]}`),
                task = new taskClass(conf);

            return task.Process();

        } catch (e) {
            return null;
        }

    }

}

module.exports = TaskPreBuildStyles;