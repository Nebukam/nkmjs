// Extendable Data block BASE editor
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const datacontrols = require("@nkmjs/ui-data-controls");
const actions = require("@nkmjs/actions");
const ui = require("@nkmjs/ui-core");

const base = datacontrols.ControlWidget;

class ActionInspectorItem extends base {
    constructor() { super(); }

    static __itemHeight = 32;
    static __defaultSelectOnActivation = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/items/action.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._notifiesSelectionStack = true;
        ui.helpers.FlagEnum.Attach(this, `state`, actions.ACTION_STATE.stateList);
    }

    _PostInit() {
        super._PostInit();
        this.focusArea = this;
    }

    static _Style() {
        return style.Extends({
            ':host': {
                'min-height': `${this.__itemHeight}px`,
                'cursor': `pointer`
            },
            ':host(.done)': {
                'opacity': `1`
            },
            ':host(.undone)': {
                'opacity': `0.5`
            }
        }, base._Style());
    }

    //TODO : Handle action state updates...
    _Render() {
        super._Render();
        this._hint = new ui.manipulators.Icon(ui.El(`div`, { class: `hint` }, this._host));
        this._icon = new ui.manipulators.Icon(ui.El(`div`, { class: `icon` }, this._host));
        this._label = new ui.manipulators.Text(ui.El(`span`, { class: `label` }, this._host));
        this._icon.Set(`action`);
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        if (this._data) {
            this.Refresh();
        }
    }

    Refresh() {
        let infos = this._data.displayInfos;
        this._label.Set(infos.name);
        this.htitle = infos.title;
        this._icon.Set(infos.icon);
        this.state = this._data.state;
    }

    Activate(p_evt) {
        super.Activate(p_evt);
    }

}

module.exports = ActionInspectorItem;