const path = require(`path`);
const DirRead = require("../helpers/dir-read");
const PrebuildTaskBase = require("./prebuild-task-base");

class TaskListFiles extends PrebuildTaskBase {
    constructor(conf) { super(conf); }

    Process() {
        let dirs = this._args[0].split(`,`),
            exts = null;
        if (this._args.length > 1) {
            exts = this._args[1].split(`,`);
            if (exts.length === 0) { exts = null; }
        }

        var paths = [];
        for (let i = 0, n = dirs.length; i < n; i++) {
            new DirRead(path.resolve(this._conf.context, dirs[i]), null, {
                'anyFile': (p_src) => {
                    paths.push(this.Relative(p_src, true).split(`./`).join(``));
                }
            });
        }

        let value = ``, index = 0;

        for (let i = 0, n = paths.length; i < n; i++) {
            let p = paths[i];
            if (exts != null && !exts.includes(path.extname(p))) { continue; }

            if (index != 0) { value += `, `; index++; }

            if (this._argv.Has(`name-only`)) {
                let bname = path.basename(p),
                    bnameSplit = bname.split(`.`);
                if (bnameSplit.length > 1) {
                    bnameSplit.pop();
                    bname = bnameSplit.join(`.`);
                }

                value += `"${bname}"`;
            } else {
                value += `"${p}"`;
            }
        }

        return value;

    }

}

module.exports = TaskListFiles;