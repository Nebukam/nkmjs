'use strict';

const { U } = require(`@nkmjs/utils`);
const { Dictionary } = require(`@nkmjs/collections`);
const { DATA_SIGNAL, DataFactory } = require(`@nkmjs/data-core`);

const M = require(`../meta`);
const EcosystemPart = require(`../ecosystem-part`);
const Field = require(`../data/fields/field`);
const FieldDescriptor = require(`../data/fields/field-descriptor`);

class FieldManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._factory = new DataFactory();
        this._factory.itemClass = FieldDescriptor;

        this._factory.Watch(DATA_SIGNAL.ITEM_REGISTERED, this._OnFieldRegistered, this);
        this._factory.Watch(DATA_SIGNAL.ITEM_UNREGISTERED, this._OnFieldUnregistered, this);

        this._idMap = new Dictionary();

        this._catalog.name = `Fields`;
        this._catalog.icon = `%ICON%/icon_fieldlist.svg`;

    }

    Register(p_fieldClass) {

        if (!U.isInstanceOf(p_fieldClass, Field)) {
            throw new Error("Attempting to register a non-field constructor.");
        }

        let fieldID = p_fieldClass.name,
            fieldItem = this._factory.CreateTemp();

        fieldItem.fieldClass = p_fieldClass;

        this._OnDataCreated(fieldItem);

        this._factory.Register(fieldItem, fieldID);
        this._idMap.Set(p_fieldClass, fieldItem.id);

        let fieldMETA = M.ETA(p_fieldClass);

        this._catalog.Register(
            {
                [COM_ID.PATH]: fieldMETA.catalogPath,
                [COM_ID.DATA]: fieldItem,
                [COM_ID.ICON]: (fieldMETA.icon || `%ICON%/icon_field.svg`),
                [COM_ID.NAME]: U.CamelSplit(p_fieldClass.name)
            }
        );

        //#LOG console.log(`%c+ ${p_fieldClass.name}`, 'color: #00589b');

    }

    Get(p_id) {
        return this._factory.Get(p_id);
    }

    _OnFieldRegistered(p_factory, p_field) {
        this._OnDataRegistered(p_field);
        this._Broadcast(DATA_SIGNAL.ITEM_REGISTERED, p_field);
    }

    _OnFieldUnregistered(p_factory, p_field) {
        this._Broadcast(DATA_SIGNAL.ITEM_UNREGISTERED, p_field);
    }

}

module.exports = FieldManager;
