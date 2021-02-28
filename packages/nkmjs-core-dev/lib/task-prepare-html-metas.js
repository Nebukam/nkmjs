const { execSync } = require('child_process');
const fs = require(`fs`);
const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const chalk = require('chalk');
const ReplaceVars = require(`./helpers/replace-vars`);
const DirRead = require(`./helpers/dir-read`);

class TaskPrepareHTMLMeta extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-metas`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-opengraph.js`,
            `./task-prepare-twitter-card.js`
        ], this._Bind(this.OnSubMetaComplete));

    }

    OnSubMetaComplete(){

        let metas = ``;

        metas += `<!-- META -->\n`;
        metas += `<meta charset="utf-8" />\n`;
        metas += `<meta http-equiv="X-UA-Compatible" content="IE=edge">\n`;
        metas += `<title>${NKMjs.projectConfigCompiled.longName}</title>\n`;
        metas += `<meta name="description" content="${NKMjs.projectConfigCompiled.description}">\n`;
        metas += `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n`;
        metas += `<meta name="robots" content="index, follow"></meta>\n`;
        metas += `<link rel="canonical" href="${NKMjs.projectConfigCompiled.homepage}" />\n`;
        metas += NKMjs.Get(`opengraph`, ``);
        metas += NKMjs.Get(`twitter-card`, ``);

        NKMjs.Set(`html-metadata`, metas);

        this.End();
    }

}

module.exports = TaskPrepareHTMLMeta;