'use strict';

const { U, PATH } = require(`@nkmjs/utils`);

const { JSONResource } = require(`@nkmjs/data-core`);
const { Document } = require(`@nkmjs/documents`);

const { SERIALIZATION_CONTEXT } = require(`../serialization/@.js`);
const { SERIALIZER_JSON } = require(`../serialization/keys.js`);

class DataBlockDocument extends Document {


    static get _NFO_() {
        return U.SetMissing({
            resourceType: JSONResource,
            serializer: SERIALIZER_JSON
        }, Document.__NFO__);
    }

    constructor() { super(); }

    _Init() {
        super._Init();
        this._data = null;
        this._ecosystem = null;
    }

    get data() { return this._data; }
    set data(p_value) {
        if (this._data === p_value) { return; }
        this._data = p_value;
        if (this._data) {
            this._ecosystem = (this._data._ecosystem || this._ecosystem);
        } else {
            this._ecosystem = null;
        }
    }

    //Packs the data into a format the ressource can write down.
    //JSONResource expect the data to be packed as stringifyable json object.
    _Pack() {
        let serializer = BINDINGS.Get(
            SERIALIZATION_CONTEXT.SERIALIZER,
            NFOS.Get(this).serializationContext);

        if (!serializer) { throw new Error(`Could not find main serializer for ${this._serializationType.name}`); }
        return serializer.Serialize(this._data);
    }

    //Unpack the data from the resource content.
    //JSONResource unpack to a javascript object.
    _Unpack(p_pack) {
        let serializer = BINDINGS.Get(
            SERIALIZATION_CONTEXT.SERIALIZER,
            NFOS.Get(this).serializationContext);

        if (!serializer) { throw new Error(`Could not find main de-serializer for ${this._serializationType.name}`); }
        let id = this._data ? this._data.id ? this._data.id.name : null : null;
        this._data = serializer.Deserialize(p_pack, this._data, {
            ecosystem: this._ecosystem,
            id: id ? id : PATH.name(this._path)
        });

        this._data.ClearDirty();
    }

    _CleanUp() {
        this._data = null;
        super._CleanUp();
    }

}

module.exports = DataBlockDocument;