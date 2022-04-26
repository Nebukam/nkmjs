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
class InspectionDataForward extends com.pool.DisposableObjectEx {

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
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(com.SIGNAL.ITEM_BUMPED, this._OnItemBumped, this);

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

        if (oldValue) {
            // Clear item from local dataSelection ? 
        }

        if (p_value) {
            // Forward items from local dataSelection
        }

    }

    _OnItemAdded(p_item) {
        if (!this._inspectionData) { return; }
        if (this._smartClear && this._dataSelection) {
            if (this._dataSelection.stack.count == 1 && this._dataSelection.stack.last == p_item) {
                this._inspectionData.Clear();
            }
        }
        this._inspectionData.Add(p_item);
    }

    _OnItemRemoved(p_item) {
        if (!this._inspectionData) { return; }
        this._inspectionData.Remove(p_item);
    }

    _OnItemBumped(p_item) {
        if (!this._inspectionData) { return; }
        this._inspectionData.Bump(p_item);
    }

}

module.exports = InspectionDataForward;