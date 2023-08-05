'use strict';

const com = require("@nkmjs/common");
const u = require(`@nkmjs/utils`);
const actions = require("@nkmjs/actions");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const col = require(`@nkmjs/collections`);

const IDS = require(`./ids`);
const SIGNAL = require(`./signal`);
const InspectionDataList = require(`./helpers/inspection-data-list`);

const __editorMap = new col.DictionaryList();
const __activeData = new Set();

//#region Global editor tracking

function __CheckEditorMap() {

    let stack = [];

    for (const d of __activeData) {
        if (!__editorMap.Count(d)) { stack.Add(d); }
    }

    for (const d of stack) {
        __activeData.delete(d);
        d.Broadcast(data.SIGNAL.NO_ACTIVE_EDITOR, d);
    }

}

function __Register(p_editor, p_data) {
    console.log(`__Register ${p_editor} :::: ${p_data}`);
    __editorMap.Set(p_data, p_editor);
    __activeData.add(p_data);
    p_data.Broadcast(data.SIGNAL.ACTIVE_EDITOR_GAIN, p_data, p_editor);
}

function __Unregister(p_editor, p_data) {
    console.log(`__Unregister ${p_editor} :::: ${p_data}`);
    __editorMap.Remove(p_data, p_editor);
    p_data.Broadcast(data.SIGNAL.ACTIVE_EDITOR_LOST, p_data, p_editor);
    __delayedCheckEditorMap.Schedule();
}

//#endregion

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
    constructor() { super(); this._fullyInitialized = true; }
    /*
        static __NFO__ = com.NFOS.Ext({
            css: [`@/views/global-editor.css`]
        }, base, ['css']);
    */
    static __registerableEditor = false;
    static __default_shortcutRequireFocus = true;

    _Init() {

        /** @type {com.helpers.Setter} */
        this._forwardData = this.forwardData; //Ensure it exists

        /** @type {com.helpers.Setter} */
        this._forwardContext = new com.helpers.Setter(this, IDS.CONTEXT);

        /** @type {com.helpers.Setter} */
        this._forwardEditor = new com.helpers.Setter(this, IDS.EDITOR);

        let getSelf = () => { return this._releasing ? null : this; };
        let getData = () => { return this._releasing ? null : this._data; };

        this._forwardData.AddRelatives(this._forwardEditor, getSelf);
        this._forwardData.AddRelatives(`editor`, getSelf, true);

        this._forwardData.AddRelatives(this._forwardContext, getData);
        this._forwardData.AddRelatives(`context`, getData, true);

        this._forwardContext.AddRelatives(this._forwardEditor, getSelf);
        this._forwardContext.AddRelatives(`editor`, getSelf, true);

        super._Init();

        //TODO : Find a way to invalidate action stacks // <--- WTF ?
        /**
         * @type {actions.ActionStack}
         */
        this._actionStack = new actions.ActionStack();

        this._flags.Add(this, com.FLAGS.WARNING);

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

        this._defaultModalContentOptions = () => { return { editor: this, data: this._data, context: this._context } };

    }

    _PostInit() {

        super._PostInit();
        this._RegisterEditorBits();

        this._inspectedData.preProcessData = this._inspectedDataPreProcessor;

    }

    /**
     * @type {com.helpers.Setter}
     */
    get forwardContext() { return this._forwardContext; }

    /**
     * @type {com.helpers.Setter}
     */
    get forwardEditor() { return this._forwardEditor; }

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

        if (this._data) { this._forwardContext.Set(this._data); }

        super._OnDataChanged(p_oldData);

        if (!this._data) { this._forwardContext.Set(null); }

        this.inspectedData.Clear();

        if (this.constructor.__registerableEditor) {
            if (p_oldData) { __Unregister(this, p_oldData); }
            if (this._data) { __Register(this, this._data); }
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

    Wake() {
        super.Wake?.();
        this._forwardEditor.Set(this);
        this._forwardContext._BatchSet(`editor`, this);
        this._forwardData._BatchSet(`editor`, this);
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
                    data: [...this._inspectedData.stack],
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
     * @param {object} p_op Action' operation parameters
     * @group Actions
     */
    Do(p_actionClass, p_op) {
        //this._actionStack.ToggleGrouping(ui.POINTER.DRAG_MULTIPLE); //TODO : Need a better approach for Group drag-related actions 
        this._actionStack.Do(p_actionClass, p_op);
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

        this.data = null;

        super._CleanUp();

        this._forwardContext.Set(null);
        this._forwardEditor.Set(null);

        this._forwardContext.Clear();
        this._forwardEditor.Clear();

    }

}

module.exports = Editor;
ui.Register('nkmjs-editor', Editor);