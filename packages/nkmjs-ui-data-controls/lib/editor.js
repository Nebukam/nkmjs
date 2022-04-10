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
    console.log(`__CheckEditorMap`, __editorMap, __activeData);
    let stack = [];
    __activeData.forEach(p_data => {
        // Check if still edited.
        if (__editorMap.Count(p_data) == 0) { stack.push(p_data); }
        for (let i = 0; i < stack.length; i++) {
            let d = stack[i];
            __activeData.delete(d);
            d.Broadcast(data.SIGNAL.NO_ACTIVE_EDITOR, d);
        }
    })
}

const __delayedCheckEditorMap = com.DelayedCall(__CheckEditorMap);

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
class Editor extends ui.views.View {
    constructor() { super(); }
    /*
        static __NFO__ = com.NFOS.Ext({
            css: [`@/views/global-editor.css`]
        }, ui.views.View, ['css']);
    */
    static __registerableEditor = false;

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
        this._shortcuts = new actions.helpers.Shortcuts();

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

        this.forwardData.To(this._commands, { mapping: `context` });

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

    }

    _OnInspectableItemRemoved(p_selection, p_data) {

    }

    _OnInspectableItemBumped(p_selection, p_data) {

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

    /**
     * @description Callback when the view handler granted display to another view.
     * @customtag override-me
     */
    _OnDisplayGain() {
        super._OnDisplayGain();
        this._shortcuts.Enable();
    }

    /**
    * @description Callback when the view handler granted display to another view.
    * @customtag override-me
    */
    _OnDisplayLost() {
        super._OnDisplayLost();
        this._shortcuts.Disable();
    }

}

module.exports = Editor;
ui.Register('nkmjs-editor', Editor);