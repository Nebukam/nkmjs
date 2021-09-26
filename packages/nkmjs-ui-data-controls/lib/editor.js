'use strict';

const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);

/**
 * @description An abstract implementation of the concept of "data editor". It is designed to edit
 * a complex data object, as well as inspecting selection of that data object' components (no matter how complex).
 * 
 * An editor is different from a basic controller as it has its own action stack in order to support undo/redo.
 * @class
 * @hideconstructor
 * @augments ui.core.Widget
 * @memberof ui.datacontrols
 */
class Editor extends ui.views.View{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/global-editor.css`]
    }, ui.views.View, ['css']);

    _Init(){

        super._Init();

        //TODO : Find a way to invalidate action stacks // <--- WTF ?
        this._actionStack = new actions.ActionStack();

        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);
        this._dataObserver.Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDataCleaned, this);

        this._inspectedData = null;
        this._inspectedObserver = new com.signals.Observer();
        this._inspectedObserver.Hook(com.SIGNAL.RELEASED, this._OnInspectedDataReleased, this);

        this._flags.Add(this, com.FLAGS.WARNING);

        this._hasUnsavedModifications = false;

        this._Bind(this.Inspect);

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get hasUnsavedModifications(){ return this._hasUnsavedModifications; }

    /**
     * @description TODO
     * @param {boolean} p_value 
     * @returns 
     */
    _SetUnsavedModifications(p_value){
        if(this._hasUnsavedModifications === p_value){ return; }
        this._hasUnsavedModifications = p_value;
        if(p_value){
            // TODO
        }else{
            // TODO
        }
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


    /**
     * @description The Editor currently inspected data. Drives available controls, actions, commands,
     * as well as this Editor' main inspector.
     * @type {data.core.DataBlock}
     */
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
     * @description Set data to be inspected
     * @param {data.core.DataBlock} p_data 
     */
    Inspect(p_data)
    {
        this.inspectedData = p_data;
    }

    // ----> Actions

    /**
     * @access public
     * @description Registers & executes an action in the local ActionStack.
     * @param {constructor} p_actionClass Action class to be executed
     * @param {object} p_operation Action' operation parameters
     * @group Actions
     */
    Do(p_actionClass, p_operation){
        this._actionStack.ToggleGrouping( ui.POINTER.DRAG_MULTIPLE ); //Group drag-related actions
        this._actionStack.Do( p_actionClass, p_operation ); 
    }
    
    /**
     * @access public
     * @description Undo the last action in the local ActionStack.
     * @group Actions
     */
    Undo(){ this._actionStack.Undo(); }

    /**
     * @access public
     * @description Redo the last undo'd action in the local ActionStack.
     * @group Actions
     */
    Redo(){ this._actionStack.Redo(); }

}

module.exports = Editor;
ui.Register('nkmjs-editor', Editor);