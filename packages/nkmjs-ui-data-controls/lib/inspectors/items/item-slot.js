/*
Field Descriptor Control 
This manipulate a slot -- whether in the context of a slot, or setting a value.
*/

const datalib = require("@nkmjs/data-library");
const InspectorWidget = require("../../inspector-widget");

const base = InspectorWidget;

class SlotInspectorItem extends base{
    constructor(){super();}

    _Init(){
        super._Init();
        this._descriptor = null;
        //this._dataObserver.Hook(datalib.SIGNAL.DESCRIPTOR_CHANGED, this._OnSlotDescriptorChanged, this);
    }

    _OnSlotDescriptorChanged(p_slot, p_newDescriptor, p_oldDescriptor){
        this._descriptor = p_newDescriptor;
    }

    _OnDescriptorChanged(){
        // if slot composite, create sub-controllers ?
    }

}

module.exports = SlotInspectorItem;