'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../ids`);
const FieldModel = require(`../field-model`);

/**
 * @class
 * @augments ecosystem.FieldModel
 * @memberof ecosystem.fields
 */
class FieldBoolean extends FieldModel {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-boolean`,
        [com.IDS.ICON]: `field-boolean`
    };

    _Init() {
        super._Init();
    }

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = false; }
        return values;
    }

}

module.exports = FieldBoolean;
