const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../ids`);
const FieldModelComposite = require(`./field-model-composite`);

const FieldType = require("./types/field-type");
const __typeID = data.ID.New(IDS.TYPE);

/**
 * A field model 'typed' uses another field type as part of its low-level definition.
 * Primarily used to create lists & maps
 */
class FieldModelTyped extends FieldModelComposite {
    constructor() { super(); }

    static __default_typeClass = FieldType;

    _Init() {
        super._Init();
        this._type = this._Add(this.constructor.__default_typeClass, __typeID);
    }

}

module.exports = FieldModelTyped;
