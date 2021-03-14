'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirRead = require(`./helpers/dir-read`);
const SwapURLtoURI = require(`./helpers/swap-url-to-uri`);
const sass = require('sass');

class TaskBuildStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`styles-build`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.inputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.styleSource);
        this.outputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.style);

        try {
            fs.statSync(this.inputLocation);
            this.Build();
        }
        catch (e) {
            NKMjs.shortargs.replace = true;
            NKMjs.shortargs.append = true;
            this.Run(`./task-styles-fetch`, this._Bind(this.Build));
        }

    }

    Build() {

        var compress = NKMjs.shortargs.Get(`compress`, true);

        this._log(`--compress : ${chalk.blue(compress)}`, 1);

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

        // Go through each sub-folder, looking for a _config.json

        try {
            let dirContent = fs.readdirSync(this.outputLocation);
            for (let i = 0, n = dirContent.length; i < n; i++) {
                let d = dirContent[i],
                    scoutedDir = path.resolve(this.inputLocation, d),
                    targetDir = path.resolve(this.outputLocation, d),
                    configPath = path.resolve(scoutedDir, `_config.json`);

                try {
                    let config = JSON.parse(fs.readFileSync(configPath));
                    if (config) {
                        if (config.inlineURLs) {
                            new DirRead(targetDir, null, {
                                '.css': (p_dest) => {
                                    new SwapURLtoURI(p_dest, (p_filePath, p_content) => {
                                        fs.writeFileSync(p_filePath, p_content);
                                    });
                                }
                            });
                        }
                    }
                } catch (e) { this._logError(e); }
            }
        } catch (e) { }

        this.End();

    }

}

module.exports = TaskBuildStyles;