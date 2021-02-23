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


/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class TaskBuildCoreBundle extends ScriptBase {

    constructor() {

        super(`build-core-bundle`);
        if (this.__hasErrors) { return; }
        
        if(NKMjs.validProject){
            new Bundler(
                "@nkmjs/core",
                NKMjs.InCore(`nkmjs-core.js`),
                NKMjs.InBuilds(`nkmjs-core.js`), 
                NKMjs.InBuilds(`nkmjs-core-min.js`), 
                this._Bind(this._End),
                chalk.gray(`${this.Ind()}`));
        }else{
            new Bundler(
                "@nkmjs/core",
                NKMjs.InCore(`nkmjs-core.js`), 
                NKMjs.InCore(`bin/nkmjs-core.js`), 
                NKMjs.InCore(`bin/nkmjs-core-min.js`), 
                this._Bind(this._End),
                chalk.gray(`${this.Ind()}`));
        }

    }

    _End(p_bundler){

    }

}

new TaskBuildCoreBundle();