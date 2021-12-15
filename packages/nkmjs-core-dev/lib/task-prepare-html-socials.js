const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskPrepareHTMLSocials extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-socials`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-opengraph`,
            `./task-prepare-twitter-card`
        ], this._Bind(this.OnSubMetaComplete));

    }

    OnSubMetaComplete(){

        let metas = ``;
        metas += NKMjs.Get(`opengraph`, ``);
        metas += NKMjs.Get(`twitter-card`, ``);

        NKMjs.Set(`html-socials`, metas);

        this.End();
    }

}

module.exports = TaskPrepareHTMLSocials;