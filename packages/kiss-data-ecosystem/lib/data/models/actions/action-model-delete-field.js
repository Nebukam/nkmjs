'use strict';

const actions = require("@nkmjs/actions");

class ActionModelDeleteField extends actions.Action {
    constructor() { super(); }

    static get mergeable() { return false; }

    // ----> Do / undo

    _InternalDo(p_operation, p_merge = false) {

        let target = p_operation.target,
            model = target.model;

        p_operation.id = target.id.name;

        model.Unregister(target);

        console.log(`%cDO : ${model} -= ${p_operation.id}`, 'color: #909090');
        return this;

    }

    _InternalUndo() {
        let op = this._operation;
        op.model.Register(op.target, op.id);
    }

    _InternalRedo() {
        let op = this._operation;
        op.model.Unregister(op.target);
    }

    _CleanUp() {
        if (!this._undone) {
            this._operation.target.Release();
        }
        super._CleanUp();
    }

}

module.exports = ActionModelDeleteField;