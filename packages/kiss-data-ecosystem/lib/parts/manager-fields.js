'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const data = require(`@nkmjs/data-core`);

const M = require(`../meta`);
const EcosystemPart = require(`../ecosystem-part`);
const Field = require(`../data/fields/field`);
const FieldDescriptor = require(`../data/fields/field-descriptor`);

class FieldManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._factory = new data.DataFactory();
        this._factory.itemClass = FieldDescriptor;

        this._factory
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnFieldRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnFieldUnregistered, this);

        this._idMap = new collections.Dictionary();

        this._catalog.name = `Fields`;
        this._catalog.icon = `%ICON%/icon_fieldlist.svg`;

    }

    Register(p_fieldClass) {

        if (!u.isInstanceOf(p_fieldClass, Field)) {
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
                [com.IDS.PATH]: fieldMETA.catalogPath,
                [com.IDS.DATA]: fieldItem,
                [com.IDS.ICON]: (fieldMETA.icon || `data-field`),
                [com.IDS.NAME]: u.tils.CamelSplit(p_fieldClass.name)
            }
        );

        //#LOG console.log(`%c+ ${p_fieldClass.name}`, 'color: #00589b');

    }

    Get(p_id) {
        return this._factory.Get(p_id);
    }

    _OnFieldRegistered(p_factory, p_field) {
        this._OnDataRegistered(p_field);
        this.Broadcast(data.SIGNAL.ITEM_REGISTERED, p_field);
    }

    _OnFieldUnregistered(p_factory, p_field) {
        this.Broadcast(data.SIGNAL.ITEM_UNREGISTERED, p_field);
    }

}

module.exports = FieldManager;
