'use strict';

const fs = require(`fs`);
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

    /**
     * 
     * @param {*} p_options
     * @param {string} p_options.module 
     * @param {string} p_options.input
     * @param {string} p_options.output
     * @param {function} p_options.done
     * @param {ScriptBase} p_options.script
     */
    constructor(p_options) {

        // Create a bundle file in the build folder
        this.moduleID = p_options.id;
        this.entryPoint = p_options.input;
        this.output = p_options.output;
        this.doneFn = p_options.done;
        this.script = p_options.script;
        this.define = p_options.define;

        this.shrinkMap = JSON.parse(fs.readFileSync(NKMjs.InCore(`configs`, `shrinkmap.json`), 'utf8'));

        // ----> Browserify

        this.script._logFwd(chalk.italic(`bundle ${this.moduleID}`), `·`, 1);
        this.script._logFwd(chalk.italic(`browserify ${this.moduleID}`), `|`, 1);

        this.externals = NKMjs.Get(`externals`, []);
        this.externalsRemap = NKMjs.Get(`externalsRemap`, {});
        this.shrinkMap = NKMjs.Get(`shrinkMap`, {});

        var b = browserify();
        b.add(this.entryPoint);

        for (let i = 0, n = this.externals.length; i < n; i++) {
            let id = this.externals[i];
            if (id == this.moduleID) { continue; }
            b.exclude(id);
        }
        /*
                b.transform(require("babelify"), {
                    presets: [NKMjs.InCoreModules('@babel/preset-env')],
                    plugins: [NKMjs.InCoreModules('@babel/plugin-proposal-class-properties')]});
        */
        this._OnBrowserifyied = this._OnBrowserifyied.bind(this);
        b.bundle(this._OnBrowserifyied);

    }

    _OnBrowserifyied(p_err, p_src) {

        // ----> Babel
        if (p_err) {
            this.script._logError(p_err);
            this.doneFn(this);
            return;
        }

        this.script._logFwd(chalk.italic(`babel » ${this.moduleID}`), `|`, 1);

        let babelPlugins = [];
        babelPlugins.push(NKMjs.InCoreModules('@babel/plugin-proposal-class-properties'));

        if (this.define) {
            babelPlugins.push([
                NKMjs.InCoreModules("babel-plugin-conditional-compilation"),
                this.define]);
        }

        let code = p_src.toString(),
            localBabelConfig = null,
            babelConfig = {
                compact: true,
                comments: false,
                presets: [[NKMjs.InCoreModules('@babel/preset-env'), {
                    targets: {
                        esmodules: true
                    }
                }]],
                plugins: babelPlugins
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
                    reserved: [`require`],
                    keep_classnames: true,
                    keep_fnames: true,
                    module: false,
                    toplevel: true,
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

        let transformed = this._ReplaceExternal(p_response.code);//this._ReplaceKeys(this._ReplaceExternal(p_response.code));
        //transformed = this._ShrinkRequires(transformed);
        transformed = transformed.replaceAll(`require`, `$r`);

        transformed = this._CleanArtifacts(transformed);

        NKMjs.WriteTempSync(this.output, transformed);
        this.script._logFwd(`${NKMjs.Shorten(this.output)}`, `+`, 1);

        this.doneFn(this);

    }

    _ReplaceExternal(p_content) {

        for (let i = 0, n = this.externals.length; i < n; i++) {
            let
                id = this.externals[i],
                index = id;//i;

            if (id === this.moduleID) { continue; }

            if (id in this.externalsRemap) {
                index = this.externalsRemap[id];//this.externals.indexOf(this.externalsRemap[id]);
            }

            p_content = p_content.replaceAll(`require("${id}")`, `globalThis.nkmdefs["${index}"]`);
            p_content = p_content.replaceAll(`"${id}":void 0`, ``);

        }

        return p_content;

    }

    _ShrinkRequires(p_content) {

        let
            reqs = p_content.split(`require("`),
            startIndex = Object.keys(this.shrinkMap).length;

        reqs.shift();

        for (const r of reqs) {
            let p = r.split(`")`)[0];
            if (p in this.shrinkMap) { continue; }
            this.shrinkMap[p] = startIndex++;
        };

        NKMjs.Set(`shrinkMap`, this.shrinkMap);

        for (var id in this.shrinkMap) {
            if (this.externals.includes(id) ||
                id == 'uuid' ||
                id == '_process' ||
                id == 'path') { continue; }
            p_content = p_content.replaceAll(`"${id}"`, `"_${this.shrinkMap[id]}"`);
        }

        return p_content;
    }

    _CleanArtifacts(p_content) {
        p_content = p_content.replaceAll(`{,`, `{`);
        p_content = p_content.replaceAll(`,,`, `,`);
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

        //p_content = p_content.split(`require`).join(`__r__`);

        let req = `__r__`;
        // Avoid replacing `require` in content strings by being nit-picky
        p_content = p_content.split(`require&&require`).join(`${req}&&${req}`);
        p_content = p_content.split(`require(`).join(`${req}(`);
        p_content = p_content.split(`(require,`).join(`(${req},`);

        for (let key in this.shrinkMap) {
            p_content = p_content.split(key).join(this.shrinkMap[key]);
        }

        return p_content;

    }

}

module.exports = Bundler;