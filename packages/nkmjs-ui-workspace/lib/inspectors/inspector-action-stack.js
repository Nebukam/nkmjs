'use strict';

const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");
const data = require("@nkmjs/data-core");
const datacontrols = require("@nkmjs/ui-data-controls");
const uilib = require("@nkmjs/ui-library");

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

        this._dataObserver
        .Hook(com.SIGNAL.ITEM_ADDED, this._OnActionAdded, this)
        .Hook(com.SIGNAL.ITEM_REMOVED, this._OnActionRemoved, this);
        this._actionMap = new Map();

        this._InitSelectionStack(true, true);

    }

    _Style() {

        return style.Extends({
            ':host': {
                'display': `flex`,
                'flex-flow': 'column nowrap',
            },
            '.list': {
                'display': `flex`,
                'flex-flow': 'column nowrap',
                'flex': '1 1 auto',
                'min-height':0,
                'overflow':'auto'
            },
            '.item':{
                'min-height':`${this.__itemHeight}px`
            },
            '.toolbar':{
                'padding':'10px',
                'flex': '0 0 auto',
            }

        }, super._Style());

    }

    _Render() {

        super._Render();

        this._actionList = ui.El(`div`, { class: `list` }, this._host);

        this._rootItem = this.Attach(this.constructor.__default_actionItem, `item`, this._actionList);
        this._rootItem.data = actions.ActionStack.ROOT;

        this._itemStreamer = this.Attach(ui.helpers.DOMStreamer, `item group streamer`, this._actionList);
        this._itemStreamer.options = {
            layout: { ...this.constructor.__domStreamer_layout }
        };

        this._itemStreamer
            .Watch(ui.SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this._OnRequestRangeUpdate, this)
            .Watch(ui.SIGNAL.ITEM_REQUESTED, this._OnActionItemRequest, this);

        this._toolbar = this.Attach(ui.WidgetBar, `toolbar`, this._host);
        this._toolbar.options = {
            inline:true,
            stretch:ui.WidgetBar.FLAG_STRETCH,
            defaultWidgetClass:uilib.buttons.Button,
            handles:[
                {
                    label:`flush action stack`, icon:`clear`,
                    flavor:com.FLAGS.WARNING, variant:ui.FLAGS.FRAME,
                    trigger:{
                        fn:()=>{ this._data.Clear(); },
                        thisArg:this
                    }
                }
            ]
        }

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

    _OnActionRemoved(p_stack, p_action) {
        this._itemStreamer.itemCount = p_stack.count;
    }

    _OnRequestRangeUpdate(p_streamer, p_infos) {

    }

    _OnActionItemRequest(p_streamer, p_index, p_fragment) {

        let
            action = this._data._stack[p_index],
            item = this.Attach(
                com.BINDINGS.Get(this, action, this.constructor.__default_actionItem),
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

    //

    _OnSelectionStackAdd(p_item) {
        this._data.GoToAction(p_item.data);
        this._selectionStack.Clear();
    }

    _OnSelectionStackRemove(p_item) { }


}

module.exports = ActionStackInspector;