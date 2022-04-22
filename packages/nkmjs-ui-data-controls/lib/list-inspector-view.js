/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * - provide a context for registering specific sub-inspectors
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const helpers = require(`./helpers`);
const ControlView = require("./control-view");
const InspectorView = require("./inspector-view");

const base = InspectorView;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlView
 * @memberof ui.datacontrols
 */
class ListInspectorView extends base {
    constructor() { super(); }

    /*
    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/inspector-view.css`]
    }, base, ['css']);
    */



    _Init() {
        super._Init();
        this.forwardData.Remove(this._builder);
        this._dataType = null;
    }

    static _Style() {
        return style.Extends({
            ':host': {

            },
        }, base._Style());
    }

    get dataType() { return this._dataType; }
    set dataType(p_value){
        if(this._dataType == p_value){return;}
        let old = this._dataType;
        this._dataType = p_value;
        this._OnDataTypeChanged(old);
    }

    get itemCount() { return this._data ? this._data.stack.count : 0; }

    _OnDataTypeChanged(p_oldValue){

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        //There's been either additions or removals. (no bumps)
    }

}

module.exports = ListInspectorView;
//ui.Register('nkmjs-list-inspector-view', InspectorView);