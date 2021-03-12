'use strict';

const actions = require("@nkmjs/actions");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Action
 * @memberof data.core.actions
 */
class ActionMetadataSet extends actions.Action {
    constructor() { super(); }

    // ----> Can merge ?

    static get mergeable() { return true; }

    CanMerge(p_operation) {
        let operation = this._operation;

        if (operation.target === p_operation.target
            && operation.path === p_operation.path) {
            return true;
        } else {
            return false;
        }
    }

    // ----> Do / undo

    /**
     * @access private
     * @description TODO
     * @param {*} p_operation 
     * @param {*} p_merge 
     */
    _InternalDo(p_operation, p_merge = false) {

        let op = p_operation,
            mData = op.target,
            mPath = op.path,
            originalValue = null;

        if (!p_merge) {
            this._operation = op;
            originalValue = mData.Get(mPath, undefined);
            op.originalValue = originalValue;
        } else {
            this._operation.value = op.value;
            originalValue = this._operation.originalValue;
            op = this._operation;
        }

        mData.Set(mPath, op.value);

        console.log(`%cDO : ${originalValue} => ${op.value}`, 'color: #909090');
        return this;

    }

    /**
     * @access private
     * @description TODO
     */
    _InternalUndo() {
        let op = this._operation;
        op.target.Set(op.path, op.originalValue);
    }

    /**
     * @access private
     * @description TODO
     */
    _InternalRedo() {
        let op = this._operation;
        op.target.Set(op.path, op.value);
    }

}

module.exports = ActionMetadataSet;