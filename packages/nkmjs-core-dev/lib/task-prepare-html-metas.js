const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskPrepareHTMLMetas extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-metas`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let metas = ``;

        metas += `<!-- META -->\n`;
        metas += `<meta charset="utf-8" />\n`;
        metas += `<meta http-equiv="X-UA-Compatible" content="IE=edge">\n`;
        metas += `<title>${NKMjs.projectConfig.longName}</title>\n`;
        metas += `<meta name="description" content="${NKMjs.projectConfig.description}">\n`;
        metas += `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">\n`;
        metas += `<meta name="robots" content="index, follow"></meta>\n`;
        metas += `<meta name="theme-color" content="${NKMjs.projectConfig.app.colorTheme}"></meta>\n`;
        metas += `<link rel="canonical" href="${NKMjs.projectConfig.homepage}" />\n`;

        NKMjs.Set(`html-metas`, metas);

        this.End();
    }

}

module.exports = TaskPrepareHTMLMetas;