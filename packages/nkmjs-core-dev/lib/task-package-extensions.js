'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require("./script-base");
const NKMjs = require(`./nkm.js`);
const DirZip = require(`./helpers/dir-zip`);

class TaskPackageExtensions extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`package-extensions`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.unpacked = [];
        let extensionDir = NKMjs.Get(`extensions-dir`);

        try {
            let folderContent = fs.readdirSync(extensionDir);
            for (let i = 0, n = folderContent.length; i < n; i++) {
                let item = folderContent[i],
                    stat = fs.statSync(path.resolve(extensionDir, item));
                if (!stat.isDirectory()) { continue; }
                try {
                    let unpackedDir = path.resolve(extensionDir, item, `unpacked`);
                    stat = fs.statSync(unpackedDir);
                    if (stat.isDirectory()) {
                        this.unpacked.push({
                            browser: item,
                            unpacked: unpackedDir
                        });
                    }
                } catch (e) { }
            }


        } catch (e) { }

        if (this.unpacked.length == 0) {
            this.NothingToPackage();
            return;
        }

        this._Bind(this.OnZipComplete);
        this.ZipNext();

    }

    ZipNext() {

        let zipInfos = this.unpacked.shift();

        if (!zipInfos) {
            this.End();
            return;
        }

        let zipFileName = `${NKMjs.projectConfig.name}-${zipInfos.browser}-${NKMjs.projectVersion}.zip`;
        this.currentZipPath = path.resolve(path.dirname(zipInfos.unpacked), zipFileName);
        try{
            let exists = false;
            try{
                fs.statSync(this.currentZipPath);
                exists = true;
                try{
                    fs.unlinkSync(this.currentZipPath);
                }catch(e){
                    throw(e);
                }
            }catch(e){
                if(exists){ throw(e); }
                // No need to remove existing zip
            }
        }catch(e){
            this._logError(e.message);
            this.ZipNext();
            return;
        }

        new DirZip(
            zipInfos.unpacked,
            path.resolve(path.dirname(zipInfos.unpacked), this.currentZipPath),
            this.OnZipComplete);

    }

    OnZipComplete(p_err) {
        if (p_err) { this._logError(`@${NKMjs.Shorten(this.currentZipPath)} : ${p_err}`, 2); }
        else { this._logFwd(`${NKMjs.Shorten(this.currentZipPath)}`, `+`, 2); }
        this.ZipNext();
    }

    NothingToPackage() {
        this._logWarn(`Could not find any extensions to package.`, 1)
        this.End();
    }

}

module.exports = TaskPackageExtensions;