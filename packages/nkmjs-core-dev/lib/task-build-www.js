const path = require(`path`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);
const FSUTILS = require('./helpers/fsutils');
const DirCopy = require('./helpers/dir-copy');

class TaskBuildWWW extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`build-www`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this._Bind(this.Entry);

        this.Run([
            `./task-prepare-all-icons`,
            `./task-build-shared-resources`,
            `./task-bundle-main-www`,
            `./task-build-www-html`,
        ], this._Bind(this._OnPreparationComplete));

    }

    _OnPreparationComplete() {

        let output = NKMjs.InVersionedBuilds(`www`);

        try{ FSUTILS.rmdir(output); }catch(e){}
        FSUTILS.ensuredir(output);

        
        new DirCopy(NKMjs.InSharedWebBuildRsc(), output, { 'any': this.Entry });
        new DirCopy(NKMjs.InWWWBuildRsc(), output, { 'any': this.Entry });
        new DirCopy(NKMjs.InBuildRsc(`icons`), path.resolve(output, `icons`), { 'any': this.Entry });

        this.End();
    }

    Entry(p_src, p_dest, p_isDir){
        return p_dest;
    }

}

module.exports = TaskBuildWWW;