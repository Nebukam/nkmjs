const u = require("@nkmjs/utils");
const path = require(`path`);

class PrebuildTaskBase {
    constructor(conf) {
        this._conf = conf;
        this._args = [...conf.args];
        this._args.shift(); // remove task name
        this._argv = new u.Argv(this._args);
    }

    Relative(p_path, p_sanitize = false) {
        let relativePath = ``;

        if (p_sanitize) {
            relativePath = p_path.split(this._conf.context).join(`.`).split(path.sep).join(`/`);
        } else {
            relativePath = p_path.split(this._conf.context).join(``);
        }

        return relativePath;
    }

    Process() {
        return null;
    }

}

module.exports = PrebuildTaskBase;