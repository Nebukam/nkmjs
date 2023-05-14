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
        this.externalsRemap = {};
        this.exclusions = [];
        this._Push(NKMjs.coreConfig.externals);
        this._Push(NKMjs.projectConfig.externals);

        this._PushRemap(NKMjs.coreConfig.externalsRemap);
        this._PushRemap(NKMjs.projectConfig.externalsRemap);

        for (let i = 0, n = this.exclusions.length; i < n; i++) {
            let rem = this.exclusions[i],
                index = this.externals.indexOf(rem);
            if (index != -1) { this.externals.splice(index, 1); }
        }

        NKMjs.Set(`externals`, this.externals);
        NKMjs.Set(`externalsRemap`, this.externalsRemap);

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

    _PushRemap(p_object) {
        if (!p_object) { return; }
        for (let src in p_object) { this.externalsRemap[src] = p_object[src]; }
    }

}

module.exports = TaskPrepareExternals;