'use strict';

const { U } = require(`@nkmjs/utils`);
const { Action } = require(`@nkmjs/actions`);

const Model = require(`../../model`);

class ActionModelCreateField extends Action {
    constructor() { super(); }

    static get mergeable() { return false; }

    // ----> Do / undo

    _InternalDo(p_operation, p_merge = false) {

        let op = p_operation,
            target = op.target,
            descriptor = op.descriptor,
            fieldID = `${descriptor.fieldClass.name}${U.unsafeUID}`;

        op.id = fieldID;

        let field = Model.CreateField(
            target,
            descriptor.fieldClass,
            fieldID,
            {
                //TODO : options ?
            });

        op.field = field;

        field.Dirty();
        console.log(`%cDO : ${target} += ${fieldID}`, 'color: #909090');
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

module.exports = ActionModelCreateField;