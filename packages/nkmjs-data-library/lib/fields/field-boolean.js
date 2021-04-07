'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../ids`);
const FieldDescriptor = require(`../field-descriptor`);

/**
 * @class
 * @augments ecosystem.FieldDescriptor
 * @memberof ecosystem.fields
 */
class FieldBoolean extends FieldDescriptor {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-boolean`,
        [com.IDS.ICON]: `field-boolean`
    };

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = false; }
        return values;
    }

}

module.exports = FieldBoolean;
