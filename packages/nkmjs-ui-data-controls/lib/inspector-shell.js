'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const CONTEXT = require(`./context`);
const ControlView = require(`./control-view`);

/**
 * @description An InspectorShell is primarily designed to be used by an Editor. 
 * It's a simple wrapper that will fetch the right inspector from global bindings based on the data it is given.
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

        // TODO : Check whether we can re-use the existing inspector instead of creating a new one
        this._inspector = null;
        this._builder.Clear();

        super._OnDataChanged(p_oldData);


        if (this._data) {
            let inspectorClass = com.BINDINGS.Get(CONTEXT.INSPECTOR, this._data, null);
            if (inspectorClass) {
                this._inspector = this._builder.Add(inspectorClass, `inspector`);
                this._inspector.Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnInspectorRequestDisplay, this);
                if(this._isDisplayed){ this._inspector.DisplayGranted(); }
            }
        }

    }

    //#endregion

    //#region View

    _OnInspectorRequestDisplay() { this.RequestDisplay(); }

    _OnDisplayGain() {
        super._OnDisplayGain();
        if (this._inspector) {
            this._inspector.DisplayGranted();
        }
    }

    _OnDisplayLost() {
        super._OnDisplayLost();
        if (this._inspector) {
            this._inspector.DisplayLost();
        }
    }

    //#endregion

    _CleanUp() {
        this._inspector = null;
        super._CleanUp();
    }

}

module.exports = InspectorShell;
//ui.Register(`nkmjs-inspector-shell`, InspectorShell);
