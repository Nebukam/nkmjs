'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const SIGNAL = require(`./signal`);
const CONTEXT = require(`./context`);
const ControlView = require(`./control-view`);
const InspectionDataHandler = require(`./helpers/inspection-data-handler`);

/**
 * @description An InspectorShell is designed to work with an Editor.
 * It works around a given editor InspectableSelection, and attempts to fetch an inspector bound to
 * the editor selection' contents.
 * If the InspectableSelection has a sharedType, it will first look for DEFAULT_LIST_INSPECTOR.
 * If none exists, it falls back to DEFAULT_INSPECTOR, and forwards the last/bumped data from the inspected list.
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlView
 * @memberof ui.datacontrols
 */
class InspectorShell extends ControlView {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/inspector-shell.css`]
    }, ControlView, ['css']);

    static __clearBuilderOnRelease = true;
    static __placeholderViewClass = null;

    _Init() {

        super._Init();

        //TODO : Tab to switch between solo & multi edit when both are available

        this._inspector = null;
        this._inspectionHandler = new InspectionDataHandler(this);
        this._inspectionHandler
            .Watch(com.SIGNAL.ITEM_BUMPED, this._OnItemBumped, this)
            .Watch(SIGNAL.SELECTION_LASTTYPE_CHANGED, this._OnLastTypeChanged, this)
            .Watch(SIGNAL.SELECTION_SHAREDTYPE_CHANGED, this._OnSharedTypeChanged, this)
            .Watch(com.SIGNAL.UPDATED, this._OnSelectionUpdated, this);

        this._inspectionHandler
            .AddSingleContexts(CONTEXT.DEFAULT_INSPECTOR)
            .AddListContexts(CONTEXT.DEFAULT_LIST_INSPECTOR);

        this._inspectorPlaceholderClass = this.constructor.__placeholderViewClass;
        this._singleInspectorClass = null;
        this._listInspectorClass = null;

        this._singleInspectorNeedUpdate = true;
        this._listInspectorNeedUpdate = true;
        this._useListInspector = false;

        this._inspectorPlaceholder = null;

    }

    _Style() {
        return style.Extends({
            ':host': {

            }
        }, super._Style());
    }

    //#region Data

    _OnEditorChanged(p_oldEditor) { this._inspectionHandler.editor = this._editor; }

    _OnLastTypeChanged(p_sel, p_newType, p_oldType) {

        let inspectorClass = this._inspectionHandler.GetSingleCl(CONTEXT.DEFAULT_INSPECTOR, p_newType);

        if (this._singleInspectorClass != inspectorClass) {
            this._singleInspectorClass = inspectorClass;
            this._singleInspectorNeedUpdate = true;
        }

    }

    _OnSharedTypeChanged(p_sel, p_newType, p_oldType) {

        let inspectorClass = this._inspectionHandler.GetListCl(CONTEXT.DEFAULT_LIST_INSPECTOR, p_newType);

        if (this._listInspectorClass != inspectorClass) {
            this._listInspectorClass = inspectorClass;
            this._listInspectorNeedUpdate = true;
        }

    }

    _UpdateInspectorInstance(p_useList = false) {

        if (!this._singleInspectorNeedUpdate &&
            !this._listInspectorNeedUpdate &&
            this._useListInspector == p_useList) { return; }

        let
            needUpdate = false,
            inspectorClass = null,
            isListInspector = false;

        if (p_useList && this._listInspectorClass) {
            isListInspector = true;
            if (this._listInspectorNeedUpdate) {
                needUpdate = true;
                inspectorClass = this._listInspectorClass;
                this._listInspectorNeedUpdate = false;
            } else if (!this._useListInspector) {
                needUpdate = true;
                inspectorClass = this._listInspectorClass;
            }
        } else if (this._singleInspectorClass) {

            needUpdate = this._useListInspector;

            if (this._singleInspectorNeedUpdate) {
                needUpdate = true;
                inspectorClass = this._singleInspectorClass;
                this._singleInspectorNeedUpdate = false;
            } else {
                inspectorClass = this._singleInspectorClass;
            }
        } else {
            needUpdate = true;
            inspectorClass = null;
        }



        if (!needUpdate) { return; }

        this._useListInspector = isListInspector;

        if (this._inspector) {
            this.forwardContext.Remove(this._inspector);
            this._inspector.Release();
            this._inspector = null;
            //TODO : Display placeholder inspector
        }

        if (inspectorClass) {
            this._inspector = this.Attach(inspectorClass, `inspector`);
            this._inspector.context = this._context;
            this._inspector.Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnInspectorRequestDisplay, this);
            this.forwardContext.To(this._inspector);
        }

    }

    _OnSelectionUpdated(p_sel) {

        this._UpdateInspectorInstance(p_sel.isList);

        if (!this._inspector) {
            if (this._inspectorPlaceholder) {
                this._inspectorPlaceholder.visible = true;
            }
            return;
        } else {
            if (this._inspectorPlaceholder) {
                this._inspectorPlaceholder.visible = false;
            }
        }

        if (this._useListInspector) { this._inspector.data = p_sel; }
        else {
            this._inspector.dataType = p_sel.sharedType;
            this._inspector.data = p_sel.lastItem;
        }

        if (this._isDisplayed) { this._inspector.DisplayGranted(); }

    }

    _OnItemBumped(p_item) {

        if (!this._inspector) { return; }

        if (this._useListInspector) {
            //TODO : DUUUUH
        } else {
            this._inspector.data = p_item;
        }

    }

    //#endregion

    _Render() {
        super._Render();
        if (this._inspectorPlaceholderClass) {
            this._inspectorPlaceholder = this.Attach(this._inspectorPlaceholderClass, `placeholder`);
            //this._inspectorPlaceholder.visible = false;
        }
    }

    //#region View

    _OnInspectorRequestDisplay() { this.RequestDisplay(); }

    _OnDisplayGain() {
        super._OnDisplayGain();
        if (this._inspector) { this._inspector.DisplayGranted(); }
    }

    _OnDisplayLost() {
        super._OnDisplayLost();
        if (this._inspector) { this._inspector.DisplayLost(); }
    }

    //#endregion

    _CleanUp() {
        if (this._inspector) {
            this._inspector.Release();
            this._inspector = null;
        }

        this._inspectorPlaceholderClass = this.constructor.__placeholderViewClass;
        super._CleanUp();
    }

}

module.exports = InspectorShell;
//ui.Register(`nkmjs-inspector-shell`, InspectorShell);
