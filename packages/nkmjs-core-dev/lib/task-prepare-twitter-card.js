const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskPrepareOpenGraph extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-twitter-card`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        //see https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started

        let twittercard = `<!-- twitter card -->\n`;
        NKMjs.Set(`html-twitter-card`, twittercard);

        this.End();

    }

}

module.exports = TaskPrepareOpenGraph;