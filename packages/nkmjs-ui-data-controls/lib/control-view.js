'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const Editor = require(`./editor`);

class ControlView extends ui.views.View {
    constructor() { super(); }

    static __clearBuilderOnRelease = false;
    static __controls = null;

    _Init() {
        super._Init();
        this._metadataObserver = new data.helpers.MetadataObserver();
        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);
        this._builder = new helpers.ControlBuilder(this);
    }

    //#region Context

    get context() { return this._context; }
    set context(p_value) {
        if (this._context === p_value) { return; }
        let oldValue = this._context;
        this._context = p_value;
        this._OnContextChanged(oldValue);
        this._builder.context = p_value;
    }

    _OnContextChanged(p_oldValue) {

    }

    //#endregion

    get editor() {
        let p = this._parent;
        while (p != null) {
            if (u.isInstanceOf(p, Editor)) { return p; }
            p = p._parent;
        }
        return null;
    }

    //#region DOM

    _Style() {
        return style.Extends({
            ':host': {
            }
        }, super._Style());
    }

    _Render() {
        super._Render();
        let controlList = this.constructor.__controls;
        if (controlList) { this._builder.Build(controlList); }
    }

    //#endregion

    //#region Data

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);
        if (u.isInstanceOf(this._data, data.DataBlock)) { this._metadataObserver.target = this._data.metadata; }
        else { this._metadataObserver.target = null; }
        this._builder.data = this._data;
    }

    _OnDataDirty(p_data) {
        this._OnDataUpdated(p_data); // <- Overkill much ?
    }

    //#endregion

    _Do(p_actionClass, p_operation) {
        actions.CommandAction.Do(this, p_actionClass, p_operation);
    }

    _CleanUp() {
        if (this.constructor.__clearBuilderOnRelease) { this._builder.Clear(); }
        this.context = null;
        super._CleanUp();
    }

}

module.exports = ControlView;
//ui.Register(`nkmjs-control-view`, ControlView);
