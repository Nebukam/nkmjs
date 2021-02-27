'use strict';

const fs = require(`fs`);
const path = require(`path`);
const NKMjs = require(`../nkm.js`);
const chalk = require('chalk');
const { minify } = require("terser");
const browserify = require('browserify');
const sp = require('synchronized-promise');


/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 */

class Bundler {

    constructor(p_moduleID, p_in, p_out, p_outMin, p_doneFn, p_script) {


        // Create a bundle file in the build folder
        this.moduleID = p_moduleID;
        this.entryPoint = p_in;
        this.output = p_out;
        this.outputMin = p_outMin;
        this.doneFn = p_doneFn;
        this.script = p_script;

        this.shrinkMap = {};

        // ----> Browserify

        this.script._logFwd(chalk.italic(`bundle ${this.moduleID}`), `·`, 1);

        //this.script._logFwd(chalk.italic(`browserify ${NKMjs.Shorten(this.entryPoint)}`), `·`, 1);
        this.script._logFwd(chalk.italic(`browserify ${this.moduleID}`), `|`, 2);

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

        //this.script._logFwd(chalk.italic(`babel > ${NKMjs.Shorten(this.output)}`), `|`, 1);
        this.script._logFwd(chalk.italic(`babel > ${this.moduleID}`), `|`, 2);

        let localBabelConfig = null,
            babelConfig = {
                compact: true,
                comments: false,
                presets: [NKMjs.InCoreModules('@babel/preset-env')],
                plugins: [NKMjs.InCoreModules('@babel/plugin-proposal-class-properties')]
            };

        try { localBabelConfig = JSON.parse(fs.readFileSync(NKMjs.InProject(`babel.config.json`))); }
        catch (e) { }

        let babeled = require("@babel/core").transformSync(p_src.toString(), babelConfig);

        //this.script._logFwd(chalk.italic(`${NKMjs.Shorten(this.output)}`), `+`, 1);

        // ----> Terser / Minify

        //this.script._logFwd(chalk.italic(`terser > ${NKMjs.Shorten(this.outputMin)}`), `|`, 1);
        this.script._logFwd(chalk.italic(`terser > ${this.moduleID}`), `|`, 2);

        let localTerserConfig = null,
            terserConfig = {
                toplevel: true,
                parse: { bare_returns: true },
                mangle: {
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

        try { localTerserConfig = JSON.parse(fs.readFileSync(NKMjs.InProject(`terser.config.json`))); }
        catch (e) { }

        minify(babeled.code, terserConfig).then(this._OnTerseryfied.bind(this));

    }

    _OnTerseryfied(p_response) {

        this.script._logFwd(chalk.italic(`swap-externals > ${this.moduleID}`), `|`, 2);

        let transformed = this._ReplaceKeys(this._ReplaceExternal(p_response.code));

        NKMjs.WriteTempSync(this.outputMin, transformed);
        this.script._logFwd(`${NKMjs.Shorten(this.outputMin)}`, `+`, 2);

        this.doneFn(this);

    }

    //

    _ReplaceExternal(p_content) {

        for (let i = 0, n = this.externals.length; i < n; i++) {
            let id = this.externals[i];
            if (id === this.moduleID) { continue; }
            p_content = p_content.split(`t("${id}")`).join(`window.nkmjs[${i}]`);
            p_content = p_content.split(`"${id}":undefined`).join(``);
        }

        return p_content;

    }

    _ReplaceKeys(p_content) {

        let requireStart = p_content.split(`t("`), paths = [];
        requireStart.shift();

        for (let i = 0, n = requireStart.length; i < n; i++) {
            let requirePath = requireStart[i].split(`")`)[0], pass = true;
            if (p_content.indexOf(`"${requirePath}":`) === -1) { continue; } // Some imports are not mapped, skip these.
            if (!paths.includes(requirePath) && requirePath.length > 1) { paths.push(requirePath); } // isolate unique paths
        }

        for (let i = 0, n = paths.length; i < n; i++) {
            let A = `"${paths[i]}"`,
                B = `${i}`;
            p_content = p_content.split(A).join(B);
        }

        for (let key in this.shrinkMap) {
            //p_content = p_content.split(key).join(this.shrinkMap[key]);
        }

        return p_content;

    }

}

module.exports = Bundler;