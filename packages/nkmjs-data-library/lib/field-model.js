'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`./ids`);
const DataBlocExtendable = require(`./data-block-extendable`);

/**
 * A FieldModel is a unique implementation of a serializable and customizable type.
 * It defines a property inside a DataModel, which is then used as a reference to create entries from that model.
 * @class
 * @augments ecosystem.DataBlocExtendable
 * @memberof ecosystem
 */
class FieldModel extends DataBlocExtendable {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-model`,
        [com.IDS.ICON]: `field-model`
    };

    //#region Static methods



    //#endregion

    static __requireSanitization = false;

    _Init() {
        super._Init();
        this._model = null;
        this._fieldIndex = 0;
        this._settings = null;
    }

    ////#region Properties

    /**
     * @description Whether or not this field requires value to be sanitized
     */
    get requireSanitization() { return this.constructor.__requireSanitization; }

    /**
     * @description Parent model
     */
    get model() { return this._model; }
    set model(p_value) {
        if (this._model === p_value) { return; }
        let oldModel = this._model;
        this._model = p_value;
    }

    get uri(){ return this._model ? `${this._model.uri}/${this._id._name}` : `${IDS.ROAMING}/${this._id._name}`; }

    /**
     * @description Field index withing model. This is only for formatting & vizualisation purposes.
     */
    get fieldIndex() { return this._fieldIndex; }
    set fieldIndex(p_value) { this._fieldIndex = p_value; }

    /**
     * @description Field instance settings
     * @type {object}
     */
    get settings() { return this._settings; }
    set settings(p_value) { this._settings = p_value; }

    //#endregion

    /**
     * @description Initialize local settings to their default values.  
     * Settings are used to validate & constraint field values in data entries.
     * @param {object} [p_settings] 
     * @returns 
     */
    InitSettings(p_settings = null) {

        let localSettings = null;
        if (p_settings) {
            localSettings = p_settings[this._id._name];
            if (!localSettings) { localSettings = {}; p_settings[this._id._name] = localSettings; }
        } else {
            localSettings = {};
        }

        this._settings = localSettings;
        return localSettings;

    }

    InitValues(p_settings, p_dataObject) {
        let values = p_dataObject[this._id._name];
        if (!values) { values = {}; p_dataObject[this._id._name] = values; }
        return values;
    }

    _CleanUp() {
        super._CleanUp();
        this._fieldIndex = 0;
        this._settings = null;
        this.model = null;
    }

}

module.exports = FieldModel;
