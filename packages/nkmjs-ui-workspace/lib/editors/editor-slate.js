'use strict';

const ui = require(`@nkmjs/ui-core`);

const EditorEx = require(`./editor-ex`);

class SlateEditor extends EditorEx{
    constructor(){super();}

    _Init(){
        super._Init();
    }

    //TODO : A slate editor is a free-roaming editing space with childs treated as floating nodes.

    // ----> DOM
    
    _Render(){
        super._Render();
    }

}

module.exports = SlateEditor;
ui.Register('nkmjs-editor-slate', SlateEditor);