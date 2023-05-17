'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const data = nkm.data;
const DataModel = require("../data-model");

const IDS = require(`../ids`);
const FieldModelComposite = require(`./field-descriptor-composite`);

const FieldType = require("./types/field-type");
const __typeID = data.ID.New(IDS.TYPE);

/**
 * @class
 * @augments ecosystem.fields.FieldModelComposite
 * @memberof ecosystem.fields
 */
class FieldDescriptorTyped extends FieldModelComposite {
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

module.exports = FieldDescriptorTyped;
