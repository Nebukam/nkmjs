'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const Editor = require(`./editor`);

class Control extends ui.WidgetOrientable{
    constructor(){super();}

    _Init(){
        super._Init();
        this._metadataObserver = new data.helpers.MetadataObserver();

        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);
    }

    get context(){ return this._context; }
    set context(p_value){
        if(this._context === p_value){ return; }
        let oldValue = this._context;
        this._context = p_value;
        this._OnContextChanged(oldValue);
    }

    _OnContextChanged( p_oldValue ){

    }

    get editor(){
        let p = this._parent;
        while(p != null){
            if(u.isInstanceOf(p, Editor)){return p;}
            p = p._parent;
        }
        return null;
    }

    _Style(){
        return style.Extends({
            ':host':{
                position:`relative`,
                display:`flex`,
                flex:`0 1 auto`,
                'min-width': 0,
            }
        }, super._Style());
    }

    // ----> DATA

    _OnDataChanged(p_oldValue){
        super._OnDataChanged(p_oldValue);
        if(u.isInstanceOf(this._data, data.DataBlock)){ this._metadataObserver.target = this._data.metadata; }
        else{ this._metadataObserver.target = null; }
    }

    _OnDataDirty(p_data){
        this._OnDataUpdated(p_data); // <- Overkill much ?
    }

    _CleanUp(){
        this.context = null;
        super._CleanUp();
    }

    _Do(p_actionClass, p_operation){
        actions.CommandAction.Do(this, p_actionClass, p_operation);
    }

}

module.exports = Control;
ui.Register(`nkmjs-control`, Control);
