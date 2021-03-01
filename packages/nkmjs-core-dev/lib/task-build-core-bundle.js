'use strict';

const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const { minify } = require("terser");
const browserify = require('browserify');
const Bundler = require('./helpers/bundler');

class TaskBuildCoreBundle extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-core-bundle`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // TODO : Cache build of core library to speed up the process
        if (NKMjs.validProject) {
            new Bundler(
                "@nkmjs/core",
                NKMjs.InCore(`nkmjs-core.js`),
                NKMjs.InBuildRsc(`nkmjs-core.js`),
                NKMjs.InBuildRsc(`nkmjs-core-min.js`),
                this.End,
                this);
        } else {
            new Bundler(
                "@nkmjs/core",
                NKMjs.InCore(`nkmjs-core.js`),
                NKMjs.InCore(`bin/nkmjs-core.js`),
                NKMjs.InCore(`bin/nkmjs-core-min.js`),
                this.End,
                this);
        }

    }


}

module.exports = TaskBuildCoreBundle;