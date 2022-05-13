'use strict';

const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const collections = require(`@nkmjs/collections`);


const SIGNAL = require(`./signal`);
const InspectionDataList = require(`./helpers/inspection-data-list`);

const __editorMap = new collections.DictionaryList();
const __activeData = new Set();

function __CheckEditorMap() {
    
    let stack = [];
    __activeData.forEach(p_data => {
        // Check if still edited.
        if (__editorMap.Count(p_data) == 0) { stack.push(p_data); }
        for (let i = 0; i < stack.length; i++) {
            let d = stack[i];
            __activeData.delete(d);
            d.Broadcast(data.SIGNAL.NO_ACTIVE_EDITOR, d);
        }
    });
    
}

const __delayedCheckEditorMap = com.DelayedCall(__CheckEditorMap);

const base = ui.views.View;

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
class Editor extends base {
    constructor() { super(); }
    /*
        static __NFO__ = com.NFOS.Ext({
            css: [`@/views/global-editor.css`]
        }, base, ['css']);
    */
    static __registerableEditor = false;
    static __default_shortcutRequireFocus = true;

    //#region Global editor tracking

    static __Register(p_editor, p_data) {
        __editorMap.Set(p_data, p_editor);
        __activeData.add(p_data);
        p_data.Broadcast(data.SIGNAL.ACTIVE_EDITOR_GAIN, p_data, p_editor);
    }

    static __Unregister(p_editor, p_data) {
        __editorMap.Remove(p_data, p_editor);
        p_data.Broadcast(data.SIGNAL.ACTIVE_EDITOR_LOST, p_data, p_editor);
        __delayedCheckEditorMap.Schedule();
    }

    //#endregion

    _Init() {

        super._Init();

        //TODO : Find a way to invalidate action stacks // <--- WTF ?
        this._actionStack = new actions.ActionStack();

        this._flags.Add(this, com.FLAGS.WARNING);

        this._forwardContext = new ui.helpers.DataForward(this);

        this._dataObserver
            .Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this)
            .Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDataCleaned, this);

        this._inspectedDataPreProcessor = null;
        this._inspectedData = new InspectionDataList(this);
        this._inspectedData
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnInspectableItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnInspectableItemRemoved, this)
            .Watch(com.SIGNAL.ITEM_BUMPED, this._OnInspectableItemBumped, this);

        this._iDataCommands = new actions.CommandBox(this._Bind(this._OnInspectedDataCmdRegister), this);
        this._iDataCommands.context = this._inspectedData;
        this._iDataRefresh = com.DelayedCall(this._Bind(this._OnInspectedDataDelayedRefresh));

        this._stateStack = new actions.helpers.StateStack();

        this._skipNextSelectionState = false;
        this._registerEmptySelection = false;

    }

    _PostInit() {

        super._PostInit();
        this._RegisterEditorBits();

        if (this._forwardData) { this._forwardData._BatchSet(`editor`, this); }
        this._forwardContext._BatchSet(`editor`, this);

        this._inspectedData.preProcessData = this._inspectedDataPreProcessor;

    }

    _RegisterEditorBits() {

    }

    //#region Commands

    get stateStack() { return this._stateStack; }

    PreviousState() { return this._stateStack.Previous(); }
    NextState() { return this._stateStack.Next(); }

    _OnInspectedDataCmdRegister(p_cmd) { }

    //#endregion

    // ----> Data management

    _OnDataChanged(p_oldData) {

        this._actionStack.Clear();
        this._forwardContext._BatchSet(`context`, this._data);

        super._OnDataChanged(p_oldData);

        this.inspectedData.Clear();

        if (this.constructor.__registerableEditor) {
            if (p_oldData) { Editor.__Unregister(this, p_oldData); }
            if (this._data) { Editor.__Register(this, this._data); }
        }

    }

    _PostDataChanged(p_oldData) {
        super._PostDataChanged(p_oldData);

        if (!this._data) {

        } else {
            if (this._data.isDirty) { this._OnDataDirty(this._data); }
            else { this._OnDataCleaned(this._data); }
        }
    }

    _OnDataDirty(p_data) {

    }

    _OnDataCleaned(p_data) {

    }

    _OnChildAttached(p_displayObject, p_index) {
        if (`editor` in p_displayObject) { p_displayObject.editor = this; }
        super._OnChildAttached(p_displayObject, p_index);
    }

    //#region Selection stack

    /**
     * @description The Editor currently inspected data. Drives available controls, actions, commands,
     * as well as this Editor' main inspector.
     * @type {data.core.DataBlock}
     */
    get inspectedData() { return this._inspectedData; }

    _OnInspectableItemAdded(p_selection, p_data) {
        this._iDataRefresh.Schedule();
    }

    _OnInspectableItemRemoved(p_selection, p_data) {
        this._iDataRefresh.Schedule();
    }

    _OnInspectableItemBumped(p_selection, p_data) {
        this._iDataRefresh.Schedule();
    }

    _OnInspectedDataDelayedRefresh() {
        this._iDataCommands.RefreshAvailability();

        if (!this._skipNextSelectionState) {
            if (this.inspectedData.stack.isEmpty && !this._registerEmptySelection) {

            } else {

                this._stateStack.Push({
                    data: [...this._inspectedData.stack._array],
                    restore: (p_self) => {
                        this._skipNextSelectionState = true;
                        this._inspectedData.SetList(p_self.data);
                    }
                });
                
            }
        } else {
            this._skipNextSelectionState = false;
        }

    }

    //#endregion

    //#region Actions

    StartActionGroup(p_infos = null) {
        this._actionStack.ToggleGrouping(true, p_infos);
    }

    EndActionGroup() {
        this._actionStack.ToggleGrouping(false);
    }

    /**
     * @access public
     * @description Registers & executes an action in the local ActionStack.
     * @param {constructor} p_actionClass Action class to be executed
     * @param {object} p_operation Action' operation parameters
     * @group Actions
     */
    Do(p_actionClass, p_operation) {
        //this._actionStack.ToggleGrouping(ui.POINTER.DRAG_MULTIPLE); //TODO : Need a better approach for Group drag-related actions 
        this._actionStack.Do(p_actionClass, p_operation);
    }

    /**
     * @access public
     * @description Undo the last action in the local ActionStack.
     * @group Actions
     */
    Undo() { this._actionStack.Undo(); }

    /**
     * @access public
     * @description Redo the last undo'd action in the local ActionStack.
     * @group Actions
     */
    Redo() { this._actionStack.Redo(); }

    //#endregion

    _CleanUp() {
        this._skipNextSelectionState = false;
        this._stateStack.Clear();
        super._CleanUp();
    }

}

module.exports = Editor;
ui.Register('nkmjs-editor', Editor);