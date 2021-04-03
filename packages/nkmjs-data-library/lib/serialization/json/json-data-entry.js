const u = require("@nkmjs/utils");
const DataBlockExtendableJSONSerializer = require(`./json-data-block-extendable`);

class DataEntryJSONSerializer extends DataBlockExtendableJSONSerializer {
    constructor() { super(); }

    static SerializeContent(p_serial, p_data, p_options = null) {
        super.SerializeContent(p_serial, p_data, p_options);
    }

    static DeserializeContent(p_serial, p_data, p_options = null) {
        super.DeserializeContent(p_serial, p_data, p_options);
    }

}

module.exports = DataEntryJSONSerializer;