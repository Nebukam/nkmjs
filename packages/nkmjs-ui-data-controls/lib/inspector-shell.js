'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const CONTEXT = require(`./context`);

class InspectorShell extends ControlView {
    constructor() { super(); }

    static __clearBuilderOnRelease = true;

    _Init() {
        super._Init();
        this._inspector = null;
    }

    //#region DOM

    _Style() {
        return style.Extends({
            ':host': {
            }
        }, super._Style());
    }

    //#endregion

    //#region Data

    _OnDataChanged(p_oldData) {

        this._inspector = null;
        this._builder.Clear();

        super._OnDataChanged(p_oldData);

        if (this._data) {
            let inspectorClass = com.BINDINGS.Get(CONTEXT.INSPECTOR, this._data, null);
            if (inspectorClass) {
                this._inspector = this._builder.Add(inspectorClass, `inspector`);
                this._inspector.Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnInspectorRequestDisplay, this);
            }
        }

    }

    //#endregion

    //#region View

    _OnInspectorRequestDisplay() { this.RequestDisplay(); }

    DisplayGranted() { if (this._inspector) { this._inspector.DisplayGranted(); } }

    //#endregion

    _CleanUp() {
        this._inspector = null;
        super._CleanUp();
    }

}

module.exports = InspectorShell;
//ui.Register(`nkmjs-inspector-shell`, InspectorShell);
