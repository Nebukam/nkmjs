'use strict';

const u = require("@nkmjs/utils");
const EcosystemCommand = require(`./command-ecosystem`);

class DataManipulationCommand extends EcosystemCommand {
    constructor() { super(); this._ecosystemFromContext = true; this._dataClass = null; }

    _SanitizeContext(p_context) {

        if (!p_context) { return null; }
        let dClass = this._dataClass;
        if (u.tils.isInstanceOf(p_context, dClass)) { return p_context; }
        let cData = p_context.data;
        if (cData) {
            if (u.tils.isInstanceOf(cData, dClass)) {
                return cData;
            } else if (u.tils.isInstanceOf(cData.data, dClass)) {
                return cData.data;//In case the actual data item is a wrapper.
            }
        }
        return null;
    }

    _OnContextChanged() {
        if (this._ecosystemFromContext && this._context) {
            this.ecosystem = this._context.ecosystem;
        }
    }

}

module.exports = DataManipulationCommand;
