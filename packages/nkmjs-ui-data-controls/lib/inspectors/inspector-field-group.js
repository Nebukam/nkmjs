'use strict';

const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

const items = require(`./items`);
const CONTEXT = require(`../context`);
const InspectorView = require(`../inspector-view`);

const base = InspectorView;

class FieldGroupInspector extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._inputHandler = new ui.inputs.InputListHandler(this);
    }

    _PostInit() {
        super._PostInit();
        this._inputHandler.Build([
            {
                member: `title`, cl: com.BINDINGS.Get(ui.CONTEXT.STANDALONE_INPUT, ui.inputs.KEYS.STRING),
                onSubmit: { fn: (p_input, p_newValue) => { this._data.title = p_newValue; } }
            },
            {
                member: `comment`, cl: com.BINDINGS.Get(ui.CONTEXT.STANDALONE_INPUT, ui.inputs.KEYS.STRING_TEXT),
                onSubmit: { fn: (p_input, p_newValue) => { this._data.comment = p_newValue; } }
            },
            {
                member: `order`, cl: com.BINDINGS.Get(ui.CONTEXT.STANDALONE_INPUT, ui.inputs.KEYS.NUMBER),
                onSubmit: { fn: (p_input, p_newValue) => { this._data.order = p_newValue; } }
            },
        ]);
    }

    _OnDataUpdated(p_data) {
        this.title.currentValue = p_data.title;
        this.comment.currentValue = p_data.comment;
        this.order.currentValue = p_data.order;
    }

}

module.exports = FieldGroupInspector;
ui.Register('nkmjs-field-group-inspector', FieldGroupInspector);