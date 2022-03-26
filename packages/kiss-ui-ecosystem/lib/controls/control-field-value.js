const { U, C, M } = require(`../@.js`);
const { DisposableObjectEx } = require(`../collections/@.js`);
const { TitleBar } = require(`../ui-app/@.js`);
const UI = require(`../ui.js`);
const Control = require(`./control.js`);
const FieldValueOverlay = require(`./control-field-overlay.js`);

const INHERITED_VALUE = `inherited`;
const DEFAULTED_VALUE = `defaulted`;

class FieldValueControl extends Control{
    constructor(){super();}
    
    _Init(){
        super._Init();
        this._entry = null;
        this._fieldData = null;
        this._flags.Add(this, INHERITED_VALUE, DEFAULTED_VALUE);

        this._overlayClass = FieldValueOverlay;
        this._overlay = null;

    }

    get entry(){return this._entry;}
    set entry(p_value){this._entry = p_value;}

    get isInheritedValue(){return this._isInheritedValue;}
    set isInheritedValue(p_value){
        if(this._isInheritedValue === p_value){return;}
        this._isInheritedValue = p_value;
        this.SetFlag(INHERITED_VALUE, p_value);
    }

    get isDefaultValue(){return this._isDefaultValue;}
    set isDefaultValue(p_value){
        if(this._isDefaultValue === p_value){return;}
        this._isDefaultValue = p_value;
        this.SetFlag(DEFAULTED_VALUE, p_value);
    }

    get fieldData(){return this._fieldData;}
    set fieldData(p_value){ 
        if(this._fieldData === p_value){return;}
        this._fieldData = p_value;
        this._OnFieldDataChanged();
    }

    _Style(){
        return U.Merge(super._Style(), {
            ':host':{
                //'margin':`5px`
                'justify-content':`center`,
                'min-height':`50px`
            },
            ':host(.defaulted)':{
            },
            '.overlay':{
                display:`none`,
                'align-self':`center`,
                flex:`1 1 auto`
            },
            ':host(.inherited) .overlay':{
                display:`flex`
            }
        });
    }

    _PostRender(){
        super._PostRender();
        this._overlay = this.Attach(this._overlayClass, -1, this._host, `overlay`);
    }

    _OnDataUpdated(p_data){
        super._OnDataUpdated(p_data);

        let fieldID = p_data.id;
        // Try to get the 'raw' value
        let fData = this._entry.GetFieldData(fieldID, true);

        if(U.Void(fData)){
            // Get the inherited value and flag controller
            fData = this._entry.GetBaseFieldData(fieldID);
            this.isInheritedValue = true;
        }else{
            this.isInheritedValue = false;
        }

        this.fieldData = fData;

        //TODO : Need to check whether or not the value is inherited.
        this.isDefaultValue = fData === C.DEFAULT;

    }

    _OnFieldDataChanged(){
        let fieldData = this._fieldData;
        if(U.Void(fieldData)){ return false; }
        return true;
    }

    _CleanUp(){
        
        this.isInheritedValue = false;
        this.isDefaultValue = false;

        super._CleanUp();

        this.entry = null;
        this._fieldData = null;
    }

}

module.exports = FieldValueControl;
UI.Register(`nkmjs-field-value-control`, FieldValueControl);