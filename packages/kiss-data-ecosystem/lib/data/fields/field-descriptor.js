'use strict';

const data = require(`@nkmjs/data-core`);

const M = require(`../../meta`);


//A field descriptor is used for
// - declaring a value slot in a data entry
// - data validation when attempting to change that entry field`s value
// - a field type may be :
//      - a native value
//      - a data-model entry : either a reference to an existing one, or an "embedded" one.
//          - embedded data-model entries are in fact created and "hidden" elsewhere, so they are never really embedded.

class FieldDescriptor extends data.DataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._fieldClass = null;
        this._fieldMeta = null;
    }

    get fieldClass() {
        return this._fieldClass;
    }

    set fieldClass(p_value) {
        this._fieldClass = p_value;
        if (p_value) {
            let meta = M.ETA(p_value);
            if (meta) {
                this.fieldMeta = meta;
            }
        }
    }

    get fieldMeta() {
        return this._fieldMeta;
    }

    set fieldMeta(p_value) {
        this._fieldMeta = p_value;
    }

    _CleanUp() {
        this._fieldClass = null;
        this._fieldMeta = null;
        super._CleanUp();
    }

}

module.exports = FieldDescriptor;