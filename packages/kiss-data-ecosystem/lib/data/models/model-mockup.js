'use strict';

const { U } = require(`@nkmjs/utils`);
const { POOL, DisposableObjectEx } = require(`@nkmjs/common`);

const ECOSYSTEM_CONSTANTS = require(`../../ecosystem-constants`);
const Model = require(`../model`);

class ModelMockup extends DisposableObjectEx {


    /**
     * Turns a JS object into a ModelMockup.
     * Any property beyond the ones below is treated as a new field to be created (see .newField).
     * @param {object} p_object
     * @param {string} p_object.id
     * @param {Model} p_object.base
     * @param {Class} p_object.modelClass
     * @param {object} p_object.NFO
     * @param {object} p_object.newField { cl: fieldClass, settings: fieldSettings }
     */
    static Mock(p_object) {
        let mockup = POOL.Rent(ModelMockup);
        try {
            mockup.mockup = p_object;
        } catch (err) {
            mockup.Release();
            throw err;
        }
        return mockup;
    }

    /**
     * Turn a JS object into a ModelMockup, with handling of extra mockup properties.
     * Any property beyond the ones below is treated as a new field to be created (see .newField).
     * @param {object} p_object 
     * @param {string} p_object.id
     * @param {Model} p_object.base
     * @param {Class} p_object.modelClass
     * @param {object} p_object.NFO
     * @param {object} p_object.newField { cl: fieldClass, settings: fieldSettings }
     */
    static CompleteMock(p_object) {
        let mockup = ModelMockup.Mock(p_object.mockup);
        mockup.id = p_object.id;
        mockup.base = p_object.base;
        mockup.modelClass = (p_object.modelClass || Model);
        mockup.NFO = p_object.NFO;
        return mockup;
    }

    /**
     * Expands a mockup into an existing model by creating
     * missing fields.
     * Throws an error if a field with a mockup'd ID already exists
     * with a missmatching type.
     * @param {Model} p_model 
     * @param {ModelMockup} p_mockup 
     */
    static Expand(p_model, p_mockup) {

        let oldBase = p_model.base,
            p_base = p_mockup.base;

        if (p_base) {
            if (p_model.base && p_model.base.Inherit(p_base)) {
                //Do nothing : base model already extends mocked base at some point
            } else {
                p_model.base = p_base;
            }
        }

        if (!p_model.NFO) {
            p_model.NFO = p_mockup.NFO;
        }

        let mockup = p_mockup.mockup;

        for (let member in mockup) {

            let existingField = p_model.Get(member),
                mockField = mockup[member]

            if (!existingField) {

                Model.CreateField(
                    p_model,
                    mockField.cl,
                    member,
                    {
                        settings: mockField.settings
                    });

            } else {

                if (U.isInstanceOf(existingField.fieldClass, mockField.cl)) {
                    //Field exists, type matches.
                    if (mockField.settings) {
                        existingField.Unpack(mockField.settings);
                    }
                    continue;
                } else {
                    //Field exists, type mismatches :()
                    throw new Error();
                }
            }
        }

        return p_model;

    }

    /**
     * Creates and register a model in a given ecosystem, based on
     * a given mockup.
     * @param {Ecosystem} p_ecosystem 
     * @param {ModelMockup} p_mockup 
     * @param {string} p_id 
     */
    static Register(p_ecosystem, p_mockup, p_id = null) {
        let model = p_ecosystem.models.CreateTemp(null, p_mockup.modelClass);
        p_ecosystem.models.Register(
            ModelMockup.Expand(model, p_mockup), (p_id || p_mockup.id));

        return model;
    }



    constructor() { super(); }

    _Init() {
        super._Init();
        this._id = ``;
        this._base = null;
        this._NFO = null;
        this._modelClass = Model;
        this._mockup = {};
        this._fieldCount = 0;
    }

    get NFO() { return this._NFO; }
    set NFO(p_value) {
        this._NFO = p_value;
        if (p_value) {
            let cPath = U.Get(p_value, `catalogPath`, null);
            if (!cPath || cPath === ECOSYSTEM_CONSTANTS.DEFAULT) {
                p_value.catalogPath = `${this._modelClass.name}s/${this._id}/`;
                /*
                //Register to default path
                let arr = new Array(0);
                let b = this._base;
                while(b != null){
                    arr.push(b.id.name);
                    b = b.base;
                }
                arr.push(`User models`);
                arr.reverse();
                arr.push(this._id);
                p_value.catalogPath = arr.join(`/`)+'/';
                */
            }
        }
    }

    get base() { return this._base; }
    set base(p_value) { this._base = p_value; }

    get id() { return this._id; }
    set id(p_value) { this._id = p_value; }

    get modelClass() { return this._modelClass; }
    set modelClass(p_value) { this._modelClass = p_value; }

    get mockup() { return this._mockup; }
    set mockup(p_value) {
        this._mockup = p_value;
        if (!p_value) {
            this._fieldCount = 0;
        } else {
            for (let member in p_value) {
                if (!p_value[member].hasOwnProperty(`cl`)) {
                    throw new Error(`Field ${member} is missing a constructor definition.`);
                }
                this._fieldCount += 1;
            }
        }
    }

    /**
     * Checks whether a field exists with a given ID
     * @param {string} p_fieldId 
     */
    Has(p_fieldId) { return this._mockup.hasOwnProperty(p_fieldId); }

    Add(p_fieldId, p_fieldClass, p_fieldSettings = null) {
        if (U.isEmpty(p_fieldId)) { throw new Error(`Cannot add a field with an empty ID.`); }
        if (!p_fieldClass) { throw new Error(`Cannot add a field with an empty type.`); }
        let mockup = this._mockup;
        if (mockup.hasOwnProperty(p_fieldId)) {
            throw new Error(`Mockup already have a field named ${p_fieldId}`);
        }
        mockup[p_fieldId] = { cl: p_fieldClass, settings: p_fieldSettings };
        this._fieldCount += 1;
    }

    Remove(p_fieldId) {
        let mockup = this._mockup;
        if (mockup.hasOwnProperty(p_fieldId)) { return; }
        delete mockup[p_fieldId];
        this._fieldCount -= 1;
    }

    /**
     * Checks whether a given model is an exact match of this
     * mockup.
     * @param {Model} p_model 
     * @param {Boolean} p_inspectSettings should the settings match too ?
     */
    Equals(p_model, p_inspectSettings = false) {


        if (this._fieldCount != p_model.FieldCount(true)) { return false; } //Field count mismatch.

        let mockup = this._mockup;

        for (let member in mockup) {
            let existingField = p_model.Get(member);
            if (!existingField) { return false; }//Field missing
            let mockField = mockup[member];
            if (!U.isInstanceOf(existingField.fieldClass, mockField.cl)) { return false; } //Field type mismatch
            if (!p_inspectSettings) { continue; }
            throw new Error(`settings inspection not implemented yet`);
        }

        return true;
    }

    /**
     * Checks whether a given model fits the mockup.
     * This is a loose alternative to Equals(), and only
     * checks wheter fields are present
     * @param {Model} p_model 
     */
    Fits(p_model) {

        let mockup = this._mockup;

        for (let member in mockup) {
            let existingField = p_model.Get(member);
            if (!existingField) { return false; }//Field missing
            if (!U.isInstanceOf(existingField.fieldClass, mockup[member].cl)) { return false; } //Field type mismatch
        }

        return true;
    }

    /**
     * 
     * @param {Ecosystem} p_ecosystem 
     * @param {string} p_id 
     */
    RegisterTo(p_ecosystem, p_id = null) {
        return ModelMockup.Register(p_ecosystem, this, p_id);
    }

    /**
     * 
     * @param {Ecosystem} p_ecosystem 
     * @param {Model} p_model
     */
    ExpandTo(p_model) {
        ModelMockup.Expand(p_model, this);
    }

    _CleanUp() {
        this._id = ``;
        this._base = null;
        this._modelClass = Model;
        this._mockup = {};
        this._NFO = null;
        this._fieldCount = 0;
        super._CleanUp();
    }

}

module.exports = ModelMockup;