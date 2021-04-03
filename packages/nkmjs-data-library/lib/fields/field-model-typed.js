'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const DataModel = require("../data-model");

const IDS = require(`../ids`);
const FieldModelComposite = require(`./field-model-composite`);

const FieldType = require("./types/field-type");
const __typeID = data.ID.New(IDS.TYPE);

/**
 * @class
 * @augments ecosystem.fields.FieldModelComposite
 * @memberof ecosystem.fields
 */
class FieldModelTyped extends FieldModelComposite {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-typed`,
        [com.IDS.ICON]: `field-typed`
    };

    static __default_typeClass = FieldType;

    _Init() {
        super._Init();
        this._type = this._Add(this.constructor.__default_typeClass, __typeID);
    }

}

module.exports = FieldModelTyped;
