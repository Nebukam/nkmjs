const NKMjs = require(`../nkm.js`);

class RunList{
    
    constructor(p_owner, p_list, p_end){

        this.RunNext = this.RunNext.bind(this);

        this.__endFn = p_end;
        this.__owner = p_owner;
        this.scriptList = p_list;
        this.originalArgs = NKMjs.shortargs;

        this.RunNext();

    }

    RunNext() {

        let scriptInfos = this.scriptList.shift();

        if (!scriptInfos) {
            this.End();
            return;
        }

        if (Array.isArray(scriptInfos)) {
            NKMjs.shortargs = scriptInfos[1];
            scriptInfos = scriptInfos[0];
        } else {
            NKMjs.shortargs = this.originalArgs;
        }

        this.__owner.Run(`./${scriptInfos}`, this.RunNext);

    }

    End(){
        NKMjs.shortargs = this.originalArgs;
        this.__endFn();
    }

}

module.exports = RunList;