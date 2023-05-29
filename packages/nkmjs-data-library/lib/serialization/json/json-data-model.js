const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const utils = require(`../../utils`);
const IDS = require(`../../ids`);
const DataBlockExtendableJSONSerializer = require(`./json-data-block-extendable`);
const FieldSlotJSONSerializer = require("./json-field-slot");
const FieldDescriptorJSONSerializer = require("./json-field-descriptor");
const CTX = nkm.data.s11n.CTX;

const __id_groups = `groups`;
const __id_slots = `slots`;

class DataModelJSONSerializer extends DataBlockExtendableJSONSerializer {
    constructor() { super(); }

    //#region Serialization

    static SerializeContent(p_serial, p_data, p_options = null) {

        super.SerializeContent(p_serial, p_data, p_options);

        let groupList = p_data._groupRep._itemList,
            groups = [],
            slotList = p_data._slotRep._itemList,
            slots = [];

        for (let i = 0, n = groupList.length; i < n; i++) {
            groups.push(this.__master.Serialize(groupList[i], p_options));
        }

        for (let i = 0, n = slotList.length; i < n; i++) {
            let slot = slotList[i];
            slots.push(this.__master.Serialize(slot, p_options));
        }

        p_serial[__id_slots] = slots;
        p_serial[__id_groups] = groups;

    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {

        super.DeserializeContent(p_serial, p_data, p_options);

        let slots = p_serial[__id_slots],
            groups = p_serial[__id_groups];

        if (groups && groups.length) {
            for (let i = 0, n = groups.length; i < n; i++) {
                let groupSerial = groups[i],
                    groupUID = slotSerial[CTX.JSON.META_KEY] ? slotSerial[CTX.JSON.META_KEY][com.IDS.UID] : null,
                    group = serializer.Deserialize(groupSerial, group, p_options);

                p_data._groupRep.Register(group, groupUID);
            }
        }

        if (slots && slots.length) {
            for (let i = 0, n = slots.length; i < n; i++) {

                let slotSerial = slots[i],
                    slotGroupID = slotSerial[CTX.JSON.DATA_KEY] ? slotSerial[CTX.JSON.DATA_KEY][IDS.GROUP] : null,
                    slotUID =  slotSerial[CTX.JSON.META_KEY] ? slotSerial[CTX.JSON.META_KEY][com.IDS.UID] : null,
                    existingSlot = slotUID ? p_data.GetSlotByName(slotUID) : null,
                    slot = this.__master.Deserialize(slotSerial, existingSlot, p_options);

                if (slotGroupID) { slot.group = p_data.GetSlotGroupByName(slotGroupID); }

                if (!existingSlot) {
                    p_data.RegisterSlot(slot, slotUID);
                }

            }
        }

    }

    static TryGetExisting(p_ecosystem, p_serial, p_meta = null) {
        let modelUID = ((p_meta && p_meta[com.IDS.UID]) || p_serial[com.IDS.UID]);
        if (!modelUID) { return null; }
        return p_ecosystem.models._factory.GetByName(modelUID);
    }

    static RegisterToEcosystem(p_ecosystem, p_data, p_serial, p_meta = null) {
        let factory = p_ecosystem.models._factory,
            modelUID = ((p_meta && p_meta[com.IDS.UID]) || p_serial[com.IDS.UID]);

        if (!modelUID) { return false; };

        factory.RegisterTemp(p_data);
        return factory.Register(p_data, modelUID);
    }

    //#endregion

}

module.exports = DataModelJSONSerializer;