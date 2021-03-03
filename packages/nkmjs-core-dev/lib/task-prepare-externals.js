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

        this.externals = [];
        this.exclusions = [];
        this._Push(NKMjs.coreConfig.externals);
        this._Push(NKMjs.projectConfig.externals);

        for (let i = 0, n = this.exclusions.length; i < n; i++) {
            let rem = this.exclusions[i],
                index = this.externals.indexOf(rem);
            if (index != -1) { this.externals.splice(index, 1); }
        }

        NKMjs.Set(`externals`, this.externals);

        this.End();

    }

    _Push(p_list) {
        if (!p_list) { return; }
        for (let i = 0, n = p_list.length; i < n; i++) {
            let item = p_list[i];
            if (item[0] === `!`) { this.exclusions.push(item.substr(1)); }
            else if (!this.externals.includes(item)) { this.externals.push(item) };
        }
    }

}

module.exports = TaskPrepareExternals;