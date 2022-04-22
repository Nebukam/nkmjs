'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const documents = require("@nkmjs/documents");

const { JSONResource } = require(`@nkmjs/data-core`);

const { SERIALIZATION_CONTEXT } = require(`../serialization/@.js`);
const { SERIALIZER_JSON } = require(`../serialization/keys.js`);

const base = documents.Document;

class DataBlockDocument extends base {

    static __NFO__ = com.NFOS.Ext({
        [documents.IDS.TYPE_RSC]: JSONResource,
        [documents.IDS.SERIAL_CTX]: SERIALIZER_JSON
    }, base);

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
            com.NFOS.Get(this).serializationContext);

        if (!serializer) { throw new Error(`Could not find main serializer for ${this._serializationType.name}`); }
        return serializer.Serialize(this._data);
    }

    //Unpack the data from the resource content.
    //JSONResource unpack to a javascript object.
    _Unpack(p_pack) {
        let serializer = BINDINGS.Get(
            SERIALIZATION_CONTEXT.SERIALIZER,
            com.NFOS.Get(this).serializationContext);

        if (!serializer) { throw new Error(`Could not find main de-serializer for ${this._serializationType.name}`); }
        let id = this._data ? this._data.id ? this._data.id.name : null : null;
        this._data = serializer.Deserialize(p_pack, this._data, {
            ecosystem: this._ecosystem,
            id: id ? id : u.PATH.name(this._path)
        });

        this._data.ClearDirty();
    }

    _CleanUp() {
        this._data = null;
        super._CleanUp();
    }

}

module.exports = DataBlockDocument;