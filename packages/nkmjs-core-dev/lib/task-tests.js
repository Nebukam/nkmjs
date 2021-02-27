const { exec, execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require(`./helpers/fsutils`);

class TaskTest extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`nkmjs-test`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        FSUTILS.ensuredir(path.resolve(__dirname, `./tagada/tsoin/tsoin/prout`));

        this.End();

    }

}

module.exports = TaskTest;
