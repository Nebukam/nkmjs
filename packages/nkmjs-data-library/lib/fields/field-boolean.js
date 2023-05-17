'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

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
