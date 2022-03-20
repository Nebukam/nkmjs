'use strict';

const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");
const data = require("@nkmjs/data-core");
const datacontrols = require("@nkmjs/ui-data-controls");


const items = require(`./items`);

class ActionStackInspector extends datacontrols.InspectorView {
    constructor() { super(); }

    static __itemHeight = 32;
    static __domStreamer_layout = {
        itemSlots: 1,
        itemSize: this.__itemHeight,
        itemCount: 0,
        fixedSize: true
    };

    static __default_actionItem = items.Action;

    _Init() {
        super._Init();

        this._dataObserver.Hook(com.SIGNAL.ITEM_ADDED, this._OnActionAdded, this);
        this._actionMap = new Map();

        this._InitSelectionStack();
        this._selectionStack.allowMultiple = false;

    }

    _Style() {
        return style.Extends({
            ':host': {
                
            },
            '.list':{
                'display':`flex`,
                'flex-flow':'column nowrap'
            },
            '.list':{
                'flex':'0 0 auto'
            }
        }, super._Style());
    }

    _Render() {

        super._Render();

        this._actionList = ui.El(`div`, {class:`list`}, this._host);

        this._rootItem = this.Add(this.constructor.__default_actionItem, `item`, this._actionList);
        this._rootItem.data = actions.ActionStack.ROOT;

        this._itemStreamer = this.Add(ui.helpers.DOMStreamer, `item group streamer`, this._actionList);
        this._itemStreamer.options = {
            layout: { ...this.constructor.__domStreamer_layout }
        };

        this._itemStreamer
            .Watch(ui.SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this._OnRequestRangeUpdate, this)
            .Watch(ui.SIGNAL.ITEM_REQUESTED, this._OnActionItemRequest, this);

    }

    _OnDataUpdated(p_data, p_action = null) {
        super._OnDataUpdated(p_data);

        if (p_action) {
            let item = this._actionMap.get(p_action);
            if (item) {
                //TODO: Update item
                item.Refresh();
            }
        }
    }

    _OnActionAdded(p_stack, p_action) {
        this._itemStreamer.itemCount = p_stack.count;
    }

    _OnRequestRangeUpdate(p_streamer, p_infos) {

    }

    _OnActionItemRequest(p_streamer, p_index, p_fragment) {

        let
            action = this._data._stack[p_index],
            item = this.Add(
                com.BINDINGS.Get(this._owner, action, this.constructor.__default_actionItem),
                `item`, p_fragment);

        item.Watch(com.SIGNAL.RELEASED, this._OnActionItemRelelased, this);
        this._actionMap.set(action, item);
        item.data = action;

        p_streamer.ItemRequestAnswer(p_index, item);

    }

    _OnActionItemRelelased(p_item) {
        let action = p_item.data;
        this._actionMap.delete(action);    
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        console.log(this._data);
    }

    //

    _OnSelectionStackAdd(p_item) {
        this._data.GoToAction(p_item.data);            
        this._selectionStack.Clear();
    }

    _OnSelectionStackRemove(p_item) { }


}

module.exports = ActionStackInspector;