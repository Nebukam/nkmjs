'use strict';

const { U } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);
const { CSS } = require(`@nkmjs/style`);
const { DATA_SIGNAL, DataBlock, MetadataObserver } = require(`@nkmjs/data-core`);
const { UI, OrientableWidget } = require(`@nkmjs/ui-core`);
const { CommandAction } = require(`@nkmjs/actions`);

const Editor = require(`./editor`);

class Control extends OrientableWidget{
    constructor(){super();}

    _Init(){
        super._Init();
        this._metadataObserver = new MetadataObserver();

        this._dataObserver.Hook(DATA_SIGNAL.DIRTY, this._OnDataDirty, this);
        this._dataObserver.Hook(SIGNAL.UPDATED, this._OnDataUpdated, this);
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
            if(U.isInstanceOf(p, Editor)){return p;}
            p = p._parent;
        }
        return null;
    }

    _Style(){
        return CSS.Extends({
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
        if(U.isInstanceOf(this._data, DataBlock)){ this._metadataObserver.target = this._data.metadata; }
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
        CommandAction.Do(this, p_actionClass, p_operation);
    }

}

module.exports = Control;
UI.Register(`nkmjs-control`, Control);
