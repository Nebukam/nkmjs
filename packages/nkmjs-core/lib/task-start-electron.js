const { exec, execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

/**
 * the BuildIndex script output an index.html at a specified location.
 * It requires a default nkmjs-theme to be set in order to create link-rel for each css file
 * and delay the page 'onDomComplete' until all css files are loaded and cached, hence avoiding the style flickr
 * @class
 * @augments ScriptBase
 */
class TaskStartElectron extends ScriptBase {

    constructor() {

        super(`start-electron`);
        if (this.__hasErrors) { return; }

        this.Run(`./task-build-styles`);
        this.Run(`./task-build-electron-html-index`);
        this.Run(`./task-build-electron-entry-point`);


        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT);

        let cos = chalk.gray(`${this.Ind()}`);
        console.log(cos + chalk.green(`· `) + chalk.gray.italic(`electron ${electronEntry}`));
        //execSync(`electron ${electronEntry}`);
        //console.log(cos + chalk.cyan(`· `) + chalk.gray(`end : ${result}`));

        let ls = exec(`node ${NKMjs.InCoreModules(`electron/cli.js`)} ${electronEntry}`); //electron
        ls.stdout.on('data', function (data) { console.log(data.toString()); });
        ls.stderr.on('data', function (data) { console.log(chalk.redBright(data.toString())); });
        ls.on('exit', this._Bind(this._End));

    }

    _End(code) {

        console.log('child process exited with code ' + code.toString());

        if(!(`clean` in NKMjs.shortargs)){ return; }

        let indexHtml = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
            indexJS = NKMjs.InApp(NKMjs.ELECTRON_HTML_INDEX);

        try {
            fs.unlinkSync(indexHtml);
            fs.unlinkSync(indexJS);
        } catch (e) { }

    }

}

new TaskStartElectron();
