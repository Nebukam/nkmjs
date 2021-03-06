'use strict';

const fs = require(`fs`);
const path = require(`path`);
const NKMjs = require(`../nkm.js`);
const chalk = require('chalk');
const { minify } = require("terser");
const browserify = require('browserify');


/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class Bundler {

    constructor(p_moduleID, p_in, p_out, p_doneFn, p_script) {


        // Create a bundle file in the build folder
        this.moduleID = p_moduleID;
        this.entryPoint = p_in;
        this.output = p_out;
        this.doneFn = p_doneFn;
        this.script = p_script;

        this.shrinkMap = {};

        // ----> Browserify

        this.script._logFwd(chalk.italic(`bundle ${this.moduleID}`), `·`, 1);
        this.script._logFwd(chalk.italic(`browserify ${this.moduleID}`), `|`, 1);

        this.externals = NKMjs.Get(`externals`, []);

        var b = browserify();
        b.add(this.entryPoint);

        for (let i = 0, n = this.externals.length; i < n; i++) {
            let id = this.externals[i];
            if (id == this.moduleID) { continue; }
            b.exclude(id);
        }

        b.bundle(this._OnBrowserifyied.bind(this));

    }

    _OnBrowserifyied(p_err, p_src) {

        // ----> Babel
        if (p_err) {
            this.script._logErr(p_err);
            this.doneFn(this);
            return;
        }



        this.script._logFwd(chalk.italic(`babel » ${this.moduleID}`), `|`, 1);

        let code = p_src.toString(),
            localBabelConfig = null,
            babelConfig = {
                compact: true,
                comments: false,
                presets: [NKMjs.InCoreModules('@babel/preset-env')],
                plugins: [NKMjs.InCoreModules('@babel/plugin-proposal-class-properties')]
            };

        try { localBabelConfig = JSON.parse(fs.readFileSync(NKMjs.InProject(`babel.config.json`))); } catch (e) { }

        let babeled = require("@babel/core").transformSync(code, babelConfig);

        // ----> Terser / Minify

        this.script._logFwd(chalk.italic(`terser » ${this.moduleID}`), `|`, 1);

        let localTerserConfig = null,
            terserConfig = {
                toplevel: true,
                parse: { bare_returns: true },
                mangle: {
                    reserved:[`require`],
                    //keep_classnames : true,
                    keep_fnames: true,
                    //module : true,
                    //toplevel : true,
                },
                compress: {
                    defaults: true,
                    unused: false,
                },
            };

        try { localTerserConfig = JSON.parse(fs.readFileSync(NKMjs.InProject(`terser.config.json`))); } catch (e) { }

        minify(babeled.code, terserConfig).then(this._OnTerseryfied.bind(this));

    }

    _OnTerseryfied(p_response) {

        this.script._logFwd(chalk.italic(`swap-externals » ${this.moduleID}`), `|`, 1);

        let transformed = this._ReplaceKeys(this._ReplaceExternal(p_response.code));

        NKMjs.WriteTempSync(this.output, transformed);
        this.script._logFwd(`${NKMjs.Shorten(this.output)}`, `+`, 1);

        this.doneFn(this);

    }

    _ReplaceExternal(p_content) {

        for (let i = 0, n = this.externals.length; i < n; i++) {
            let id = this.externals[i];
            if (id === this.moduleID) { continue; }
            p_content = p_content.split(`require("${id}")`).join(`window.nkmjs[${i}]`);
            p_content = p_content.split(`"${id}":void 0`).join(``);
        }

        return p_content;

    }

    _ReplaceKeys(p_content) {

        let requireStart = p_content.split(`require("`),
            paths = [];
        requireStart.shift();

        for (let i = 0, n = requireStart.length; i < n; i++) {
            let requirePath = requireStart[i].split(`")`)[0],
                pass = true;
            if (p_content.indexOf(`"${requirePath}":`) === -1) { continue; } // Some imports are not mapped, skip these.
            if (!paths.includes(requirePath) && requirePath.length > 1) { paths.push(requirePath); } // isolate unique paths
        }

        for (let i = 0, n = paths.length; i < n; i++) {
            let A = `"${paths[i]}"`,
                B = `${i}`;
            p_content = p_content.split(A).join(B);
        }

        p_content = p_content.split(`require`).join(`__r__`);

        for (let key in this.shrinkMap) {
            //p_content = p_content.split(key).join(this.shrinkMap[key]);
        }

        return p_content;

    }

}

module.exports = Bundler;