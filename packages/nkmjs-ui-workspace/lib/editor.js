'use strict';

const { U } = require(`@nkmjs/utils`);
const { SIGNAL, COMMON_FLAG, Observer } = require(`@nkmjs/common`);
const { ActionStack, Command } = require(`@nkmjs/actions`);
const { DATA_SIGNAL } = require(`@nkmjs/data-core`);
const { UI, MOUSE, View } = require(`@nkmjs/ui-core`);

/**
 * An editor is an abstract implementation of the generic "editor" concept.
 * It is designed to edit & inspects a single piece of data (no matter how complex).
 * 
 * It has an 'inspectedData' property that allows specific parts or components of the 
 * edited data to be inspected further, and selected more specifically, based on Editor's implementation.
 */

class Editor extends View{
    constructor(){super();}

    _Init(){

        super._Init();

        //TODO : Find a way to invalidate action stacks // <--- WTF ?
        this._actionStack = new ActionStack();

        this._dataObserver.Hook(DATA_SIGNAL.DIRTY, this._OnDataDirty, this);
        this._dataObserver.Hook(DATA_SIGNAL.DIRTY_CLEARED, this._OnDataCleaned, this);

        this._inspectedData = null;
        this._inspectedObserver = new Observer();
        this._inspectedObserver.Hook(SIGNAL.RELEASED, this._OnInspectedDataReleased, this);

        this._flags.Add(this, COMMON_FLAG.WARNING);

        this._Bind(this.Inspect);

    }

    // ----> Data management

    _OnDataChanged(p_oldData){

        this._actionStack.Clear();
        this._commands.context = this._data;

        super._OnDataChanged(p_oldData);

        this.inspectedData = null;

    }

    _PostDataChanged(p_oldData){
        super._PostDataChanged(p_oldData);

        if(!this._data){

        }else{
            if(this._data.isDirty){  this._OnDataDirty(this._data); }
            else{ this._OnDataCleaned(this._data); }
        }
    }

    _OnDataDirty(p_data){

    }

    _OnDataCleaned(p_data){

    }

    // ----> Data


    get inspectedData(){ return this._inspectedData; }
    set inspectedData(p_value){

        
        if(this._inspectedData === p_value){return;}

        let oldValue = this._inspectedData;
        this._inspectedData = p_value;

        if(oldValue){ this._inspectedObserver.Unobserve(oldValue); }
        if(p_value){ this._inspectedObserver.Observe(p_value); }

        this._OnInspectedDataChanged(oldValue);

    }

    _OnInspectedDataChanged(p_oldData){
        
    }

    _OnInspectedDataReleased(){
        this.inspectedData = null;
    }

    /**
     * Set data to be inspected
     * @param {*} p_data 
     */
    Inspect(p_data)
    {
        this.inspectedData = p_data;
    }

    // ----> Actions

    Do(p_actionClass, p_options){
        //Group drag-related actions
        this._actionStack.ToggleGrouping( UI.dragLength > 1 );
        this._actionStack.Do( p_actionClass, p_options ); 
    }
    Undo(){ this._actionStack.Undo(); }
    Redo(){ this._actionStack.Redo(); }

}

module.exports = Editor;
UI.Register('nkmjs-editor', Editor);