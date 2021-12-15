const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const FSUTILS = require(`./helpers/fsutils`);

class TaskTest extends ScriptBase {

    constructor(p_onComplete = null) {
        super(`nkmjs-test`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        FSUTILS.ensuredir(path.resolve(__dirname, `./tagada/tsoin/tsoin/prout`));

        this.End();

    }

}

module.exports = TaskTest;
