const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);
const data = require(`@nkmjs/data-core`);

const Control = require(`../control`);

class InspectorItem extends Control{
    constructor(){super();}

    _Init(){
        this._ignoreMetaStyle = u.tils.Default(this._ignoreMetaStyle, false);
        this.default_SelectOnActivation = u.tils.Default(this.default_SelectOnActivation, true);
        super._Init();

        if(!this._ignoreMetaStyle){
            this._metadataObserver.Hook(
                data.SIGNAL.META_MID_UPDATE, 
                `presentation`,
                this._OnMetaPresentationChanged,
                this);
        }
    }

    _OnDataChanged(p_oldValue){
        super._OnDataChanged(p_oldValue);
        if(this._data){
            if(this._data.metadata && !this._ignoreMetaStyle){ this._UpdateMetaPresentation(); }
        }
    }

    _OnMetaPresentationChanged(p_meta, p_path){
        this._UpdateMetaPresentation();
    }    

    _UpdateMetaPresentation(){
        let color = u.tils.HexToRGBAString(
            this._data.metadata.Get(`presentation.color`, `#000000`), 
            this._data.metadata.Get(`presentation.weight`, 0.1));
        this.style['box-shadow'] = `inset 1px 0px 0px ${color}`;
    }

}

module.exports = InspectorItem;
ui.Register(`nkmjs-inspector-item`, InspectorItem);