'use strict';

const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const { minify } = require("terser");
const browserify = require('browserify');
const ReplaceVars = require(`./helpers/replace-vars`);
const Bundler = require('./helpers/bundler');

class TaskPrepareExternals extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-externals`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let externals = [];
        this._Push(NKMjs.coreConfigCompiled.externals, externals);
        this._Push(NKMjs.projectConfigCompiled.externals, externals);

        NKMjs.Set(`externals`, externals);

        this.End();

    }

    _Push(p_list, p_target) {
        if (!p_list) { return; }
        for (let i = 0, n = p_list.length; i < n; i++) {
            let item = p_list[i];
            if (!p_target.includes(item)) { p_target.push(item) };
        }
    }

}

module.exports = TaskPrepareExternals;