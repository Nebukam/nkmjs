const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);
const NKMJSPackageConfig = require('./helpers/nkmjs-package-config');
const FSUTILS = require('./helpers/fsutils');

try {

    let packageJsonPath = path.resolve(process.env.INIT_CWD, `package.json`),
        nkmConfigPath = path.resolve(process.env.INIT_CWD, `nkmjs.config.json`),
        defaultNkmJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../configs/nkmjs.config.json`))),
        pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')),
        nkmJson = null,
        scripts = pkgJson.scripts;

    if (packageJsonPath.includes(`node_modules`)) {
        // Executing somewhere in node modules, we don't want that.
        return;
    }

    if (!scripts) {
        scripts = {};
        pkgJson.scripts = scripts;
    }

    // Add 'nkmjs' script to scripts, to circumvent the need for installing nkmjs globally

    if (`nkmjs` in scripts && scripts.nkmjs !== `nkmjs`) {
        // Save existing nkmjs script under a random identifier
        // let's not be destructive, that's an enough of an asshole move.
        scripts[`nkmjs.${Math.random().toString(36).substr(2, 9)}`] = scripts.nkmjs;
    }

    scripts.nkmjs = `nkmjs`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 4));

    try {
        // let's create a basic nkm.config.json if it doesn't exists.
        nkmJson = JSON.parse(fs.readFileSync(nkmConfigPath), 'utf8');
    } catch (e) {
        // create one !
        nkmJson = {};
    }

    nkmJson.name = (nkmJson.name || pkgJson.name || `my-app`);
    nkmJson.longName = (nkmJson.longName || `${pkgJson.name} Verbose App Name` || `Verbose App Name`);
    nkmJson.shortName = (nkmJson.shortName || `${pkgJson.name} App` || `App Name`);
    nkmJson.description = (nkmJson.description || pkgJson.description || `App description`);
    nkmJson.homepage = (nkmJson.homepage || `https://www.${pkgJson.name}.com`);
    nkmJson.app = (nkmJson.app || defaultNkmJson.app);
    nkmJson.extension = (nkmJson.extension || defaultNkmJson.extension);
    nkmJson.dirs = (nkmJson.dirs || defaultNkmJson.dirs);
    nkmJson.builds = (nkmJson.builds || defaultNkmJson.builds);

    fs.writeFileSync(nkmConfigPath, JSON.stringify(nkmJson, null, 4));

} catch (e) {
    // Could not find package.json or else.
}