'use strict';

const actions = require("@nkmjs/actions");

const Model = require(`../../model`);

class ActionModelOverrideField extends actions.Action {
    constructor() { super(); }

    static get mergeable() { return false; }

    // ----> Do / undo

    _InternalDo(p_operation, p_merge = false) {

        let op = p_operation,
            target = op.target,
            originalField = op.originalField,
            fieldID = originalField.id.name,
            field = Model.CreateField(
                target,
                originalField.fieldClass,
                fieldID,
                {
                    //TODO : options ?
                });

        op.field = field;

        field.Dirty();
        console.log(`%cDO : ${target} *= ${fieldID} (${field.base})`, 'color: #909090');
        return this;

    }

    _InternalUndo() {
        let op = this._operation;
        op.target.Unregister(op.field);
    }

    _InternalRedo() {
        let op = this._operation;
        op.target.Register(op.field, op.fieldID);
    }

    _CleanUp() {
        if (this._undoed) {
            this._operation.field.Release();
        }
        super._CleanUp();
    }

}

module.exports = ActionModelOverrideField;