'use strict';

const fs = require(`fs`);
const path = require(`path`);
const ReplaceVars = require("./helpers/replace-vars");
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskShrinkKeys extends ScriptBase {

    constructor(p_onComplete = null) {
        super(`shrink-keys`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.shrinkMap = {};// JSON.parse(fs.readFileSync(NKMjs.InCore(`configs/shrinkmap.json`), 'utf8'));

        let fileList = NKMjs.Get(`shrink-list`, []);
        for (let i = 0, n = fileList.length; i < n; i++) {
            this._Process(fileList[i]);
        }

        this.End();

    }

    _Process(p_filePath) {

        let fileContent = fs.readFileSync(p_filePath, 'utf8');

        let splitA = fileContent.split(`t("`), paths = [];
        splitA.shift();

        for (let i = 0, n = splitA.length; i < n; i++) {
            let splitB = splitA[i].split(`")`)[0], pass = true;
            if (fileContent.indexOf(`"${splitB}":`) === -1) { continue; } // Some imports are not mapped, skip these.
            if (!paths.includes(splitB) && splitB.length > 1) { paths.push(splitB); } // isolate unique paths
        }

        //paths.forEach((e) =>{ console.log(e)});

        for (let i = 0, n = paths.length; i < n; i++) {
            let A = `"${paths[i]}"`,
                B = `${i}`;
            //fileContent = fileContent.replace(A, B);
            fileContent = fileContent.split(A).join(B);
        }

        //let replacer = new ReplaceVars(this.constructor.replaceMap);
        for (let key in this.shrinkMap) {
            fileContent = fileContent.split(key).join(this.shrinkMap[key]);
        }

        fs.writeFileSync(p_filePath, fileContent);

    }

}

module.exports = TaskShrinkKeys;