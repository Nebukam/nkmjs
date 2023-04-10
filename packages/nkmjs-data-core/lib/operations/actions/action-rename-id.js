'use strict';

const actions = require("@nkmjs/actions");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Action
 * @memberof data.core.actions
 */
class ActionRenameID extends actions.Action {
    constructor() { super(); }

    // ----> Can merge ?

    static get mergeable() { return true; }

    CanMerge(p_op) {
        let operation = this._operation;

        if (operation.target === p_op.target) {
            return true;
        } else {
            return false;
        }
    }

    // ----> Do / undo

    Do(p_op, p_merge = false) {

        let id = p_op.target,
            originalValue = null;

        if (!p_merge) {
            this._operation = p_op;
            originalValue = id.name;
            p_op.originalValue = originalValue;
        } else {
            this._operation.value = p_op.value;
            originalValue = this._operation.originalValue;
            p_op = this._operation;
        }

        id.name = p_op.value;

        console.log(`%cDO : ${originalValue} => ${p_op.value}`, 'color: #909090');
        return this;

    }

    Merge(p_options) {

    }

    Undo() {
        let operation = this._operation;
        operation.target.name = operation.originalValue;
    }

    Redo() {
        let operation = this._operation;
        operation.target.name = operation.value;
    }

}

module.exports = ActionRenameID;