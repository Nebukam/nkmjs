'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const SIGNAL = require(`../signal`);
const CONTEXT = require(`../context`);
const ControlView = require(`../control-view`);
const InspectionDataHandler = require(`../helpers/inspection-data-handler`);

const base = ControlView;

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
class AutoInspector extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/inspector-shell.css`]
    }, base, ['css']);

    _Init() {

        super._Init();

        //TODO : Tab to switch between solo & multi edit when both are available

        this._inspectionHandler = new InspectionDataHandler(this);
        this._inspectionHandler
            .Watch(com.SIGNAL.ITEM_BUMPED, this._OnItemBumped, this)
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Watch(com.SIGNAL.UPDATED, this._OnSelectionUpdated, this)
            .Watch(ui.SIGNAL.SEL_CLEARED, this._OnSelectionCleared, this);

        this.forwardEditor.To(this._inspectionHandler);

    }

    static _Style() {
        return style.Extends({
            ':host': {

            }
        }, base._Style());
    }

    //#region Data

    _OnItemBumped(p_item) {

    }

    _OnItemAdded(p_item) {

    }

    _OnItemRemoved(p_item) {

    }

    _OnSelectionUpdated(p_sel) {

    }

    _OnSelectionCleared(p_sel) {

    }

    //#endregion

}

module.exports = AutoInspector;
//ui.Register(`nkmjs-inspector-shell`, InspectorShell);
