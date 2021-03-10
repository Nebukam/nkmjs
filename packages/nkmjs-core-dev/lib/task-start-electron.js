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
            `./task-styles-build`,
            `./task-build-electron-html`,
            `./task-build-electron-main`,
        ], this._Bind(this.Start));

    }

    Start() {

        let electronEntry = NKMjs.InApp(NKMjs.ELECTRON_ENTRY_POINT),
            args = ``;

        this._logFwd(chalk.gray.italic(`electron ${electronEntry}`), `·`);


        for (var key in NKMjs.shortargs) {
            let value = NKMjs.shortargs[key];
            if (value === true) {
                args += ` --${key}`;
            } else if (value === false) {
                args += ` --${key}=FALSE`;
            } else {
                args += ` --${key}=${value}`;
            }
        }

        this.nodeElectron = exec(`node ${NKMjs.InCoreModules(`electron`, `cli.js`)} ${electronEntry}${args}`); //electron
        this.nodeElectron.stdout.on('data', this._Bind(this._OnElectronStdout));
        this.nodeElectron.stderr.on('data', function (data) { console.log(chalk.redBright(data.toString())); });
        this.nodeElectron.on('exit', this._Bind(this._OnElectronExit));

    }

    _OnElectronStdout(data) {
        let dataStr = data.toString();
        console.log(`ELECTRON-STDOUT :: ${dataStr.trim()}`);
        if (dataStr.includes(`RELOAD_REQUEST`)) {
            if (NKMjs.shortargs.Has(`rebuild-styles`)) {
                console.log(`rebuild-styles`);
                let fetchScriptPath = `./task-styles-fetch`,
                    buildScriptPath = `./task-styles-build`,
                    fetchScript = require(fetchScriptPath),
                    buildScript = require(buildScriptPath);
                buildScript.runOnce = false;
                fetchScript.runOnce = false;
                NKMjs.shortargs.replace = true;
                NKMjs.shortargs.append = true;
                this.Run([fetchScriptPath, buildScriptPath]);
            }
            //this.nodeElectron.stdin.setEncoding('utf-8');
            //this.nodeElectron.stdin.write("console.log('Hello from PhantomJS')\n");
        }
    }

    _OnElectronExit(code) {
        this._logFwd(`electron exited with code ${code !== 0 ? chalk.yellow(code) : chalk.green(code)}`);
        this.End();
    }

}

module.exports = TaskStartElectron;
