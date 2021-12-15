const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const sizeOf = require('image-size');
const sharp = require(`sharp`);
const FSUTILS = require('./helpers/fsutils');

class TaskPrepareIcons extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-icons`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.ProcessNextIcon);
        this._Bind(this.WrapUp);

        try { FSUTILS.rmdir(NKMjs.InBuildRsc(`icons`)); } catch (e) { }
        this.iconDest = FSUTILS.ensuredir(NKMjs.InBuildRsc());
        FSUTILS.ensuredir(NKMjs.InBuildRsc(`icons`));

        this.requiredSizes = [16, 32, 48, 64, 72, 96, 128, 120, 180, 144, 152, 180, 192, 384, 512];
        this.tempIconList = [];
        this.iconList = [];
        let foundIconList = [];

        try {
            // Check if any icon is available
            let iconDir = NKMjs.projectConfig.dirs.icons,
                iconDirContent = fs.readdirSync(iconDir);

            for (let i = 0, n = iconDirContent.length; i < n; i++) {
                // for each file found, try to get its dimensions
                let filename = iconDirContent[i],
                    filepath = path.resolve(iconDir, filename),
                    maskable = filename.includes(`-maskable`);

                if (path.extname(filename) != `.png`) { continue; }

                try {
                    let dimensions = sizeOf(filepath);
                    if (dimensions.width != dimensions.height) {
                        this._logWarn(`Can't use ${filename} : it isn't square. (${dimensions.width}x${dimensions.height})`);
                    } else {
                        let iconInfos = { size: dimensions.width, path: filepath, maskable: maskable }, skip = false;

                        // Check if a same-sized icon already exists
                        for (let i = 0, n = foundIconList.length; i < n; i++) {
                            let otherIcon = foundIconList[i];
                            if (otherIcon.size == iconInfos.size) {
                                if (maskable) { 
                                    // Current one is maskable, skip it since we have a same-sized one already
                                    skip = true;
                                    break;
                                } else if (otherIcon.maskable) { 
                                    // Override existing maskable, since we prioritize non-maskable here
                                    skip = true;
                                    foundIconList[i] = iconInfos;
                                    break;
                                }
                            }
                        }

                        if (!skip) { foundIconList.push(iconInfos); }
                    }
                } catch (e) { }

            }
        } catch (e) { }

        // Fallback to default icon
        if (foundIconList.length == 0) {
            this._logWarn(`No valid *.png icon found, will use the default one.`, 1);
            this._log(chalk.yellow(`To fix this, add at least one *.png file under ${NKMjs.projectConfig.dirs.icons}.`), 1);
            let filepath = NKMjs.InCore(`assets/icons/nkmjs-1024.png`),
                dimensions = sizeOf(filepath);

            foundIconList.push({ size: dimensions.width, path: filepath });
        }

        // Compare existing list against requirements
        // If no exact match is found, find which size is closest for the resize operation
        outerloop: for (let i = 0, n = this.requiredSizes.length; i < n; i++) {

            let size = this.requiredSizes[i],
                diff = Number.MAX_SAFE_INTEGER,
                exactMatch = false,
                currentIcon = null,
                iconFilename = `${size}x${size}.png`,
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
            NKMjs.WriteTempSync(icon.path, icon.binary);
            this.ProcessNextIcon();
        } else {
            // Need editing of the closest match found, we'll use `sharp` for that.
            // https://www.npmjs.com/package/sharp
            sharp(icon.binary)
                .resize({ width: icon.size, height: icon.size })
                .toFile(icon.path)
                .then(this.ProcessNextIcon)
                .catch((err) => {
                    this._logError(err);
                    this.ProcessNextIcon();
                });
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
            p_src = NKMjs.InBuildRsc(`icons`, `${size}x${size}.png`),
            p_dest = NKMjs.InBuildRsc(`icon.png`);

        fs.copyFileSync(p_src, p_dest);
        NKMjs.Set(`icon-list`, this.iconList);
        this.End();
    }

}

module.exports = TaskPrepareIcons;