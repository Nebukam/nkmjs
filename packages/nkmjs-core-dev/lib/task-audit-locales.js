const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);

class TaskAuditLocales extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`audit-locales`, p_onComplete, { skipKey: `no-locales-audit` });
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        // Audit all langs based on the specified 'lang' in config
        var locDir = NKMjs.InApp(NKMjs.projectConfig.dirs.locales),
            locDirRef = NKMjs.InApp(locDir, NKMjs.projectConfig.lang);

        try { fs.statSync(locDir); } catch (e) {
            // No locales
            this.End();
            return;
        }

        try { fs.statSync(locDirRef); } catch (e) {
            this._logWarn(`Reference locale '${NKMjs.projectConfig.lang}' does not exists.`);
            this.End();
            return;
        }

        var locDirContent = fs.readdirSync(locDir),
            locDirRefContent = fs.readdirSync(locDirRef),
            expectedPaths = [],
            expectedData = [];

        for (let i = 0, n = locDirRefContent.length; i < n; i++) {
            let item = path.resolve(locDirRef, locDirRefContent[i]),
                stats = fs.statSync(item);

            new DirRead(item, null, {
                'any': (p_src) => {
                    let stat = fs.statSync(p_src);
                    expectedPaths.push(p_src.replace(locDirRef, ``));
                    if (!stat.isDirectory() && path.extname(p_src) === `.json`) { expectedData.push(JSON.parse(fs.readFileSync(p_src, 'utf8'))); }
                    else { expectedData.push(0); }
                }
            });

        }

        let verboseOutput = NKMjs.shortargs.Get(`verbose-locales-audit`);
        if (!verboseOutput) {
            this._log(`use --verbose-locales-audit for detailed report.`)
        }

        for (let i = 0, n = locDirContent.length; i < n; i++) {

            var itemName = locDirContent[i],
                item = path.resolve(locDir, itemName),
                stats = fs.statSync(item),
                expectedPathQueue = [...expectedPaths],
                errors = { files: [] };

            if (itemName === NKMjs.projectConfig.lang) { continue; }

            new DirRead(item, null, {
                'any': (p_src) => {
                    let stat = fs.statSync(p_src),
                        shortPath = p_src.replace(item, ``),
                        index = expectedPaths.indexOf(shortPath);

                    if (index == -1) { return; }
                    expectedPathQueue.splice(expectedPathQueue.indexOf(shortPath), 1);

                    //Entry
                    if (stat.isDirectory() && path.extname(p_src) !== `.json`) { return; }

                    let referenceData = expectedData[index],
                        auditedData = JSON.parse(fs.readFileSync(p_src, 'utf8')),
                        errList = [],
                        fileData = { shortPath: shortPath, errors: errList };

                    for (var key in referenceData) {
                        if (!auditedData.hasOwnProperty(key)) {
                            errList.push(`KEY '${key}' missing`);
                        }
                    }

                    if (errList.length) { errors.files.push(fileData); }
                }
            });

            // lang : itemName

            if (expectedPathQueue.length != 0) { errors.missing = expectedPathQueue; }

            let errorCount = 0,
                strList = [];

            if (errors.missing) {
                for (let i = 0, n = errors.missing.length; i < n; i++) {
                    strList.push({ t: chalk.yellow(`couldn't find ${errors.missing[i]}`), i: 2 });
                    errorCount++;
                }
            }

            if (errors.files.length != 0) {
                for (let i = 0, n = errors.files.length; i < n; i++) {
                    let f = errors.files[i],
                        errN = f.errors.length;

                    strList.push({ t: chalk.white(`${f.shortPath}`) + chalk.yellow(` has ${errN} errors :`), i: 2 });

                    for (let j = 0; j < errN; j++) {
                        let e = f.errors[j];
                        strList.push({ t: chalk.yellow(`${e}`), i: 3 });
                        errorCount++;
                    }
                }
            }

            if (errorCount == 0) {
                this._log(chalk.green(`✓  `) + chalk.white(`'${itemName}'`), 1);
            } else {
                this._log(chalk.red(`✗  `) + chalk.white(`'${itemName}'`) + chalk.red(` (${errorCount} errors)`), 1);
                if (verboseOutput) {
                    for (let i = 0; i < strList.length; i++) {
                        let str = strList[i];
                        this._log(str.t, str.i);
                    }
                }
            }


        }

        this.End();

    }

}

module.exports = TaskAuditLocales;