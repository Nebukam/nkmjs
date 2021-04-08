'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`./ids`);
const SIGNAL = require(`./signal`);
const DataBlocExtendable = require(`./data-block-extendable`);

/**
 * A FieldDescriptor is a unique implementation of a serializable and customizable type.
 * It defines a property inside a DataModel, which is then used as a reference to create entries from that model.
 * @class
 * @augments ecosystem.DataBlocExtendable
 * @memberof ecosystem
 */
class FieldSlot extends DataBlocExtendable {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-slot`,
        [com.IDS.ICON]: `field-slot`
    };

    //#region Static methods



    //#endregion

    static __requireSanitization = false;

    _Init() {
        super._Init();

        this._model = null;
        this._group = null;
        this._fieldIndex = 0;
        this._settings = null;
        this._descriptor = null;

        this._baseObserver.Hook(SIGNAL.DESCRIPTOR_CHANGED, this._OnBaseDescriptorChanged, this);

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

    get uri() { return this._model ? `${this._model.uri}/${this._id._name}` : `${IDS.ROAMING}/${this._id._name}`; }

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

    /**
     * @description Field display group
     * @type {*}
     */
    get group() { return this._group; }
    set group(p_value) {
        if (this._group === p_value) { return; }
        let oldGroup = this._group;
        this._group = p_value;
    }

    //#endregion

    //#region Descriptor

    /**
     * @description Field descriptor
     * @type {object}
     */
    get descriptor() { return this._descriptor; }
    set descriptor(p_value) {
        if (this._descriptor === p_value) { return; }

        let oldDescriptor = this._descriptor;
        this._descriptor = p_value;

        if (oldDescriptor) {
            if (oldDescriptor._slot === this) { oldDescriptor.Release(); }
        }

        if (this._descriptor) {
            this._descriptor.slot = this;
            if (this._settings) { this._descriptor.InitSettings(this._settings); }
        }

        this._Broadcast(SIGNAL.DESCRIPTOR_CHANGED, this, this._descriptor, oldDescriptor);
    }

    _OnBaseDescriptorChanged(p_slot, p_newDescriptor, p_oldDescriptor) {
        // TODO : Oh hey, well, huh.
    }

    //#endregion

    /**
     * @description Initialize local settings to their default values.  
     * Settings are used to validate & constraint field values in data entries.
     * @param {object} [p_settings] 
     * @returns 
     */
    InitSettings(p_settings = null) {
        if (!this._settings) { this._settings = {}; }
        if (p_settings) { u.tils.SetOverwrite(this._settings, p_settings); }
        if (this._descriptor) { this._descriptor.InitSettings(this._settings); }
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

module.exports = FieldSlot;
