const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const sizeOf = require('image-size');
const sharp = require(`sharp`);
const NKMJSPackageConfig = require('./helpers/nkmjs-package-config');
const FSUTILS = require('./helpers/fsutils');
const pngToIco = require('png-to-ico');

class TaskPrepareIcons extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-appx`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Prepare appx assets, see https://www.electron.build/configuration/appx#appx-assets

        this.End();

    }

}

module.exports = TaskPrepareIcons;