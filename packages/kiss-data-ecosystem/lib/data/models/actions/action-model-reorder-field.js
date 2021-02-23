'use strict';

const { Action } = require(`@nkmjs/actions`);

class ActionModelReorderField extends Action {
    constructor() { super(); }

    static get mergeable() { return true; }

    // ----> Can merge ?

    CanMerge(p_operation) {
        let operation = this._operation;

        if (operation.target === p_operation.target) {
            return true;
        } else {
            return false;
        }
    }

    // ----> Do / undo

    _InternalDo(p_operation, p_merge = false) {

        let op = p_operation,
            target = op.target,
            index = op.index;

        if (!p_merge) {
            this._operation = op;
            op.originalIndex = target.fieldIndex;
        } else {
            op = this._operation;
            op.index = index;
        }

        let model = target.model,
            list = model.localFieldList.internalArray,
            currentIndex = list.indexOf(target);

        if (currentIndex > index) { currentIndex++; } //offset remove index based on target position

        list.splice(index, 0, target); //move to new spot
        list.splice(currentIndex, 1); //remove old reference

        console.log(`${target} from ${currentIndex} to ${index}`);

        model._UpdateLocalFieldIndexes(true);

        console.log(`%cDO : ${target} @${op.originalIndex} => ${op.index}|${target.fieldIndex}`, 'color: #909090');
        return this;

    }

    _InternalUndo() {

    }

    _InternalRedo() {

    }

}

module.exports = ActionModelReorderField;