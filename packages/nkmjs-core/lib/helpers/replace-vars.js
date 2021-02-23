class ReplaceVars {
    constructor(...args) {
        this.keysList = [...args];
        this.Replace = this.Replace.bind(this);
    }

    Replace(p_content) {

        for (let i = 0; i < 10; i++) {
            p_content = this.__replacePass(p_content);
        }

        return p_content;
    }

    __replacePass(p_content){

        for (let i = 0, n = this.keysList.length; i < n; i++) {
            let keys = this.keysList[i];
            if (!keys) { continue; }
            p_content = this.__process(p_content, keys);
        }

        return p_content;
    }

    __process(p_content, keys) {
        for (var key in keys) {
            let value = keys[key];
            if (typeof value !== 'string') { continue; }
            p_content = p_content.split(`%${key}%`).join(value);
        }
        return p_content;
    }

}

module.exports = ReplaceVars;