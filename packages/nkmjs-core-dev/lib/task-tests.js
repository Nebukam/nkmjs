const { exec, execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require(`./helpers/fsutils`);

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 * @class
 * @augments ScriptBase
 */
class TaskTest extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`nkmjs-test`, null, null, p_onComplete);
        if (this.__hasErrors) { return this.End(); }

        FSUTILS.ensuredir(path.resolve(__dirname, `./tagada/tsoin/tsoin/prout`));

        this.End();

    }

}

module.exports = TaskTest;
