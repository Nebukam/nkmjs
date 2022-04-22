'use strict';

const { U, PATH } = require(`../@.js`);
const { POOL } = require(`../collections/@.js`);


const Document = require(`./document.js`);
const JSONResource = require(`./resource-json.js`);
const { Metadata } = require(`../data-core/@.js`);
const { SERIALIZATION_CONTEXT } = require(`../serialization/@.js`);
const { SERIALIZER_JSON } = require(`../serialization/keys.js`);

const base = Document;

class MetaDocument extends base {

    static __NFO__ = com.NFOS.Ext({
            resourceType: JSONResource,
            serializer: SERIALIZER_JSON
        }, base);

    constructor() { super(); }

    _Init() {
        super._Init();
        this._metaClass = Metadata;
        this._data = null;
    }

    get metaClass() { return this._metaClass; }
    set metaClass(p_value) {
        p_value = (p_value || Metadata);
        this._metaClass = p_value;
        this.data = POOL.Rent(this._metaClass);
    }

    get data() { return this._data; }
    set data(p_value) { this._data = p_value; }

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
        if (this._data === null) { this._data = POOL.Rent(this._metaClass); }
        this._data = serializer.Deserialize(p_pack, this._data, { id: PATH.name(this._path) });
        //this._data.CommitUpdate();
    }

    _CleanUp() {
        this.data = null;
        this._metaClass = Metadata;
        super._CleanUp();
    }

}

module.exports = MetaDocument;