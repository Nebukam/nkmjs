'use strict'

const actions = require(`@nkmjs/actions`);

class ActionSetPropertyValueMultiple extends actions.Action {
    constructor() { super(); }

    // Expected operation format : { target:SimpleDataBlock, values:{ id:* } }

    _InternalDo(p_op, p_merge = false) {

        let
            target = p_op.target,
            values = p_op.values,
            oldValues = target.Values(values);

        p_op.oldValues = oldValues;
        target.BatchSet(values);
        this._UpdateValues(target, values, oldValues);
        target.CommitUpdate();

        

    }

    _UpdateDisplayInfos(){
        this.displayInfos = {
            name: `Set multiple values`,
            title: `Setting multiples values on ${this._operation.target}'s`
        };
    }

    _UpdateValues(p_target, p_from, p_to) {

    }

    _InternalUndo() {

        let
            target = this._operation.target,
            oldValues = this._operation.oldValues,
            newValues = this._operation.values;

        target.BatchSet(oldValues, true);
        this._UpdateValues(target, oldValues, newValues);
        target.CommitUpdate();
    }

    _InternalRedo() {

        let
            target = this._operation.target,
            oldValues = this._operation.oldValues,
            newValues = this._operation.values;

        target.BatchSet(newValues, true);
        this._UpdateValues(target, newValues, oldValues);
        target.CommitUpdate();

    }

}

module.exports = ActionSetPropertyValueMultiple;