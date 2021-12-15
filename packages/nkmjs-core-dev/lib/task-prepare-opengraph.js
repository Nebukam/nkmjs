const fs = require(`fs`);
const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskPrepareOpenGraph extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-opengraph`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        //see https://ahrefs.com/blog/open-graph-meta-tags/
        //also : a single image for the open graph, think of adding custom tag width & height

        let ogConfig = JSON.parse(fs.readFileSync(NKMjs.InCore(`configs`, `opengraph.json`))),
        userOgConfig = null;
        
        try{
            userOgConfig = JSON.parse(fs.readFileSync(NKMjs.InProject(`opengraph.json`)));
        }catch(e){
            
        }

        let og = `<!-- open graph -->\n`;
        NKMjs.Set(`html-opengraph`, og);

        this.End();

    }

}

module.exports = TaskPrepareOpenGraph;