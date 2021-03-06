'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirRead = require(`./helpers/dir-read`);
const sass = require('sass');

class TaskBuildStyles extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`styles-build`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.inputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.styleSource);
        this.outputLocation = NKMjs.InApp(NKMjs.projectConfig.dirs.style);

        try { fs.statSync(this.inputLocation); }
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
            'dir': (p_src, p_dest) => { if (!fs.existsSync(p_dest)) { fs.mkdirSync(p_dest); } },
            '.scss': (p_src, p_dest) => {

                let fname = path.basename(p_dest).split(`.`)[0];

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
                fs.copyFileSync(p_src, p_dest);
            }

        });

        this.End();

    }

}

module.exports = TaskBuildStyles;