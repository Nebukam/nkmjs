'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldDescriptor = require(`../field-descriptor`);

/**
 * @class
 * @augments ecosystem.FieldDescriptor
 * @memberof ecosystem.fields
 */
class FieldDescriptorComposite extends FieldDescriptor {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-composite`,
        [com.IDS.ICON]: `field-composite`
    };

    static __requireSanitization = false;

    _Init() {
        super._Init();
        this._composition = [];
    }

    get composition() { return this._composition; }

    _Add(p_fieldDescriptorClass, p_id) {
        let newFieldDescriptor = new p_fieldDescriptorClass();
        newFieldDescriptor.id = p_id;
        this._composition.push(newFieldDescriptor);
        return newFieldDescriptor;
    }

    InitSettings(p_settings) {
        let localSettings = super.InitSettings(p_settings);
        for (let i = 0, n = this._composition.length; i < n; i++) {
            let childField = this._composition[i];
            childField.slot = this._slot;
            childField.InitSettings(localSettings);
        }
        return localSettings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = p_dataObject[this._id._name];
        if (!values) { values = {}; p_dataObject[this._id._name] = values; }
        for (let i = 0, n = this._composition.length; i < n; i++) {
            this._composition[i].InitValues(p_settings, p_dataObject);
        }
        return values;
    }

}

module.exports = FieldDescriptorComposite;
