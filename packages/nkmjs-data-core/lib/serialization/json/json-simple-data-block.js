'use strict';

const u = require(`@nkmjs/utils`);

const CONTEXT = require(`../context`);
const IDS = require(`./../../ids`);

const DataBlockJSONSerializer = require(`./json-data-block`);


/**
 * This is a base implementation. It only add & serialize the known "metadata" property.
 * 
 */

/*
   expected input/ouput :

   {
       ...
       "metadata":{*},
       "data":{*},
       ...
   }
   
*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.json.DataBlock
 * @memberof data.core.serialization
 */
class SimpleDataBlockJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {

        let recipient = null;

        if (p_data.constructor.__flattenSerialization) { recipient = p_serial; }
        else { recipient = p_serial[CONTEXT.JSON.DATA_KEY] = {}; }

        let definitions = p_data.constructor.__VALUES;
        definitions.forEach(def => {
            if (def[IDS.SKIP_SERIALIZATION]) { return; }
            recipient[def.id] = p_data.Get(def.id);
        });

        // BLOCS

        let blocHeaders = p_data.constructor.__BLOCS;
        if (blocHeaders) {

            let blocsSerial = {};

            for (var id in blocHeaders) {

                let blocInfos = blocHeaders[id];

                if (blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }

                let bloc = p_data[blocInfos.member],
                    serializer = this.GetSerializer(bloc.constructor, -1, null);

                if (!serializer) { throw new Error(`Could not find suitable serializer for bloc=${bloc}`); }

                blocsSerial[id] = serializer.Serialize(p_data, p_options);

            }

            recipient[IDS.BLOCS] = blocsSerial;

        }

        // DATALISTS

        let dataLists = p_data.constructor.__DATALISTS;
        if (dataLists) {

            let listsSerial = {};

            dataLists.forEach((dataListHeader) => {

                if (dataListHeader[IDS.SKIP_SERIALIZATION]) { return; }

                let dataList = p_data[dataListHeader.member],
                    contents = [];

                for (let i = 0, n = dataList.count; i < n; i++) {
                    let item = dataList.At(i),
                        serializer = this.GetSerializer(item.constructor, -1, null);

                    if (!serializer) { throw new Error(`Could not find suitable serializer for bloc=${item}`); }
                    content.push(serializer.Serialize(item, p_options));

                }

                listsSerial[dataListHeader.member] = contents;

            });

            recipient[IDS.DATALISTS] = listsSerial;

        }

    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {

        let container = null;
        if (p_data.constructor.__flattenSerialization) { container = p_serial; }
        else { container = p_serial[CONTEXT.JSON.DATA_KEY]; }

        let blocHeaders = p_data.constructor.__BLOCS;
        if (blocHeaders) {

            let blocsSerial = container[IDS.BLOCS];

            if (blocsSerial) {

                for (var id in blocsSerial) {

                    let blocInfos = blocHeaders[id];
                    if (!blocInfos || blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }

                    let bloc = p_data[blocInfos.member],
                        serializer = this.GetSerializer(bloc.constructor, -1, null);

                    if (!serializer) { throw new Error(`Could not find suitable serializer for bloc=${bloc}`); }

                    serializer.Deserialize(p_data, blocsSerial[id], p_options, p_meta);

                }

                //!important, so it doesn't get set a value afterward.
                if (p_data.constructor.__flattenSerialization) { p_serial[IDS.BLOCS]; }
                else { delete p_serial[CONTEXT.JSON.DATA_KEY][IDS.BLOCS]; }
            }

        }

        // DATALISTS

        let dataLists = p_data.constructor.__DATALISTS;
        if (dataLists) {

            let listsSerial = container[IDS.DATALISTS];

            dataLists.forEach((dataListHeader) => {

                if (dataListHeader[IDS.SKIP_SERIALIZATION]) { return; }

                let dataList = p_data[dataListHeader.member],
                    contents = listsSerial[dataListHeader.member];

                if (!contents) { return; }

                if (dataListHeader.pushFn) {
                    contents.forEach((itemSerial) => {
                        let item = this.constructor.__master.Deserialize(itemSerial);
                        u.Call(dataListHeader.pushFn, p_data, item, dataListHeader);
                    });
                } else {
                    contents.forEach((itemSerial) => {
                        let item = this.constructor.__master.Deserialize(itemSerial);
                        dataList.Add(item);
                    });
                }

            });

        }

        if (p_data.constructor.__flattenSerialization) { p_data.BatchSet((container || {})); }
        else { p_data.BatchSet((container || {})); }

    }



}

module.exports = SimpleDataBlockJSONSerializer;