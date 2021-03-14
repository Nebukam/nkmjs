'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirRead = require(`./helpers/dir-read`);
const SwapURLtoURI = require(`./helpers/swap-url-to-uri`);
const sass = require('sass');
const csso = require('csso');

class TaskBuildStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`styles-build`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this._Inline);

        this.deleteInlinedURI = NKMjs.shortargs.Get(`delete-inlined-files`, true);

        this.inputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.styleSource);
        this.outputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.style);
        this._inlinedPaths = [];

        try {
            fs.statSync(this.inputLocation);
            this.Run([
                `./task-styles-pre-build`
            ], this._Bind(this.Build));
        }
        catch (e) {
            NKMjs.shortargs.replace = true;
            NKMjs.shortargs.append = true;
            this.Run([
                `./task-styles-fetch`,
                `./task-styles-pre-build`
            ], this._Bind(this.Build));
        }

    }

    Build() {

        var compress = NKMjs.shortargs.Get(`compress`, true);

        this._log(`--compress : ${chalk.blue(compress)}`, 1);
        this._log(`--delete-inlined-files : ${chalk.blue(this.deleteInlinedURI)}`, 1);

        new DirRead(this.inputLocation, this.outputLocation, {
            'dir': (p_src, p_dest) => {
                if (path.basename(p_dest)[0] === `_`) { return; }
                if (!fs.existsSync(p_dest)) { fs.mkdirSync(p_dest); }
            },
            '.scss': (p_src, p_dest) => {

                let fname = path.basename(p_dest),
                    fnameSplit = fname.split(`.`);

                fnameSplit.pop();
                fname = fnameSplit.join(`.`); // remove extension

                if (fname[0] === `_`) { return; }

                let fdir = path.dirname(p_dest),
                    p_options = { file: p_src };

                p_dest = path.resolve(fdir, `${fname}.css`);

                if (compress) { p_options.outputStyle = `compressed`; }

                try {
                    let result = sass.renderSync(p_options);
                    if (fs.existsSync(p_dest)) { fs.unlinkSync(p_dest); }

                    fs.writeFileSync(p_dest, result.css);
                    this._logFwd(NKMjs.Shorten(p_dest), `+`);
                } catch (e) {
                    console.log(e);
                }
            },
            '.css': (p_src, p_dest) => {
                fs.copyFileSync(p_src, p_dest);
            },
            'else': (p_src, p_dest) => {
                if (path.basename(p_dest)[0] === `_`) { return; }
                fs.copyFileSync(p_src, p_dest);
            }

        });

        //

        let prebuildBackups = NKMjs.Get(`styles-prebuild-backups`, null);
        if (prebuildBackups) { prebuildBackups.Restore(); }


        // Go through each theme folder, looking for a _config.json

        try {
            let dirContent = fs.readdirSync(this.outputLocation);
            for (let i = 0, n = dirContent.length; i < n; i++) {
                let d = dirContent[i],
                    scoutedDir = path.resolve(this.inputLocation, d),
                    targetDir = path.resolve(this.outputLocation, d),
                    configPath = path.resolve(scoutedDir, `_config.json`);

                try {
                    let config = JSON.parse(fs.readFileSync(configPath));
                    if (config && config.inline) {
                        this.inlineConf = config.inline;
                        new DirRead(targetDir, null, { '.css': this._Inline });
                    }
                } catch (e) { this._logError(e); }
            }
        } catch (e) { }

        if (this.deleteInlinedURI && SwapURLtoURI.seen) {
            for (let key in SwapURLtoURI.seen) {
                if (SwapURLtoURI.seen[key] !== null) {
                    try { fs.unlinkSync(key); } catch (e) { console.log(e); }
                }
            }
        }

        SwapURLtoURI.seen = {};

        // CSS Optimizer pass

        if (compress) {
            try {
                new DirRead(this.outputLocation, null, {
                    '.css': (p_src) => {
                        fs.writeFileSync(p_src, csso.minify(fs.readFileSync(p_src, 'utf8')).css);
                    }
                });
            } catch (e) { }
        }

        this.End();

    }

    _Inline(p_dest) {
        new SwapURLtoURI(p_dest, {
            inline: this.inlineConf,
            done: (p_filePath, p_content) => {
                fs.writeFileSync(p_filePath, p_content);
            },
        });
    }

}

module.exports = TaskBuildStyles;