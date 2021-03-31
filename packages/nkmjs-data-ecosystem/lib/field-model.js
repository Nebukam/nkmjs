const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const DataBlocExtendable = require(`./data-block-extendable`);

/**
 * Although labeled 'Model', each FieldModel is a unique implementation of a serializable
 * and customizable type.
 */
class FieldModel extends DataBlocExtendable {
    constructor() { super(); }


    //#region Static methods



    //#endregion

    static __requireSanitization = false;

    _Init() {
        super._Init();
        this._model = null;
        this._fieldIndex = 0;
    }

    get model() { return this._model; }
    set model(p_value) {
        if (this._model === p_value) { return; }
        let oldModel = this._model;
        this._model = p_value;
    }

    get fieldIndex() { return this._fieldIndex; }
    set fieldIndex(p_value) { this._fieldIndex = p_value; }

    get requireSanitization() { return this.constructor.__requireSanitization; }

    InitSettings(p_settings) {
        let settings = p_settings[this._id._name];
        if (!settings) { settings = {}; p_settings[this._id._name] = settings; }
        return settings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = p_dataObject[this._id._name];
        if (!values) { values = {}; p_dataObject[this._id._name] = values; }
        return values;
    }

    /**
     * @description Validate value based on specific field details.  
     * This is implementation-specific.
     * @param {data.ecosystem.FieldDetails} p_details 
     * @param {*} p_value
     * @returns 
     */
    ValidateValue(p_details, p_value) {
        return true;
    }

    /**
     * @description Sanitize a value according to specific field details.
     * @param {data.ecosystem.FieldDetails} p_details
     * @param {*} p_value  
     * @returns 
     */
    SanitizeValue(p_details, p_value) {
        return p_value;
    }

    _CleanUp() {
        super._CleanUp();
        this._fieldIndex = 0;
        this.model = null;
    }

}

module.exports = FieldModel;
