const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskBuildWebmanifest extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-webmanifest`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.End();

    }

}

module.exports = TaskBuildWebmanifest;