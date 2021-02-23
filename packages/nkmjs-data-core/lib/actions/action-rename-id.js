'use strict';

const { Action } = require(`@nkmjs/actions`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Action
 * @memberof data.core.actions
 */
class ActionRenameID extends Action {
    constructor() { super(); }

    // ----> Can merge ?

    static get mergeable() { return true; }

    CanMerge(p_operation) {
        let operation = this._operation;

        if (operation.target === p_operation.target) {
            return true;
        } else {
            return false;
        }
    }

    // ----> Do / undo

    Do(p_operation, p_merge = false) {

        let id = p_operation.target,
            originalValue = null;

        if (!p_merge) {
            this._operation = p_operation;
            originalValue = id.name;
            p_operation.originalValue = originalValue;
        } else {
            this._operation.value = p_operation.value;
            originalValue = this._operation.originalValue;
            p_operation = this._operation;
        }

        id.name = p_operation.value;

        console.log(`%cDO : ${originalValue} => ${p_operation.value}`, 'color: #909090');
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