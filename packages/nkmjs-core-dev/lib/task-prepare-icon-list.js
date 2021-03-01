const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const sizeOf = require('image-size');

class TaskPrepareIconList extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-icon-list`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.ProcessNextIcon);

        this.requiredSizes = [72, 96, 128, 120, 180, 144, 152, 180, 192, 384, 512];
        this.iconList = [];
        let foundIconList = [],
            iconInfos = {};

        try {
            // Check if any icon is available
            let iconDir = NKMjs.projectConfigCompiled.iconsLocation,
                iconDirContent = fs.readdirSync(iconDir);

            for (let i = 0, n = iconDirContent.length; i < n; i++) {
                // for each file found, try to get its dimensions
                let filename = iconDirContent[i],
                    filepath = path.resolve(iconDir, filename);
                try {
                    let dimensions = sizeOf(filepath);
                    if (dimensions.width != dimensions.height) {
                        this._logWarn(`Can't use ${filename} : it isn't square. (${dimensions.width}x${dimensions.height})`);
                    } else {
                        foundIconList.push({ size: dimensions.width, path: filepath });
                    }
                } catch (e) { }

            }
        } catch (e) { }

        // Fallback to default icon
        if (foundIconList.length == 0) {
            this._logWarn(`No valid icon found, will use the default one.`);
            let filepath = NKMjs.InCore(`assets/icons/nkmjs-512.png`),
                dimensions = sizeOf(filepath);

            foundIconList.push({ size: dimensions.width, path: filepath });
        }

        // Compare existing list against requirements
        // If no exact match is found, find which size is closest for the resize operation
        outerloop: for (let i = 0, n = requiredSizes.length; i < n; i++) {

            let size = requiredSizes[i],
                diff = Number.MAX_SAFE_INTEGER,
                exactMatch = false,
                currentIcon = null,
                icon = null;

            innerloop: for (let ei = 0, nei = foundIconList.length; ei < nei; ei++) {
                let foundIcon = foundIconList[ei],
                    currentDiff = Math.abs(foundIcon.size - size);
                if (currentDiff == 0) {
                    // exact match
                    exactMatch = true;
                    currentIcon = foundIcon;
                    break innerloop;
                } else if (currentDiff < diff) {
                    // closest match yet
                    diff = currentDiff;
                    currentIcon = foundIcon;
                }
            }

            this.iconList.push({
                targetSize: size,
                exactMatch: exactMatch,
                currentIcon
            });

        }

        NKMjs.Set(`icon-list`, iconList);
        this.End();

    }

    ProcessNextIcon(){
        let icon = this.iconList.pop();
        if(!icon){
            this.End();
            return;
        }

        if(icon.exactMatch){
            // Just copy & rename icon.path
        }else{
            // Need editing of the closest match found, we'll use `sharp` for that.
            // https://www.npmjs.com/package/sharp
        }

    }

}

module.exports = TaskPrepareIconList;