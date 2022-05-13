const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const FSUTILS = require('./helpers/fsutils');

const { createICO, createICNS } = require(`png2icons`);

class TaskPrepareIconsAssoc extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-icons-assoc`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let fileAssociations = NKMjs.projectConfig.fileAssociations;
        if (!fileAssociations) { this.End(); return; }

        let extIcons = [];
        for (let i = 0; i < fileAssociations.length; i++) {
            extIcons.push(fileAssociations[i].ext);
        }

        this.iconDest = FSUTILS.ensuredir(NKMjs.InBuildRsc());

        for (let i = 0; i < extIcons.length; i++) {
            let
                iconName = extIcons[i],
                sourcePath = NKMjs.InAssets(`icons`, `${iconName}.png`),
                iconStats = fs.statSync(sourcePath);

            if (!iconStats) {
                this._logWarn(`Could not find '${iconName}.png'.`, 1);
                continue;
            }

            let pngContent = fs.readFileSync(sourcePath);
            try {
                fs.writeFileSync(NKMjs.InBuildRsc(`${iconName}.ico`), createICO(pngContent, 2, 256, true, true));
            } catch (e) {
                this._logError(`Could not prepare .ico file for '${iconName}'.`, 1);
            }

            try {
                fs.writeFileSync(NKMjs.InBuildRsc(`${iconName}.icns`), createICNS(pngContent, 2, 256));
            } catch (e) {
                this._logError(`Could not prepare .icns file for '${iconName}'.`, 1);
            }

        }

        this.End();

    }

}

module.exports = TaskPrepareIconsAssoc;