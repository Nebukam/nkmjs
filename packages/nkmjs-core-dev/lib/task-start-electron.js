const { exec, execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');

class TaskStartElectron extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`start-electron`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return; }

        this.Run([
            `./task-build-styles`,
            `./task-build-electron-html-index`,
            `./task-build-electron-entry-point`
        ], this._Bind(this.Start));

    }

    Start() {

        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT);

        this._logFwd(chalk.gray.italic(`electron ${electronEntry}`), `·`);

        let ls = exec(`node ${NKMjs.InCoreModules(`electron/cli.js`)} ${electronEntry}`); //electron
        ls.stdout.on('data', function (data) { console.log(data.toString()); });
        ls.stderr.on('data', function (data) { console.log(chalk.redBright(data.toString())); });
        ls.on('exit', this._Bind(this._OnElectronExit));

    }

    _OnElectronExit(code) {
        this._logFwd(`electron exited with code ${code !== 0 ? chalk.yellow(code) : chalk.green(code)}`);
        this.End();
    }

}

module.exports = TaskStartElectron;
