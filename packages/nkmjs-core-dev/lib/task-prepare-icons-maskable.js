const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const sizeOf = require('image-size');
const sharp = require(`sharp`);
const FSUTILS = require('./helpers/fsutils');

class TaskPrepareIconsMaskable extends ScriptBase {

    constructor(p_onComplete = null) {

        // See https://web.dev/maskable-icon-audit/

        super(`prepare-icons-maskable`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.ProcessNextIcon);
        this._Bind(this.WrapUp);

        this.iconDest = FSUTILS.ensuredir(NKMjs.InBuildRsc());
        FSUTILS.ensuredir(NKMjs.InBuildRsc(`icons`));

        this.requiredSizes = [16, 32, 48, 64, 72, 96, 128, 120, 180, 144, 152, 180, 192, 384, 512];
        this.tempIconList = [];
        this.iconList = [];
        let foundIconList = [],
            iconInfos = {};

        try {
            // Check if any icon is available
            let iconDir = NKMjs.projectConfig.dirs.icons,
                iconDirContent = fs.readdirSync(iconDir);

            for (let i = 0, n = iconDirContent.length; i < n; i++) {
                // for each file found, try to get its dimensions
                let filename = iconDirContent[i],
                    filepath = path.resolve(iconDir, filename);

                if (path.extname(filename) != `.png`) { continue; }
                if (!filename.includes(`-maskable`)) { continue; }

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
            this._logWarn(`No valid *-maskable.png icon found, will use the default one.`, 1);
            this._log(chalk.yellow(`To fix this, add at least one *-maskable.png file under ${NKMjs.projectConfig.dirs.icons}.`), 1);
            this._log(`More infos : https://web.dev/maskable-icon/`, 1);
            let filepath = NKMjs.InBuildRsc(`icons`, `512x512.png`),
                dimensions = sizeOf(filepath);

            foundIconList.push({ size: dimensions.width, path: filepath, addBackground: true });
        }

        // Compare existing list against requirements
        // If no exact match is found, find which size is closest for the resize operation
        outerloop: for (let i = 0, n = this.requiredSizes.length; i < n; i++) {

            let size = this.requiredSizes[i],
                diff = Number.MAX_SAFE_INTEGER,
                exactMatch = false,
                currentIcon = null,
                iconFilename = `${size}x${size}-maskable.png`,
                iconPath = path.resolve(this.iconDest, `icons`, iconFilename),
                icon = {};

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

            icon.size = size;
            icon.exactMatch = exactMatch;
            icon.path = iconPath;
            icon.filename = iconFilename;
            if (currentIcon.addBackground) { icon.addBackground = true; }

            this.iconList.push(icon);
            this.tempIconList.push({ binary: fs.readFileSync(currentIcon.path), ...icon });
            NKMjs.RegisterTemp(iconPath);

        }

        this.ProcessNextIcon();
    }

    ProcessNextIcon() {

        let icon = this.tempIconList.pop();
        if (!icon) {
            this.OnAllIconProcessed();
            return;
        }

        if (icon.exactMatch) {
            // Just copy & rename icon.path
            if (icon.addBackground) {
                sharp(icon.binary)
                    .flatten({
                        background: { r: 237, g: 30, b: 121, alpha: 1 }
                    })
                    .toFile(icon.path)
                    .then(this.ProcessNextIcon)
                    .catch((err) => {
                        this._logError(err);
                        this.ProcessNextIcon();
                    });
            } else {
                NKMjs.WriteTempSync(icon.path, icon.binary);
                this.ProcessNextIcon();
            }


        } else {
            // Need editing of the closest match found, we'll use `sharp` for that.
            // https://www.npmjs.com/package/sharp
            if (icon.addBackground) {
                sharp(icon.binary)
                    .resize({
                        width: icon.size,
                        height: icon.size
                    })
                    .flatten({
                        background: { r: 237, g: 30, b: 121, alpha: 1 }
                    })
                    .toFile(icon.path)
                    .then(this.ProcessNextIcon)
                    .catch((err) => {
                        this._logError(err);
                        this.ProcessNextIcon();
                    });
            } else {
                sharp(icon.binary)
                    .resize({
                        width: icon.size,
                        height: icon.size
                    })
                    .toFile(icon.path)
                    .then(this.ProcessNextIcon)
                    .catch((err) => {
                        this._logError(err);
                        this.ProcessNextIcon();
                    });
            }

        }

    }

    OnAllIconProcessed() {
        /*
                // Create a fat .ico using png-to-ico
                let list = [],
                    icon;
        
                for (let i = 0, n = this.iconList.length; i < n; i++) {
                    icon = this.iconList[i];
                    list.push(icon.path);
                }
        
                // Package a .ico for electron
                pngToIco(list)
                    .then(buf => {
                        let icoPath = path.resolve(this.iconDest, 'icon.ico');
                        fs.writeFileSync(icoPath, buf);
                        NKMjs.RegisterTemp(icoPath);
                    })
                    .catch((e) => {
                        this._logError(e);
                    })
                    .finally(this.WrapUp);
        */
        this.WrapUp();
    }

    WrapUp() {
        // Take the largest size and copy it as icon.png for macOS (last size from iconList)
        let size = this.requiredSizes[this.requiredSizes.length - 1],
            p_src = NKMjs.InBuildRsc(`icons`, `${size}x${size}-maskable.png`),
            p_dest = NKMjs.InBuildRsc(`icon-maskable.png`);

        fs.copyFileSync(p_src, p_dest);
        NKMjs.Set(`icon-list-maskable`, this.iconList);
        this.End();
    }

}

module.exports = TaskPrepareIconsMaskable;