'use strict';

const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);
const { JSONSerializer } = require(`@nkmjs/data-core`);

const DataManipulationCommand = require(`../../commands/command-data`);

class EntryDuplicate extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../data-entry`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return true; //p_context.editable;
    }

    _InternalExecute() {
        try {
            let baseId = this._context.id.name,
                i = 1,
                duplicateId = `${baseId}(${i})`,
                dLib = this._ecosystem.entries.Get(this._context.model);

            while (!dLib.IsIDAvailable(duplicateId)) { duplicateId = `${baseId}(${i++})`; }

            JSONSerializer.Deserialize(
                JSONSerializer.Serialize(this._context), null,
                { ecosystem: this._ecosystem, id: duplicateId });
        } catch (e) {
            this._Fail(`Error during serialization : ${e.message}`);
            return;
        }

        this._Success();
    }

}

module.exports = EntryDuplicate;
