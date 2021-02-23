'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require('chalk');
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

const DirRead = require(`./helpers/dir-read`);
const sass = require('sass');

class TaskBuildStyles extends ScriptBase {

    constructor() {

        super(`task-build-styles`);
        if (this.__hasErrors) { return; }

        if(NKMjs.style_built){
            console.log(chalk.gray(`${this.Ind()}`) + chalk.green(`>> `) + `Style already built, skipping.`);
            return;
        }

        let inputLocation = this.Resolve(NKMjs.projectConfigCompiled.style_location),
            outputLocation = this.Resolve(NKMjs.projectConfigCompiled.compiled_style_location),
            compress = NKMjs.shortargs.compress ? true : false,
            cos = chalk.gray(`${this.Ind()}`);

        console.log(``);
        NKMjs.style_built = true;

        new DirRead(inputLocation, outputLocation, {
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
                    console.log(cos + chalk.green(`+ `) + chalk.gray.italic(NKMjs.Shorten(p_dest)));
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

        console.log(``);

    }

}

new TaskBuildStyles();