'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class InspectionDataBridge extends com.pool.DisposableObjectEx {

    constructor(p_owner) {
        super();
        this._owner = p_owner;
        this._smartClear = true;
        this._dataSelection = null;
    }

    _Init() {
        super._Init();

        this._selectionObserver = new com.signals.Observer();
        this._selectionObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this.OnSeAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this.OnSelRemoved, this)
            .Hook(com.SIGNAL.ITEM_BUMPED, this.OnSelBumped, this);

        this._inspectionObserver = new com.signals.Observer();
        this._inspectionObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this.OnInspectionAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this.OnInspectionRemoved, this)
            .Hook(com.SIGNAL.ITEM_BUMPED, this.OnInspectionBumped, this);


    }

    set editor(p_value) { this.inspectionData = p_value ? p_value.inspectedData : null; }

    set dataSelection(p_value) {
        if (u.isInstanceOf(p_value, ui.helpers.WidgetSelection)) { p_value = p_value.data; }
        this._dataSelection = p_value;
        this._selectionObserver.ObserveOnly(p_value);
    }
    set inspectionData(p_value) {
        if (this._inspectionData == p_value) { return; }

        let oldValue = this._inspectionData;
        this._inspectionData = p_value;
        this._inspectionObserver.ObserveOnly(p_value);

        if (oldValue) {
            // Clear item from local dataSelection ? 
        }

        if (p_value) {
            // Forward items from local dataSelection
        }

    }

    //#region Inspect selected data

    OnSeAdded(p_item) {
        if (!this._inspectionData) { return; }
        if (this._smartClear && this._dataSelection) {
            if (this._dataSelection.stack.count == 1 && this._dataSelection.stack.last == p_item) {
                // Clear the inspected selection if the managed selection is a fresh new one
                if (!this._mirroring) { this._inspectionData.Clear(); }
            }
        }
        this._inspectionData.Add(p_item);
    }

    OnSelRemoved(p_item) {
        if (!this._inspectionData) { return; }
        this._inspectionData.Remove(p_item);
    }

    OnSelBumped(p_item) {
        if (!this._inspectionData) { return; }
        this._inspectionData.Bump(p_item);
    }

    //#endregion

    //#region Maintain data from inspection

    OnInspectionAdded(p_sel, p_item) {
        if (!this._dataSelection) { return; }
        if (this._dataSelection._dataSet.has(p_item)) { return; }
        this._mirroring = true;
        let index = this._dataSelection.RequestIndex(p_item);
        if (index != -1) { this._dataSelection.RequestAdd(index); }
        else { this._dataSelection.Add(p_item, -1, ui.INPUT.SELECT_MODIFIER_ADD); }
        this._mirroring = false;
    }

    OnInspectionRemoved(p_sel, p_item) {
        if (!this._dataSelection) { return; }
        if (!this._dataSelection._dataSet.has(p_item)) { return; }
        this._mirroring = true;
        let index = this._dataSelection.RequestIndex(p_item);
        if (index != -1) { this._dataSelection.RequestRemove(index, p_item); }
        this._dataSelection.Remove(p_item);
        this._mirroring = false;
    }

    OnInspectionBumped(p_sel, p_item) {
        if (!this._dataSelection) { return; }
        //TODO : Huh.
    }

    //#endregion

}

module.exports = InspectionDataBridge;