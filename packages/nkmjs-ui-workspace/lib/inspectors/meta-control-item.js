const u = require("@nkmjs/utils");
const { UI_ID, UI, manipulators } = require(`@nkmjs/ui-core`);
const { Metadata, ActionMetadataSet } = require(`@nkmjs/data-core`);
const { INPUT_SIGNAL, InputField } = require(`@nkmjs/ui-inputs`);

const InspectorItem = require(`./inspector-item`);

class MetaControlItem extends InspectorItem{
    constructor(){super();}
    
    _Init(){

        this.default_SelectOnActivation = false;
        this._ignoreMetaStyle = true;

        super._Init();

        this._metaPath = '';
        this._metaID = '';

        this._inputClass = InputField;
        this._input = null;

        this._label = null;

    }

    // ----> DOM

    _Style(){
        return u.tils.Merge(super._Style(), {
            ':host':{
                margin:`5px`,
                padding:`6px`,
                display:`flex`,
                'flex-flow':`column`,
                'align-items':`stretch`,
                'align-content':`stretch`,
            },
            '.facade':{ 
                flex:`1 1 auto`,
                'margin-top':`-5px`,
                'margin-bottom':`0px`
            },
            '.control':{
                flex:`1 1 auto`,
            }
        });
    }

    _Render(){
        super._Render();
        this._label = new manipulators.Text(u.dom.New(`span`, { class: UI_ID.LABEL }, this._host));
    }

    get metaPath(){return this._metaPath;}
    set metaPath(p_value){
        this._metaPath = p_value;
    }

    get metaID(){return this._metaID;}
    set metaID(p_value){
        this._metaID = p_value;
        this._facade.text = p_value;
    }

    _OnDataChanged(p_oldValue){
        super._OnDataChanged(p_oldValue);

        if(this._input){
            this._input.Release();
            this._input = null;
        }

        if(!this._data){ return; }

        let mData = u.tils.isInstanceOf(this._data, Metadata) ? this._data : this._data.metadata;
        let obj = mData.Get(this._metaPath, null);
        
        if(u.tils.Void(obj)){ return; }

        this._input = this.Add(this._inputClass, `control`);
        this._OnInputCreated(this._input);
        this._input.Watch(INPUT_SIGNAL.VALUE_SUBMITTED, this._OnInputValueCommited, this);
        this._input.currentValue = obj;

    }

    _OnInputCreated(p_input){

    }

    _OnInputValueCommited(p_input, p_changedValue){

        let mData = u.tils.isInstanceOf(this._data, Metadata) ? this._data : this._data.metadata;
        let mPath = this._metaPath;

        this._Do( ActionMetadataSet, {
            target : mData,
            path : mPath,
            value : p_changedValue
        });
        
        this._input.currentValue = mData.Get(mPath, undefined);

    }

    _CleanUp(){
        this._metaPath = '';
        super._CleanUp();
    }

}

module.exports = MetaControlItem;
UI.Register(`nkmjs-meta-control-item`, MetaControlItem);