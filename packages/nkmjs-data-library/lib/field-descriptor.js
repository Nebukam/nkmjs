'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`./ids`);
const DataBlocExtendable = require(`./data-block-extendable`);

/**
 * A FieldDescriptor is a unique implementation of a serializable and customizable type.
 * It defines a property inside a DataModel, which is then used as a reference to create entries from that model.
 * @class
 * @augments common.Observable
 * @memberof ecosystem
 */
class FieldDescriptor extends com.Observable {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-descriptor`,
        [com.IDS.ICON]: `field-descriptor`
    };

    //#region Static methods



    //#endregion

    static __requireSanitization = false;

    _Init() {
        
        super._Init();
        this._parent = null;
        this._id = null;
        this._slot = null;
        this._localSettings = null;

    }

    ////#region Properties

    get id(){ return this._id; }
    set id(p_value){ this._id = p_value; }

    /**
     * @description Whether or not this field requires value to be sanitized
     */
    get requireSanitization() { return this.constructor.__requireSanitization; }

    /**
     * @description Parent model
     */
    get slot() { return this._slot; }
    set slot(p_value) {
        if (this._slot === p_value) { return; }
        let oldSlot = this._slot;
        this._slot = p_value;
    }

    //#endregion

    /**
     * @description Initialize local settings to their default values.  
     * Settings are used to validate & constraint field values in data entries.
     * @param {object} [p_settings] 
     * @returns 
     */
    InitSettings(p_settings) {

        let localSettings;

        if (this._id) {
            localSettings = p_settings[this._id._name];
            if (!localSettings) { localSettings = {}; p_settings[this._id._name] = localSettings; }
        } else {
            localSettings = p_settings;
        }

        this._localSettings = localSettings;
        return localSettings;

    }

    InitValues(p_settings, p_dataObject) {
        let values = p_dataObject[this._id._name];
        if (!values) { values = {}; p_dataObject[this._id._name] = values; }
        return values;
    }

    _CleanUp() {
        super._CleanUp();
        this._parent = null;
        this._fieldIndex = 0;
        this._localSettings = null;
        this.slot = null;
        this.id = null;
    }

}

module.exports = FieldDescriptor;
