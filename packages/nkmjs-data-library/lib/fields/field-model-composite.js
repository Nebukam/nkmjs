'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldModel = require(`../field-model`);

/**
 * @class
 * @augments ecosystem.FieldModel
 * @memberof ecosystem.fields
 */
class FieldModelComposite extends FieldModel {
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

    _Add(p_fieldModelClass, p_id) {
        let newFieldModel = new p_fieldModelClass();
        newFieldModel.id = p_id;
        this._composition.push(newFieldModel);
        return newFieldModel;
    }

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);
        for (let i = 0, n = this._composition.length; i < n; i++) {
            let childField = this._composition[i];
            childField.model = this._model;
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

module.exports = FieldModelComposite;
