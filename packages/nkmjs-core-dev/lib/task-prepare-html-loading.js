const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const ReplaceVars = require(`./helpers/replace-vars`);

class TaskPrepareHTMLLoading extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-html-loading`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        let loading = NKMjs.projectConfig.app.loading,
            replacer = new ReplaceVars(NKMjs.__keys);
            
        if (!loading) { loading = NKMjs.InCore(`configs`, `html`, `loading.html`); }
        else { loading = NKMjs.InProject(loading); }

        try {
            fs.statSync(loading);
        } catch (e) {
            loading = NKMjs.InCore(`configs`, `html`, `loading.html`);
        }

        loading = replacer.Replace(fs.readFileSync(loading, 'utf8'));
        NKMjs.Set(`html-loading`, loading);

        this.End();
    }

}

module.exports = TaskPrepareHTMLLoading;