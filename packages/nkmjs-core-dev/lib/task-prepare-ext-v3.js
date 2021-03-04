const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const TaskPrepareExtBase = require('./task-prepare-ext-base');

class TaskPrepareExtBaseV3 extends TaskPrepareExtBase {

    constructor(p_onComplete = null) {

        super(`prepare-ext-v3`, [], p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

    }

    OnPreparationComplete(){
        super.OnPreparationComplete();
        this.End();
    }

}

module.exports = TaskPrepareExtBaseV3;