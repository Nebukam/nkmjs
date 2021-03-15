'use strict';

const data = require(`@nkmjs/data-core`);

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelDuplicate extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return p_context.editable;
    }

    _InternalExecute() {
        try {

            let baseId = this._context.id.name,
                i = 1,
                duplicateId = `${baseId}(${i})`,
                f = this._ecosystem.models._factory;

            while (!f.IsIDAvailable(duplicateId)) { duplicateId = `${baseId}(${i++})`; }

            let JSONSerializer = data.serialization.JSONSerializer;

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

module.exports = ModelDuplicate;
