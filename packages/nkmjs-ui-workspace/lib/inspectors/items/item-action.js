// Extendable Data block BASE editor
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const datacontrols = require("@nkmjs/ui-data-controls");
const actions = require("@nkmjs/actions");
const ui = require("@nkmjs/ui-core");

class ActionInspectorItem extends datacontrols.InspectorWidget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/items/action.css`]
    }, datacontrols.InspectorWidget, ['css']);

    _Init() {
        this.default_SelectOnActivation = true;
        super._Init();
        this._notifiesSelectionStack = true;        
    }

    _PostInit() {
        super._PostInit();
        this.focusArea = this;
    }

    _Style() {
        return style.Extends({
            ':host': {
                
            },
            ':host(.done)':{
                'opacity':`1`
            },
            ':host(.undone)':{
                'opacity':`0.5`
            }
        }, super._Style());
    }

    //TODO : Handle action state updates...
    _Render() {
        super._Render();
        this._icon =  new ui.manipulators.Icon(ui.El(`div`, { class: `icon` }, this._host));
        this._label = new ui.manipulators.Text(ui.El(`span`, { class: `label` }, this._host));
        this._icon.Set(`superior-or-equal`);
    }

    _OnDataChanged(p_oldData){
        super._OnDataChanged(p_oldData);
        if(this._data){
            this.Refresh();
        }
    }

    Refresh(){
        this._label.Set(this._data.title);
        this.htitle = this._data.htitle;

        if(this._data.undoed){
            this.classList.add(actions.ACTION_STATE.UNDONE);
            this.classList.remove(actions.ACTION_STATE.DONE);
        }else{
            this.classList.remove(actions.ACTION_STATE.UNDONE);
            this.classList.add(actions.ACTION_STATE.DONE);
        }
    }

    Activate(p_evt){
        super.Activate(p_evt);
        console.log(`Activated`);
    }

}

module.exports = ActionInspectorItem;